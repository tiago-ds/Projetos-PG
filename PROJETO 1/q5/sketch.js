let angle = 0;
let bRaio = 100;
function setup() {
  createCanvas(1000, 1000, WEBGL);
  angleMode(DEGREES);
  background(220);
  perspective();
}

function draw() {
  background(255);

  // Desenha linhas
  desenhaSetup();

  push();
  
  /* Alinha o eixo de desenho
  /  com os eixos já desenhados
  */ 
  rotateX(-30);
  rotateY(30);

  /* Rotaciona ao redor da linha
  /  azul para alinhar com a linha
  /  vermelha 
  */ 
  rotateY(-90);

  /* Rotaciona 60° ao redor da linha
  /  vermelha para desenhar o quadrado
  /  como pedido na questão
  /  (O valor aplicado é -150 pois já
  /  haviam rotações aplicadas anterior-
  /  mente)
  */
  rotateX(-150);
  //rotateX(210);

  /* Desenha o círculo, o quadrado e o
  /  ponto no centro.
  */
  noFill();
  strokeWeight(5);
  rect(0,0,200);
  fill(255);
  circle(100, 100, 200);
  point(100, 100);

  // Move o eixo para o centro do círculo
  translate(100, 100);

  /* Deixa o eixo de rotação 2d perpendicular
  /  ao plano
  */
  rotateZ(-angle);
  
  //circle(0, 0 , 0, 25);

  // Move o eixo de até a linha do círculo maior
  translate(0, -100, -25);

  // Ponto no círculo menor
  rotateX(90);

  // Rotaciona o círculo e o ponto no dobro da 
  // velocidade 
  rotateZ(-angle*2);

  // Desenha o círculo
  stroke(0);
  strokeWeight(5);
  noFill();
  circle(0, 0, 50);

  // Desenha o ponto no círculo
  strokeWeight(10);
  stroke('red');
  point(0, -25);

  pop();
  angle -= 2;
}

function desenhaSetup(){
  // Linha mais fina
  strokeWeight(2);
  
  push();

  // Ao redor da linha VERDE
  rotateX(-30);

  // Ao redor da linha AZUL
  rotateY(30);

  // Ao redor da linha VERMELHA
  //rotateZ(30);

  // Desenha as três linhas do eixo
  stroke('green');
  line(0, 0, 0, 400, 0, 0);
  stroke('blue');
  line(0, -400, 0, 0, 0, 0);
  stroke('red');
  line(0, 0, 400, 0, 0, 0);

  pop();
}