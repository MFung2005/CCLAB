let condition1 = false;//mouse click ends the starting screen
let condition2 = false;//transition from tv screen to photo room when the light hits the sides of the screen
let condition3 = false;//clicking the box enlargens it
let condition4 = false;//clicking the box opens  it
let condition5 = false;//new scene; top view of box
let condition6 = false;//placing polaroids on board
let condition7 = false;//taking photos
let imgTV;
let imgTable;
let photoArrayX;
let photoArrayY;
let rot = [];
let photoTint = [40, 44, 48, 52, 56, 60, 64, 68, 72, 76]
let dim = false;
let tintCountDown = 155;
let intervalDim = .2;
let intervalLight = 20;
let flashlightPowerDist;
let imgArray = [];
let index = 0;
let showImage = false;
let indexIncremented = false;
let rectangles = [];
let currentIndex = 0;
let cameraBig = false;
let cam;
let camWidth = 640; // Original capture width
let camHeight = 480; // Original capture height
let croppedWidth = 400; // Desired cropped width
let croppedHeight = 480; // Desired cropped height
let cropX = (camWidth - croppedWidth) / 2; // X coordinate for cropping
let cropY = (camHeight - croppedHeight) / 2; // Y coordinate for cropping
let camcond = true;


function preload() {
  imgTV = loadImage("photosProject/tv.png");
  imgTable = loadImage("photosProject/table.png");
  imgClosedBox = loadImage("photosProject/closedbox.png");
  imgBoard = loadImage("photosProject/board.png");
  imgBoxOpen = loadImage("photosProject/openbox1.png");
  imgBoxOpenTop = loadImage("photosProject/openbox2topview.png");
  imgFlashlight = loadImage("photosProject/flashlight.png");
  img1 = loadImage("photos/reducedphotos/TaiwanHike-2.jpg");
  img2 = loadImage("photos/caumsett part 2019.jpg");
  img3 = loadImage("photos/hawaii2020.jpg");
  img4 = loadImage("photos/reducedphotos/home-2.jpg");
  img5 = loadImage("photos/reducedphotos/ithaca falls-2.jpg");
  img6 = loadImage("photos/georgiabotanicalgarden2022.jpg");
  img7 = loadImage("photos/connetquot2023.jpg");
  img8 = loadImage("photos/reducedphotos/florida 2023-2.jpg");
  img9 = loadImage("photos/reducedphotos/Hangzhou-xihu2.jpg");
  img10 = loadImage("photos/reducedphotos/shanghai-park2.jpg");
  imgCamera = loadImage("photosProject/camera.png")

}
function setup() {

  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");
  rot = [PI / 4, PI, PI / 2, PI / 8, PI / 2.5, PI / 8, PI / 3, PI / 5, PI / 3.14, PI / 1.59]
  photoArrayX = [width / 2 - 170, width / 2 + 185, width / 2 - 80, width / 2 - 120, width / 2 - 160, width / 2 + 140, width / 2 - 130, width / 2 - 105, width / 2 - 97, width / 2 + 60];
  photoArrayY = [height / 2, height / 2 - 40, height / 2 + 80, height / 2 - 30, height / 2 + 30, height / 2 + 80, height / 2 - 20, height / 2 + 50, height / 2, height / 2 - 70];
  //add images into the array
  imgArray = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];
  scene = new Animation();
  cam = createCapture(VIDEO);
  cam.size(camWidth, camHeight); // Set camera capture size
  cam.hide()

}

function draw() {
  
  background(220);
  cam.loadPixels();
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
  if (condition5) {
    condition2 = false;
    scene.sceneThree();
  }

  if (dim == true && tintCountDown < 155) {
    tintCountDown -= intervalDim;
  }
  if (tintCountDown < 0) {
    tintCountDown = 0;
  }
  if (flashlightPowerDist < 200 && mouseIsPressed && (condition5 == true || condition6 == true)) {
    tintCountDown += intervalLight;
  }
  if (tintCountDown > 155) {
    tintCountDown = 154;
  }
  if (condition6 == true) {
    condition5 = false;
    scene.sceneFour();
  }
  if (condition7 == true) {
    scene.sceneFive();
  }
}


class Animation {
  constructor() {
    this.tvpressed = false;
    this.tvpressed2 = false;
    this.buttonx = width / 2 + 245;
    this.buttony = height / 2 + 110;
    this.buttony2 = height / 2 + 40;
    this.tvOn = false;
    this.buttondist;
    this.buttondist2;
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
    this.circle;
    this.circleSize = 40;
    this.circleSize2 = 40;
    this.flashlightsizeX = 200;
    this.flashlightsizeY = 150;
    this.cornerflashX = 200;
    this.cornerflashY = 150;
    this.polaroidIndicator = 25;
    this.polaroidIndicatorDist;
    this.showRectangle = false;
    this.flipbuttonx = width / 2 - 150;
    this.flipbuttony = height / 2 + 200;
    this.closephotobuttony = height / 2 - 200;
    this.descriptionBoolean = false;
    this.nextArrow = false;
    this.count = 0;
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

      this.buttondist2 = dist(this.buttonx, this.buttony2, mouseX, mouseY);

      if (this.buttondist2 < 20 && mouseIsPressed) {
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
      circle(this.buttonx, this.buttony, this.circleSize);
    }
    if (this.buttondist < 40) {
      this.circleSize = 65;
    } else {
      this.circleSize = 40
    }

    if (this.buttondist < 50 && mouseIsPressed == true) {
      this.tvOn = true;
    }

    if (this.tvOn) {
      noStroke();

      if (this.buttondist2 < 40) {
        this.circleSize2 = 65;
      } else {
        this.circleSize2 = 40
      }
      circle(this.buttonx, this.buttony2, this.circleSize2);
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

      image(imgBoard, width / 2, height / 2 - 200, 540 * 1.2, 360 * 1.2);
      noTint();
      image(imgClosedBox, this.boxX, this.boxY, 300, 200);

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
  sceneThree() {
    tint(255, tintCountDown);
    image(imgBoxOpenTop, width / 2 + 20, height / 2, 1100, 900);
    image(imgCamera, width / 2 + 200, height / 2 + 150, 250, 250);
    for (let i = 0; i < photoArrayX.length; i++) {
      noStroke();
      rectMode(CENTER);
      push()
      translate(photoArrayX[i], photoArrayY[i])
      rotate(rot[i])
      fill(photoTint[i])
      rect(0, 0, 160, 240);
      pop();

    }

    tint(255, tintCountDown)

    if (tintCountDown == 155) {
      this.flashlightcondition = true;
    }

    if (this.flashlightcondition == true) {
      image(imgFlashlight, width / 2 - 250, height / 2 + 200, this.flashlightsizeX, this.flashlightsizeY);
      this.flashlightDist = dist(width / 2 - 250, height / 2 + 200, mouseX, mouseY);
      if (this.flashlightDist < 100) {
        this.flashlightsizeX = 250;
        this.flashlightsizeY = 200
      } else {
        this.flashlightsizeX = 200;
        this.flashlightsizeY = 150
      }
    }

    if (this.flashlightDist < 100 && mouseIsPressed) {
      this.flashlightcondition = false;
      this.cornerFlash = true;
    }
    if (this.cornerFlash == true) {
      tintCountDown -= .1
      noTint();

      image(imgFlashlight, width - 250, 150, this.flashlightsizeX, this.flashlightsizeY);
      this.flashlightDist = dist(width - 250, 150, mouseX, mouseY);
      if (this.flashlightDist < 100) {
        this.flashlightsizeX = 250;
        this.flashlightsizeY = 200
      } else {
        this.flashlightsizeX = 200;
        this.flashlightsizeY = 150
      }


      flashlightPowerDist = dist(width - 250, 150, mouseX, mouseY);

      dim = true;

    }
    fill(233, 14, 123, 40)
    let s = 0;
    this.polaroidIndicatorDist = dist(photoArrayX[photoArrayX.length - 1], photoArrayY[photoArrayY.length - 1], mouseX, mouseY);
    if (this.polaroidIndicatorDist < 25) {
      s = 15;
    } else {
      s = 0
    }

    circle(photoArrayX[photoArrayX.length - 1], photoArrayY[photoArrayY.length - 1], this.polaroidIndicator + s)
    if (this.polaroidIndicatorDist < 25 && mouseIsPressed) {
      //rectMode(CENTER);
      photoArrayX.splice(photoArrayX.length - 1, 1)
      photoArrayY.splice(photoArrayY.length - 1, 1)
      this.showRectangle = true;
      // rect(width/2 - 300, height/2, 500,600);
    }

    if (dist(width / 2 - 150, this.closephotobuttony, mouseX, mouseY) < 25 && mouseIsPressed && !indexIncremented) {
      if (this.showRectangle == false) {
        index += 1;
        indexIncremented = true; // Set the flag to true to indicate index increment
        // index = index % imgArray.length;
      }
      this.showRectangle = true;
    }
    // Reset the flag when the mouse button is released
    if (!mouseIsPressed) {
      indexIncremented = false;
    }
    if (dist(this.flipbuttonx, this.closephotobuttony, mouseX, mouseY) < 50 && mouseIsPressed) {
      this.showRectangle = false;
      this.descriptionBoolean = false;

    }
    if (dist(mouseX, mouseY, this.flipbuttonx, this.flipbuttony) < 50 && mouseIsPressed) {
      this.descriptionBoolean = true;
    }
    // if (this.showRectangle == false && this.showRectangle != this.showRectangle){
    //   background(220)
    // }

    if (this.showRectangle) {
      drawRect();
      fill(0);
      circle(this.flipbuttonx, this.flipbuttony, 25)
    }
    if (this.descriptionBoolean) {
      drawRect2();
      circle(this.flipbuttonx, this.closephotobuttony, 25)
    }
    if (photoArrayX.length == 0) {
      this.nextArrow = true;
    }
    if (this.nextArrow) {
      fill(255);
      triangle(1 / 8 * width, 3 / 4 * height, 1 / 8 * width - 50, 3 / 4 * height - 50, 1 / 8 * width, 3 / 4 * height - 100);
      rectMode(CENTER);
      rect(1 / 8 * width + 50, 3 / 4 * height - 50, 100, 50);
    }
    if (dist(mouseX, mouseY, 1 / 8 * width + 50, 3 / 4 * height - 50) < 100 && mouseIsPressed) {
      condition6 = true;
      condition5 = false;
    }

  }
  sceneFour() {
    let boardPicArrayX = [width / 2 - 300, width / 2 - 150, width / 2, width / 2 + 150, width / 2 + 300, width / 2 - 300, width / 2 - 150, width / 2, width / 2 + 150, width / 2 + 300,];
    let boardPicArrayY = [height / 4, height / 4, height / 4, height / 4, height / 4, height / 4 + 200, height / 4 + 200, height / 4 + 200, height / 4 + 200, height / 4 + 200];
    let pinSize = 15;
    let s = 0;
    // let rectangles = [];
    // let currentIndex = 0;
    background(0);
    this.cornerFlash = true;
    tint(255, tintCountDown);
    image(imgBoard, width / 2, height / 2, 540 * 2, 360 * 2);
    noTint();
    image(imgFlashlight, width - 250, 150, this.flashlightsizeX, this.flashlightsizeY);
    this.flashlightDist = dist(width - 250, 150, mouseX, mouseY);
    if (this.flashlightDist < 100) {
      this.flashlightsizeX = 250;
      this.flashlightsizeY = 200
    } else {
      this.flashlightsizeX = 200;
      this.flashlightsizeY = 150
    }
    tintCountDown -= .1
    noTint();

    flashlightPowerDist = dist(width - 250, 150, mouseX, mouseY);

    dim = true;

    // if (dist(mouseX, mouseY, boardPicArrayX[this.count], boardPicArrayY[this.count]) < 25){
    //   s = 10;
    // } else {
    //   s = 0;
    // }
    // circle(boardPicArrayX[this.count], boardPicArrayY[this.count], pinSize + s);
    // if (dist(mouseX, mouseY, boardPicArrayX[this.count], boardPicArrayY[this.count]) < 25 && mouseIsPressed){
    //   this.count += 1;
    // }
    // for (let i = 0; i < this.count; i++){
    //   polaroidBoard(boardPicArrayX[i], boardPicArrayY[i],150,200);
    // }
    for (let i = 0; i < boardPicArrayX.length; i++) {
      circle(boardPicArrayX[i], boardPicArrayY[i], 25);
    }

    // Draw rectangles
    for (let i = 0; i < rectangles.length; i++) {
      rectMode(CENTER);
      fill(255);
      rect(rectangles[i][0], rectangles[i][1] + 75, 100, 150); // Adjust size as needed
      //image(imgArray[i], boardPicArrayX[i], boardPicArrayY[i]+75, 80, 100);
      //figure out how to add photo
    }

    // Check if mouse is within range of any circle and is pressed
    for (let i = 0; i < boardPicArrayX.length; i++) {
      if (dist(boardPicArrayX[i], boardPicArrayY[i], mouseX, mouseY) < 25 && mouseIsPressed) {
        // Add a new rectangle position to the array
        rectangles.push([boardPicArrayX[i], boardPicArrayY[i]]);
      }
      arrow2();
      if (dist(mouseX, mouseY, 1 / 8 * width + 50, 1 / 4 * height - 50) < 100 && mouseIsPressed) {
        condition7 = true;
        condition6 = false;
      }
    }
  }
  sceneFive() {
    let s = 0;
    let s1 = 0;
    let cameraButtonX = width / 2 - 130;
    let cameraButtonY = height / 2 - 43;
    let cameraSize = 250;

    image(imgCamera, width / 2 + 200, height / 2 + 150, cameraSize + s, cameraSize + s);

    // Check if mouse is over the camera button
    if (dist(mouseX, mouseY, width / 2 + 200, height / 2 + 150) < 250) {
      s = 50;
      // Check if mouse is pressed while over the camera button
      if (mousePressed()) {
        cameraBig = true; // Set cameraBig to true
      }
    }

    if (cameraBig) {
      background(0);
      image(imgCamera, width / 2, height / 2, 500, 500);

      if (dist(mouseX, mouseY, cameraButtonX, cameraButtonY) < 50) {
        s1 = 20;
      }
      circle(cameraButtonX, cameraButtonY, 30 + s1);
    }
    if (dist(mouseX, mouseY, cameraButtonX, cameraButtonY) < 50 && mouseIsPressed) {
      cam.updatePixels();
      fill(255);
      rectMode(CENTER);
      rect(width/2, height/2,475, 600);
      imageMode(CENTER);
      image(cam, width / 2, height / 2, croppedWidth, croppedHeight, cropX, cropY, croppedWidth, croppedHeight);
    }

  }

}

function drawRect() {
  let showImage = true;
  fill(255, 255, 255, 255)
  rect(width / 2 - 300, height / 2, 400, 600);
  if (showImage) {
    image(imgArray[index], width / 2 - 300, height / 2 - 50, 350, 450);
  } else {
    textSize(15);
    fill(0);
    text('hi', width / 2 - 300, height / 2);
  }
}
function drawRect2() {
  fill(255);
  rect(width / 2 - 300, height / 2, 400, 600);
  textSize(15);
  fill(0);
  text('hi', width / 2 - 300, height / 2);
}
function arrow2() {
  fill(255);
  triangle(1 / 8 * width, 1 / 4 * height, 1 / 8 * width - 50, 1 / 4 * height - 50, 1 / 8 * width, 1 / 4 * height - 100);
  rectMode(CENTER);
  rect(1 / 8 * width + 50, 1 / 4 * height - 50, 100, 50);
}
function mousePressed() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    cameraBig = true; // Set cameraBig to true
  }
}
