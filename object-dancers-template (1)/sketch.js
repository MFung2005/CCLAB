/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new AmongUs();
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  
  dancer.display();
  dancer.update();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class AmongUs {
  constructor(startX, startY) {
    this.x = width/2;
    this.y = height/2;
  }
  update() {
    noStroke();
    //print(frameCount)
    let conditionStatement = frameCount % 60 < 50;
    if (conditionStatement) {
      //hand
      push();
      rotate(PI / 4);
      translate(320 + 400, -20);
      //palm
      fill(140, 0, 0);
      ellipse(10, 10, 60 / 2, 50 / 2);
      //fingers
      fill(255, 0, 0);
      ellipse(0, 0, 15 / 2, 20 / 2);
      ellipse(15 / 2, 0, 15 / 2, 20 / 2);
      ellipse(30 / 2, 0, 15 / 2, 20 / 2);
      //pointer finger
      ellipse(45 / 2, -5 / 2, 15 / 2, 30 / 2);
      //thumb
      ellipse(45 / 2, 20 / 2, 30 / 2, 15 / 2);


      line(200 / 2, 200 / 2, 240 / 2, 240 / 2);
      pop();
    }
    if (conditionStatement == false){
      push();
    
    translate(60/2, 260/2);
      rotate(3*PI/2);
    //palm
    fill(159,0,0);
    ellipse(320-550,330 - 90,60/2,50/2);
    //fingers
    fill(150,0,0);
    ellipse(320-545,330-100,15/2,20/2);
    ellipse(320-553,330-100,15/2,20/2);
    ellipse(320-560,330-100,15/2,20/2);
    //pointer finger
    ellipse(320-540,330-100,15/2,30/2);
    //thumb
    ellipse(320-535,330-90,30/2,15/2);
      pop();
    }
  }

  display() {  // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️
    noStroke();
    push();
    fill(255, 0, 0);
    //body
    //translate(width / 2 - 20, height / 2);
    ellipse(0, 0, 75, 100);
    //legLeft
    rect(-75 / 2, 5 / 2, 50 / 2, 150 / 2, 10 / 2);
    //legRight
    rect(25 / 2, 5 / 2, 50 / 2, 130 / 2, 10 / 2);
    //glass
    fill(219, 225, 227)
    ellipse(40 / 2, -40 / 2, 120 / 2, 70 / 2);
    //backpack
    fill(255, 0, 0)
    rect(-110 / 2, -30 / 2, 50 / 2, 110 / 2, 10);
    pop();

    //arm
    stroke(159, 0, 0);
    strokeWeight(12);
    line(320-325, 330 -325, 320 - 345, 330-310);
    line(320 -325, 330 - 300, 320 - 345, 330-310);





    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    this.drawReferenceShapes()

    pop();
  }

  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    //line(-5, 0, 5, 0);
    //line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);

  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/