let x = [];
let x1 = []
// let numMounds = 3;
let bubbleSize = 20;
let bubblesX;
let bubblesY= 420;
let bubblesMovement =[];
let sharkx = 200;
let sharky = 200;
let sharkwidth = 150;
let sharkheight = sharkwidth/2;
let fishColor = [];
let d;
let coralx;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container")
  colorMode(RGB, 255)
  for (let i = 0; i < 3; i++){
    x[i] = random(80,720)
    x1[i] = x[i]
    bubblesMovement[i] = random(.001, .01);
    fishColor[i] = random(0,255)
    //sharkx = random(sharkwidth, width-sharkwidth);
    //sharky = random(sharkheight, height - sharkheight)
  }
  
}

function draw() {
  background(239, 252, 255);
  // sharkx = 200
  // sharky = 200
  //sand
  noStroke();
  fill(241, 239, 211);
  rect(0, 450, width, 50);
  //call mounds
  for (let i = 0; i < 3; i++) {
    mounds(x[i])
    bubbles([x1[i]])
    
  }
  move()
  shark(sharkx,sharky,sharkwidth,sharkheight)
  if (sharkx < -sharkwidth || sharkx > width+sharkwidth){
    sharkx = width + sharkwidth
    sharky = random(height - sharkheight)
    sharkwidth = random(50,250)
  }
  sharkx -=3
  fishCursor(mouseX, mouseY)
  
}
//movement for screen movement effect
function mounds(moundX){
  for (let i = 0; i < 3; i++){
    noStroke();
    fill(241, 239, 211);
    triangle(x[i] - 40,450, x[i] , 420, x[i] + 40, 450);
  }
}
function bubbles(bubblesX){
  for (let i = 0; i < 3; i++){
    fill(255)
    strokeWeight(1)
    stroke(216, 244, 251)
    circle(x1[i],bubblesY,bubbleSize);
    if (bubblesY < 0){
      bubblesY= 450
    }
  }
  bubblesY -=.25
}
function coralPlant(){
  
}
function move(){
  //how to get the bubbles to appear where the mound is
  
  for (let i = 0; i <= 3; i++){
    x1[i] = noise(frameCount*bubblesMovement[i])* width
  }
}
function shark(sharkx,sharky){
  noStroke()
  fill(162, 162, 161)
  ellipse(sharkx, sharky, sharkwidth, sharkwidth/2)
  //shark mouth
  triangle(sharkx-sharkwidth*.04, sharky, sharkx - sharkwidth * .56, sharky+sharkwidth*.13, sharkx-sharkwidth*.26, sharky+sharkwidth*.2)
  triangle(sharkx-sharkwidth*(1/3), sharky - sharkwidth*.19, sharkx - sharkwidth *.67, sharky, sharkx-sharkwidth*.33, sharky+sharkwidth*.19)
  //top fin
  triangle(sharkx-sharkwidth*.07, sharky - sharkwidth*.21, sharkx + sharkwidth*.21, sharky - sharkwidth*.45, sharkx +sharkwidth*.26, sharky)
  //bottom fin
  triangle(sharkx+sharkwidth*.26, sharky + sharkwidth*.2, sharkx + sharkwidth*.4,sharky + sharkwidth*.33, sharkx +sharkwidth*.45, sharky)
  //tail
  triangle(sharkx+sharkwidth*.27, sharky - sharkwidth*.2, sharkx+ sharkwidth, sharky, sharkx + sharkwidth*.27, sharky + sharkwidth*.2)
  triangle(sharkx + sharkwidth,sharky, sharkx + sharkwidth * 1.2, sharky -sharkheight*.8, sharkx + sharkwidth*.6,sharky)
  triangle(sharkx + sharkwidth,sharky, sharkx + sharkwidth * 1.05, sharky +sharkheight*.67, sharkx + sharkwidth*.7,sharky)
  //belly
  fill(255)
  //ellipse(sharkx, sharky+sharkheight*.4, sharkwidth * .55, sharkheight*.15)
  //eye
  fill(0)
  circle(sharkx-sharkwidth*.24, sharky -sharkwidth*.08, sharkwidth*.025)
  
  //trident
  strokeWeight(sharkwidth*.025)
  stroke(255, 243, 43)
  // line(sharkx + )
}
  
function fishCursor(){
  noStroke();
  fill(fishColor[0], fishColor[1], fishColor[2])
  ellipse(mouseX, mouseY, 30,20)
  triangle(mouseX+20, mouseY + 15, mouseX, mouseY, mouseX+20,mouseY-15)
  let d = dist(sharkx,sharky, mouseX, mouseY);
  if (d < 40){
    stroke(1)
    line(mouseX-5,mouseY - 5, mouseX + 5, mouseY)
    line(mouseX+5,mouseY - 5, mouseX - 5, mouseY)
  }
}
//follow food