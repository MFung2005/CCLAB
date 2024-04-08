// CCLab Mini Project - 9.R Particles Template

let NUM_OF_PARTICLES = 400; // Decide the initial number of particles.
let mySound;
let particles = [];

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("canvasWrapper");

  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(85,width-195), random(190,height-135));
  }
  mySound = loadSound("assets/static.mp3");
}

function draw() {
  background(50);

  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
  }
}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties: particle's characteristics
    this.x = startX;
    this.y = startY;
    this.dia = 20;
  }
  // methods (functions): particle's behaviors
  update() {
    // (add)
    let on = false;
    let flicker;
    let press;
    let buttondist = dist(450,495,mouseX,mouseY);
    if (buttondist < 12){
      on = true;
    } else {
      on = false;
    }
    if (mouseIsPressed){
      press = true;
    }
    if (on == true && mouseIsPressed){
      flicker = true;
    }
    if (flicker == true){
      push();
      
      translate(this.x, this.y);
      
      
      fill(random(0,255));
      rect(0, 0, this.dia, this.dia);
      pop();
      mySound.play();
    } else {
      mySound.stop();
    }
    if (flicker == false){
      mySound.stop();
    }
  }
  display() {
    // particle's appearance
    //tv
    stroke(4);
    line(350,120,410,160)
    line(475,120,410,160)

    noStroke();
    //bottomtv
    fill(211);
    rect(70,height-125,460,20,15);
    fill(88,57,39);
    rect(70,height-110,460,20,15);
    
    //toptv
    fill(211);
    rect(70,175,460,20,15);
    fill(88,57,39);
    rect(70,160,460,20,15);

    //tvleftside
    fill(211)
    rect(85,180,20,310,15);
    fill(88,57,39);
    rect(70,160,20,350,15);

    //tvrightside
    fill(211)
    rect(415,180,100,310,15);
    fill(88,57,39);
    rect(510,160,20,350,15);
    ///topbox
    fill(70);
    rect(425,195,75,130,5);
    //bottombox
    fill(40);
    rect(425,335,75,140,5);

    //button
    strokeWeight(2);
    fill(120);
    circle(450,495,24);    
    //circle(0, 0, this.dia);

  }
}
