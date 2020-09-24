let pontinho;
const WIDTH = 500;
const HEIGHT = 500;
const oX = WIDTH/2;
const oY = HEIGHT/2;

function setup() {
  frameRate(300);
  
  // Cria canvas
  createCanvas(WIDTH, HEIGHT);
  background(100);
  
  // OX e OY
  stroke(10, 10, 250);
  line(0, HEIGHT/2, WIDTH, HEIGHT/2);
  stroke(10, 250, 10);
  line(WIDTH/2, 0, WIDTH/2, HEIGHT);
  
  /* Move os eixos para o centro
  /  de forma a deixar as coordenadas
  /  mais intuitivas
  */
  //translate(WIDTH/2, HEIGHT/2);
  
  // Cria o ponto de início
  pontinho = new Ponto(WIDTH/2 - 20, HEIGHT/2);
}

function draw() {
  //translate(WIDTH/2, HEIGHT/2);
  stroke(250, 10, 10);
  strokeWeight(5);
  pontinho.display();
  pontinho.update();
}

class Ponto {
  constructor(x, y) {
    this.posicao = new createVector(x, y);
    this.angulo = 0.1;
    this.rotacao = 10;
    this.giro = 0.5;
    this.grow = this.giro*5;
  }
  update(){
    this.angulo+=this.giro;
    this.rotacao += this.grow;
    this.posicao.x = oX + cos(this.angulo)*this.rotacao;
    this.posicao.y = oY -sin(this.angulo)*this.rotacao;
    if(frameCount%50 == 0){
      this.angulo*=2;
    }
  }
  display(){
    point(this.posicao.x, this.posicao.y);
  }
}
