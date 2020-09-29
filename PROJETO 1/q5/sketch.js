// GUIA: 


function setup() {
  createCanvas(800, 800, WEBGL);
  angleMode(DEGREES);
  background(220);

  strokeWeight(2);

  // Ao redor da linha VERDE
  rotateX(-30);
  // Ao redor da linha AZUL
  rotateY(30);
  
  // Ao redor da linha VERMELHA
  //rotateZ(30);
  stroke('green');
  line(0, 0, 0, 200, 0, 0);
  stroke('blue');
  line(0, -200, 0, 0, 0, 0);
  stroke('red');
  line(0, 0, 200, 0, 0, 0);

}

function draw() {
  //rect(0, 0, 200, 200);
}