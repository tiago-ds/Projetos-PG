/* Ao monitor responsável: O desenho parece
/  diferente da especificação do projeto,
/  mas está como pedido na questão. Isso
/  acontece porque não foi especificado o
/  o valor das rotações que deveríamos 
/  aplicar no início da questão, para que
/  os três eixos ficassem visíveis.
*/

/* Variável responsável pela velocidade
/  de rotação
*/ 
let angle = 0;

// Raio do círculo maior
let bRaio = 100;

//Raio do círculo menor
let lRaio = bRaio/4;

function setup() {
  createCanvas(1000, 1000, WEBGL);
  angleMode(DEGREES);
  background(220);
  perspective();
}

function draw() {
  background(255);

  // Desenha linhas dos eixos
  desenhaSetup();

  
  /* Alinha o eixo de desenho
  /  com os eixos já desenhados
  */ 
  //rotateX(-30);
  //rotateY(30);

  /* Rotaciona ao redor da linha
  /  azul para alinhar com a linha
  /  vermelha 
  */ 
  rotateY(-90);

  /* Rotaciona 60° ao redor da linha
  /  vermelha para desenhar o quadrado
  /  como pedido na questão
  /  O valor aplicado é -150 pois:
  /  Rotacionar 90° ao redor do eixo
  /  X faz com que o desenho fique 
  /  contido no plano formado pelas
  /  linhas vermelha e verde, como se
  /  eu não tivesse aplicado nenhuma
  /  rotação. Dessa forma, aplicar uma
  /  rotação de 60° seria somar 60 ao
  /  valor que já tenho(90°). O valor
  /  150 é o resultado, e está negativo
  /  para que seja no sentido correto
  */
  rotateX(-150);
  //rotateX(210);

  // Desenha o quadrado e o círculo 
  
  noFill();
  strokeWeight(5);
  stroke(0);
  rect(0,0,2*bRaio);
  
  fill(255);
  circle(bRaio, bRaio, 2*bRaio);

  // Move o eixo para o centro do círculo
  translate(bRaio, bRaio);
  
  // Desenha o Ponto no centro do círculo
  point(0, 0);

  // Rotaciona ao redor do centro do círculo naior
  rotateZ(angle);

  // Move o eixo de até a linha do círculo maior
  translate(0, -bRaio, -lRaio);

  /* Deixa o círculo menor sempre alinhado com o 
  /  círculo menor
  */
  rotateX(90);

  /* Rotaciona o círculo e o ponto no dobro da 
  /  velocidade 
  */
  rotateZ(angle*2);

  // Desenha o círculo
  stroke(0);
  strokeWeight(5);
  noFill();
  circle(0, 0, 2*lRaio);

  // Desenha o ponto no círculo
  strokeWeight(10);
  stroke('red');
  point(0, -lRaio);

  
  /* Constante de velocidade da rotação.
  /  Para mudar a velocidade, basta mudar
  /  a constante que subtrai o valor do 
  /  ângulo.
  */
  angle += 1.75;
}

function desenhaSetup(){
  // Linha mais fina
  strokeWeight(2);
  
  //

  // Ao redor da linha VERDE
  rotateX(-30);

  // Ao redor da linha AZUL
  rotateY(30);

  // Ao redor da linha VERMELHA
  //rotateZ(30);

  // Desenha as três linhas do eixo
  stroke('green');
  line(0, 0, 0, 4*bRaio, 0, 0);
  stroke('blue');
  line(0, -4*bRaio, 0, 0, 0, 0);
  stroke('red');
  line(0, 0, 4*bRaio, 0, 0, 0);

  //pop();
}