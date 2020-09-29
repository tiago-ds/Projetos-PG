function setup() {
  createCanvas(800, 800, WEBGL);
  angleMode(DEGREES);
  background(220);
  //rotateX(30);
  rotateY(30);
  stroke('green');
  line(0, 0, 0, 400, 0, 0);
  stroke('blue');
  line(0, -400, 0, 0, 0, 0);
  stroke('red');
  line(0, 0, 400, 0, 0, 0);
}

function draw() {

}