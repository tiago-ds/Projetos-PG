// GUIA: 


function setup() {
  createCanvas(1000, 1000, WEBGL);
  angleMode(DEGREES);
  background(220);

  strokeWeight(2);
  
  push();

  // Ao redor da linha VERDE
  rotateX(-30);

  // Ao redor da linha AZUL
  rotateY(30);

  // Ao redor da linha VERMELHA
  //rotateZ(30);

  // Desenha as três linhas
  stroke('green');
  line(0, 0, 0, 400, 0, 0);
  stroke('blue');
  line(0, -400, 0, 0, 0, 0);
  stroke('red');
  line(0, 0, 400, 0, 0, 0);

  pop();
  
  
}

function draw() {

  push();
  /* Alinha o eixo de desenho
  /  com os eixos já desenhados
  */ 
 rotateX(-30);
 rotateY(-30);

 /* Rotaciona o eixo para alinhar
 /  o desenho do círculo e do 
 /  quadrado
 */ 
 rotateY(-30);
 rotateX(240);

 // Desenha o círculo e o quadrado
 noFill();
 strokeWeight(5);
 rect(0,0,200);
 fill(255);
 circle(100, 100, 200);
 point(100, 100);
 
 stroke('red');
 translate(100, 100);
 rotateX(-90);
 point(0, 0, 0);
 line(0,0,0, 0, 100, 0);

 pop();
 
}