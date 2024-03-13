let x = [];
let x1 = [];
let coralx = [];
// let numMounds = 3;
let bubbleSize = 20;
let bubblesX;
let bubblesY = 420;
let bubblesMovement = [];
let sharkx = 200;
let sharky = 200;
let sharkwidth = 150;
let sharkheight = sharkwidth / 2;
let fishColor = [];
let d;
let d2;
let d3;
let coralColor = [];
let lightningX;
let fishSquad;
let fishSquadY;
let fishSquadMovement;
let squadMovement = 2;
let fishCondition = true;
let rotationCoral;

let rotation = 0;

function setup() {
createCanvas(800, 500);
// canvas.id("p5-canvas-container");
  
  fishSquad = random(60, 700);
  fishSquadY = random(60, height - 60);
  fishSquadMovement = fishSquad;
  for (let i = 0; i < 3; i++) {
    x[i] = random(80, 720);
    coralx[i] = random(80, 720);
    x1[i] = x[i];
    bubblesMovement[i] = random(0.001, 0.01);
    fishColor[i] = random(0, 255);
    coralColor[i] = random(0, 255);
    //sharkx = random(sharkwidth, width-sharkwidth);
    //sharky = random(sharkheight, height - sharkheight)
  }
    lightningx = random(sharkx-100, sharky+100);
    lightningy = random(0, height);
  rotationCoral = frameCount * .01
  
}

function draw() {
  background(239, 252, 255);
  // sharkx = 200
  // sharky = 200

  //call mounds
  for (let i = 0; i < 3; i++) {
    mounds();
    bubbles();
    coral();

    //movement of the environment
    if (keyIsPressed && keyCode == RIGHT_ARROW) {
      x[i] -= 2;
      coralx[i] -= 2;
    }
    if (x[i] < 30) {
      x[i] = 790;
      coralx[i] = 790;
    }
    if (keyIsPressed && keyCode == LEFT_ARROW) {
      x[i] += 2;
      coralx[i] += 2;
    }
    if (x[i] > 799) {
      x[i] = 30;
      coralx[i] = 30;
    }
  }
  move();
  shark(sharkx, sharky, sharkwidth, sharkheight);
  if (sharkx < -sharkwidth || sharkx > width + sharkwidth) {
    sharkx = width + sharkwidth;
    sharky = random(height - sharkheight);
    sharkwidth = random(100, 250);
  }
  sharkx -= 1.5
  fishCursor(mouseX, mouseY);
  //sand
  noStroke();
  fill(241, 239, 211);
  rect(0, 450, width, 50);

  trident();
  lightning();
  if (fishCondition == true){
    bodyOfFish();
  }
  let d3 = dist(sharkx, sharky, fishSquad, fishSquadY);
  if (d3 < 100) {
    fishSquad = random(60, 700);
  fishSquadY = random(60, height - 120);
    fishSquadMovement = fishSquad;
  }
}

function mounds() {
  for (let i = 0; i < 3; i++) {
    noStroke();
    fill(241, 239, 211);
    triangle(x[i] - 40, 450, x[i], 420, x[i] + 40, 450);
  }
}
function bubbles() {
  for (let i = 0; i < 3; i++) {
    fill(255);
    strokeWeight(1);
    stroke(216, 244, 251);
    circle(x1[i], bubblesY, bubbleSize);
    if (bubblesY < 0) {
      bubblesY = 450;
    }
  }
  bubblesY -= 0.25;
}

function move() {
  //how to get the bubbles to appear where the mound is

  for (let i = 0; i <= 3; i++) {
    x1[i] = noise(frameCount * bubblesMovement[i]) * width;
  }
}
function shark(sharkx, sharky) {
  noStroke();
  fill(162, 162, 161);
  ellipse(sharkx, sharky, sharkwidth, sharkwidth / 2);
  //shark mouth
  triangle(
    sharkx - sharkwidth * 0.04,
    sharky,
    sharkx - sharkwidth * 0.56,
    sharky + sharkwidth * 0.13,
    sharkx - sharkwidth * 0.26,
    sharky + sharkwidth * 0.2
  );
  triangle(
    sharkx - sharkwidth * (1 / 3),
    sharky - sharkwidth * 0.19,
    sharkx - sharkwidth * 0.67,
    sharky,
    sharkx - sharkwidth * 0.33,
    sharky + sharkwidth * 0.19
  );
  //top fin
  triangle(
    sharkx - sharkwidth * 0.07,
    sharky - sharkwidth * 0.21,
    sharkx + sharkwidth * 0.21,
    sharky - sharkwidth * 0.45,
    sharkx + sharkwidth * 0.26,
    sharky
  );
  //bottom fin
  triangle(
    sharkx + sharkwidth * 0.26,
    sharky + sharkwidth * 0.2,
    sharkx + sharkwidth * 0.4,
    sharky + sharkwidth * 0.33,
    sharkx + sharkwidth * 0.45,
    sharky
  );
  //tail
  triangle(
    sharkx + sharkwidth * 0.27,
    sharky - sharkwidth * 0.2,
    sharkx + sharkwidth,
    sharky,
    sharkx + sharkwidth * 0.27,
    sharky + sharkwidth * 0.2
  );
  triangle(
    sharkx + sharkwidth,
    sharky,
    sharkx + sharkwidth * 1.2,
    sharky - sharkheight * 0.8,
    sharkx + sharkwidth * 0.6,
    sharky
  );
  triangle(
    sharkx + sharkwidth,
    sharky,
    sharkx + sharkwidth * 1.05,
    sharky + sharkheight * 0.67,
    sharkx + sharkwidth * 0.7,
    sharky
  );
  //eye
  fill(0);
  circle(
    sharkx - sharkwidth * 0.24,
    sharky - sharkwidth * 0.08,
    sharkwidth * 0.025
  );

  //trident
  strokeWeight(sharkwidth * 0.025);
  stroke(255, 243, 43);
  // line(sharkx + )
}

function fishCursor() {
  noStroke();
  fill(fishColor[0], fishColor[1], fishColor[2]);
  ellipse(mouseX, mouseY, 30, 20);
  triangle(mouseX + 20, mouseY + 15, mouseX, mouseY, mouseX + 20, mouseY - 15);
  let d = dist(sharkx, sharky, mouseX, mouseY);
  if (d < 50) {
    fill(255,192,203);
    text('www',sharkx - sharkwidth *1/5,sharky)
    stroke(1);
    line(mouseX - 5, mouseY - 5, mouseX + 5, mouseY);
    line(mouseX + 5, mouseY - 5, mouseX - 5, mouseY);
  }
}
function coral() {
  strokeWeight(1);
  let y1 = height - 40;
  let lineSize = 40;  if (frameCount % 20 == 5){
     rotationCoral = frameCount * .009;
  }
  if (frameCount % 10 == 5){
    rotationCoral *= -1
  }
  for (let e = 0; e < 3; e++){
  push();
  translate(coralx[e],height - 40)
  rotate(rotationCoral)
  for (let j = 0; j < 3; j++) {
    //stroke(random(0, 255), random(0, 255), random(0, 255));=
    for (let i = 0; i < 720; i += 7) {
      stroke(coralColor[0], coralColor[1], coralColor[2]);
      push();
      // translate(coralx[j], height - 40);
      translate(0, 0);
      rotate(rotation + i);
      line(0, 0, 0 + lineSize, 0 + lineSize);
      pop();
    }
  }
  pop()
  }
}
//trident does a funny rotation
function trident() {
  let rotation = frameCount * 0.1;
  strokeWeight(5);
  stroke(255, 255, 102);
  push();
  line(
    sharkx - (sharkwidth * 1) / 4,
    sharky + (sharkwidth * 1) / 3.5,
    sharkx + (sharkwidth * 1) / 1.5,
    sharky + (sharkwidth * 1) / 3.5
  );
  line(
    sharkx - (sharkwidth * 1) / 30,
    sharky + (sharkwidth * 1) / 1.9,
    sharkx - (sharkwidth * 1) / 30,
    sharky - (sharkwidth * 1) / 600
  );
  line(
    sharkx - (sharkwidth * 1) / 5,
    sharky + (sharkwidth * 1) / 40,
    sharkx + (sharkwidth * 1) / 4198,
    sharky + (sharkwidth * 1) / 40
  );
  line(
    sharkx - (sharkwidth * 1) / 5,
    sharky + (sharkwidth * 1) / 2,
    sharkx + (sharkwidth * 1) / 4198,
    sharky + (sharkwidth * 1) / 2
  );
}
//howto make lightning last longer
function lightning() {
  let d2 = dist(sharkx, sharky, mouseX, mouseY);
  if (d2 < 50 * sharkwidth/32 && mouseIsPressed) {
    stroke(1);
    strokeWeight(1)
    line(sharkx - sharkwidth*1/32, sharky - sharkwidth*1/5, sharkx - sharkwidth * 1/3, sharky - sharkwidth*1/8)
    noStroke();
    fill(255, 255, 0);
    if(frameCount%10 == 0){
      lightningx = random(sharkx-100, sharky+100);

      lightningy = random(0, height);
    }

    triangle(
      lightningx,
      lightningy + 30,
      lightningx + 30,
      lightningy - 20,
      lightningx + 20,
      lightningy + 30
    );
    triangle(
      lightningx + 20,
      lightningy + 20,
      lightningx + 40,
      lightningy + 20,
      lightningx + 10,
      lightningy + 60
    );
  }
}
function bodyOfFish() {
  fishSquadY = noise(frameCount * .001) * height
  strokeWeight(2);
  for (let j = 1; j < 4; j++) {
    for (let i = 1; i < 10; i++) {
    
      stroke(234, 123, 127);
      strokeWeight(4);

      line(
        fishSquad + i * 20,
        fishSquadY + j * 30,
        fishSquad + 10 + i * 20,
        fishSquadY + j * 30
      );
      noStroke();
      fill(0);
      circle(fishSquad + i * 20, fishSquadY + j * 30, 2);

    }
  }
  if (fishSquad > fishSquadMovement - 120) {
    squadMovement = squadMovement * -1;
  }
  if (fishSquad < fishSquadMovement + 120) {
    squadMovement = squadMovement * -1;
  }
  fishSquad += squadMovement;
  // line(fishSquad, fishSquad, fishSquad + 10, fishSquad)
  // line(fishSquad + 20, fishSquad + 10, fishSquad + 30, fishSquad + 10)
  // line(fishSquad + 40, fishSquad + 20, fishSquad + 50, fishSquad + 20)
  
}