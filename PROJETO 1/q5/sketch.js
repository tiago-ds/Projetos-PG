// GUIA: 


function setup() {
  createCanvas(1000, 1000, WEBGL);
  angleMode(DEGREES);
  background(220);

  strokeWeight(2);
  push()
  // Ao redor da linha VERDE
  rotateX(-30);
  // Ao redor da linha AZUL
  rotateY(30);
  // Ao redor da linha VERMELHA
  //rotateZ(30);

  stroke('green');
  line(0, 0, 0, 400, 0, 0);
  stroke('blue');
  line(0, -400, 0, 0, 0, 0);
  stroke('red');
  line(0, 0, 400, 0, 0, 0);
  pop();
  
  push();
  rotateX(-30);
  rotateY(-60);
  rotateX(240);
  noFill();
  strokeWeight(5);
  point(100, 100);
  rect(0,0,200);
  circle(100, 100, 200);
}

function draw() {
  push();
  
}