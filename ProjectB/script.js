let condition1 = false;//mouse click ends the starting screen
let condition2 = false;//transition from tv screen to photo room when the light hits the sides of the screen
let condition3 = false;//clicking the box enlargens it
let condition4 = false;//clicking the box opens  it
let condition5 = false;//new scene; top view of box
let imgTV;
let imgTable;
let photoArrayX;
let photoArrayY;
let rot = [];
let photoTint = [40,44,48,52,56,60,64,68,72,76]
let dim = false;
let tintCountDown = 80;
let intervalDim = .3;
let intervalLight = 5;

function preload() {
  imgTV = loadImage("photosProject/tv.png");
  imgTable = loadImage("photosProject/table.png");
  imgClosedBox = loadImage("photosProject/closedbox.png");
  imgBoard = loadImage("photosProject/board.png");
  imgBoxOpen = loadImage("photosProject/openbox1.png");
  imgBoxOpenTop = loadImage("photosProject/openbox2topview.png");
  imgFlashlight = loadImage("photosProject/flashlight.png");
}
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");
  rot = [PI/4, PI, PI/2, PI/8, PI/2.5,PI/8, PI/3, PI/5, PI/3.14, PI/1.59]
  photoArrayX = [width/2 - 170, width/2 + 185, width/2 - 80,width/2 - 120,width/2 - 160, width/2 + 140, width/2 - 130, width/2 - 105,width/2 - 97, width/2 + 60];
  photoArrayY = [height/2, height/2 - 40, height/2 + 80,height/2 -30, height/2 + 30, height/2 + 80, height/2 -20,height/2+50,height/2,height/2-70];

  scene = new Animation();

}

function draw() {
  background(220);
  if (mouseIsPressed == true) {
    condition1 = true;
  }
  scene.initialScreen();
  if (condition1) {
    scene.sceneOne();
  }
  if (condition2) {
    scene.sceneTwo();
  }
  if (condition5){
    condition2 = false;
    scene.sceneThree();
  }
  if (dim = true){
    tintCountDown -= intervalDim;
     
  } 
  if (tintCountDown < 0){
    tintCountDown = 0;
  }
  if (keyIsPressed){
    tintCountDown += intervalLight;
  }
  if (tintCountDown > 155){
    tintCountDown = 155;
  }

}


class Animation {
  constructor() {
    this.tvpressed = false;
    this.tvpressed2 = false;
    this.buttonx = width / 2 + 245;
    this.buttony = height / 2 + 110;
    this.tvOn = false;
    this.buttondist;
    this.whitex = 500;
    this.whitey = 300;
    this.grow = false;
    this.capX = 1500;
    this.capY = 700;
    this.boxDist;
    this.boxX = width / 2 + 400;
    this.boxY = height / 2 + 200;
    this.openBox = false;
    this.backgroundS2one = true;
    this.bigBoxOpen;
    this.conditionOpenBox = false;
    this.tint = 255;
    this.bigBoxOpen2;
    this.flashlightDist;
    this.flashlightcondition = false;
    this.cornerFlash = false;
  }
  initialScreen() {
    //typing animation?
    textAlign(CENTER);
    textSize(80);
    text("the natural world", width / 2, height / 2);
  }
  sceneOne() {
    background(0);
    imageMode(CENTER);
    this.buttondist = dist(this.buttonx, this.buttony, mouseX, mouseY)

    if (this.tvOn) {
      noTint();

      fill(255);
      rectMode(CENTER);
      rect(width / 2, height / 2, this.whitex, this.whitey);
      image(imgTable, width / 2, height / 2 + 300, 1500, 1000);
      image(imgTV, width / 2, height / 2 + 15, 600, 410);
      if (keyIsPressed) {
        this.grow = true;
        this.tvpressed2 = true;
      }
      if (this.grow) {
        noTint();
        rect(width / 2, height / 2, this.whitex, this.whitey);
        if (this.whitex <= windowWidth + 20) {
          this.whitex += 20;
        }
        if (this.whitey <= windowHeight + 20) {
          this.whitey += 10;
        }
        if ((this.whitex > windowWidth) && (this.whitey > windowHeight)) {
          condition2 = true;
        }
      }

    }
    if (this.tvOn == false) {
      tint(255, 128)
      image(imgTable, width / 2, height / 2 + 300, 1500, 1000);
      image(imgTV, width / 2, height / 2 + 15, 600, 410);
      fill(255);
      circle(this.buttonx, this.buttony, 50);
    }
    if (this.buttondist < 50 && mouseIsPressed == true) {
      this.tvOn = true;
    }

  }
  sceneTwo() {
    // Clear the canvas
    background(0);
    // Check if sceneTwo elements should be drawn
    if (this.backgroundS2one) {
      imageMode(CENTER);
      tint(255, 28);
  
      // Draw closed box and board
      image(imgClosedBox, this.boxX, this.boxY, 300, 200);
      image(imgBoard, width / 2, height / 2 - 200, 540 * 1.2, 360 * 1.2);
  
      // Calculate distance to closed box
      this.boxDist = dist(this.boxX, this.boxY, mouseX, mouseY);
  
      // Check if mouse is close to closed box
      if (this.boxDist < 100 && mouseIsPressed == true) {
        this.openBox = true;
      }
    }
  
    // If box is opened, set condition3 to true
    if (this.openBox == true) {
      this.backgroundS2one = false; // Prevent sceneTwo elements from being drawn again
      condition3 = true;
    }
  
    // If condition3 is true, enlarge the box
    if (condition3 == true) {
      //enlarge box
      tint(255, 40)
      image(imgClosedBox, width / 2, height / 2, 600, 400);
      // press box for cutting sound, after cutting sound is over, the box opens
      this.bigBoxOpen = dist(width / 2, height / 2, mouseX, mouseY)
  
      if (this.bigBoxOpen < 100 && mouseIsPressed) {
        //sound - add another if statement for playing the sound: re-adjust conditions to open the box
        this.conditionOpenBox = true;
        this.openBox = false; // Reset the openBox state
        condition3 = false; // Reset condition3
        condition4 = true; // Set condition4 to true after the box is opened
      }
    }
  
    // Display box open image if condition4 is true
    if (condition4) {
      tint(255, 40);
      image(imgBoxOpen, width / 2, height / 2 - 100, 800, 700);
      this.bigBoxOpen2 = dist(width / 2, height / 2, mouseX, mouseY)
    }
  
    // Reset condition2 if the box is clicked again
    if (this.bigBoxOpen2 < 100 && mouseIsPressed) {
      this.openBox = false; 
      condition4 = false; 
      condition5 = true; 
    }
  }
  sceneThree(){
    tint(255, tintCountDown);
    image(imgBoxOpenTop, width / 2 + 20, height / 2, 1100, 900);
    for (let i = 0; i < photoArrayX.length; i++){
      noStroke();
      rectMode(CENTER);
      push();
      translate(photoArrayX[i],photoArrayY[i])
      rotate(rot[i])
      fill(photoTint[i])
      rect(0,0,160, 240);
      pop();
      
    }

    tint(255,tintCountDown)
    this.flashlightcondition = true;
    if (this.flashlightcondition == true){
      image(imgFlashlight, width/2 - 250, height / 2 + 200, 200, 150);
      this.flashlightDist = dist(width / 2 - 250, height / 2 + 200, mouseX, mouseY) 
    }

    if (this.flashlightDist < 100 && mouseIsPressed){
      this.flashlightcondition = false;
      this.cornerFlash = true;
    }
    if (this.cornerFlash == true){
      noTint();
      image(imgFlashlight, width - 200, 150, 200, 150);
      dim = true;
    }
  }
}