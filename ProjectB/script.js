let condition1 = false;
let condition2 = false;
let imgTV;
let imgTable;
let tvArrayX = [];
let tvArrayY;
function preload(){
  imgTV = loadImage("photosProject/tv.png")
  imgTable = loadImage("photosProject/table.png")
}
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  scene = new Animation();
}

function draw() {
  background(220);
  scene.initialScreen();
  if (mouseIsPressed == true) {
    condition1 = true;
  }
  if (condition1) {
    scene.sceneOne();
  } 
  if (condition2) {
    scene.sceneTwo();
  }
}

class Animation{
  constructor(){
    this.tvpressed = false;
    this.tvpressed2 = false;
    this.buttonx = width/2 + 245;
    this.buttony = height/2 + 110;
    this.tvOn = false;
    this.buttondist;
    this.whitex = 500; 
    this.whitey = 300;
    this.grow = false;
    this.capX = 1500;
    this.capY = 700;
  }
  initialScreen(){
    textAlign(CENTER);
    textSize(80);
    text("the natural world", width/2,height/2);
  }
  sceneOne(){
    background(0);
    imageMode(CENTER);
    this.buttondist = dist(this.buttonx, this.buttony, mouseX, mouseY)
    
    if (this.tvOn){
      noTint();
      
      fill(255);
      rectMode(CENTER);
      rect(width/2,height/2, this.whitex, this.whitey);
      image(imgTable,width/2,height/2+300, 1500, 1000);
      image(imgTV,width/2,height/2+15, 600, 410);
      if (keyIsPressed) {
        this.grow = true;
        this.tvpressed2 = true;
      }
      if (this.grow){
        noTint();
        rect(width/2,height/2, this.whitex, this.whitey);
        if (this.whitex <= windowWidth) {
          this.whitex += 5;
        }
        if (this.whitey <= windowHeight) {
          this.whitey += 2.5;
        }
        if ((this.whitex == this.capX) && (this.whitey == this.capY)){
          condition1 = false;
          condition2 = true;
        }
      }
      
    }
    if (this.tvOn == false){
      tint(255, 128)
      image(imgTable,width/2,height/2+300, 1500, 1000);
      image(imgTV,width/2,height/2+15, 600, 410);
      fill(255);
      circle(this.buttonx,this.buttony,50);
      }
    if (this.buttondist < 50 && mouseIsPressed == true){
     this.tvOn = true;
    }
  
  }
  sceneTwo(){

  }
}