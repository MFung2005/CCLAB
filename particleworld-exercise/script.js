// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 20; // Decide the initial number of particles.

let particles = [];
let freq;
let t1 = .001; // attack time in seconds
let l1 = .5; // attack level 0.0 to 1.0
let t2 = 0.8; // decay time in seconds
let l2 = 0.01; // decay level  0.0 to 1.0
function setup() {
  let canvas = createCanvas(400, 900);
  canvas.parent("p5-canvas-container");

  // generate particles
  // for (let i = 0; i < NUM_OF_PARTICLES; i++) {
  //   particles[i] = new Particle(random(width), random(height));
  // }
}

function draw() {
  background(0,0,255);

  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
    p.putBack();
    if(p.isGone == true){
      particles.splice(i,1);
    }
  }
  if(mouseIsPressed){
    particles.push(new Particle(mouseX, mouseY));
  }
}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties: particle's characteristics
    this.x = startX;
    this.y = startY;
    this.dia = random(5,50);
    //this.speed = 40/this.dia;
    //or
    //diameter gives the speed of the bubble
    //range of size between the bubbles
    this.speed = map(this.dia, 5,50,5,1);
    this.fr = map(this.dia,5, 50, 500, 50);
    this.env = new p5.Envelope(t1, l1, t2, l2);
    this.triOsc = new p5.Oscillator('sine');
    this.isGone;
  }
  // methods (functions): particle's behaviors
  update() {
    // (add) 
    this.y -= this.speed;
    
  }
  display() {
    //particle's appearance
    push();
    
    translate(this.x, this.y);
    
    noStroke();
    fill(255,255,255,128);
    circle(0, 0, this.dia);

    pop();
  }
  putBack(){
    if (this.y < -this.dia){
      //this.y = height+ this.dia;
      this.isGone = true

      this.triOsc.freq(this.fr,.1);
      this.triOsc.start();
      this.env.play(this.triOsc);
  }
}
}