let cam;
let s = 7;

function setup() {
  createCanvas(640, 480, WEBGL);
  cam = createCapture(VIDEO);
  cam.hide();
}
function draw() {
  background(0);

  cam.loadPixels();

  for (let x = 0; x < cam.width; x += s) {
    for (let y = 0; y < cam.height; y += s) {
      
      let i = (x + y * cam.width) * 4;

      let r = cam.pixels[i + 0];
      let g = cam.pixels[i + 1];
      let b = cam.pixels[i + 2];
      
      push();
      let br =(r+g+b)/3;
      let z = map(br, 0, 255, 0, 200);
      translate(x - width / 2, y - height / 2, z);
      
      noStroke();
      fill(r, g, b);
      rect(0, 0, s,s);
      
      pop();
    }
  }

}