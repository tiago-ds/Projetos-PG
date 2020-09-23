let bolinha; 
const WIDTH = 800;
const HEIGHT = 800;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  bolinha = new Ball(30);
}

function draw() {
  background(118);
  bolinha.update();
  bolinha.display();
}

class Ball {
  constructor(raio) {
    this.raio = raio;
    this.posicao = new createVector(raio, HEIGHT/2 - raio);
    this.velocidade = new createVector(8, -10);
    this.gravidade = new createVector(0, 0.5);
  }
  
  update() {
    this.posicao.add(this.velocidade);
    if((this.posicao.x + this.raio) > WIDTH ||
      this.posicao.x == this.raio){
      this.velocidade.x *= -1;
    }
    if((this.posicao.y + this.raio) > HEIGHT/2){
      this.velocidade.y *= -1;
      this.posicao.y = HEIGHT/2 - this.raio;
    }
    this.velocidade.add(this.gravidade);
    
  }
  display() {
    fill(250, 0, 0);
    rect(0, HEIGHT/2, WIDTH, HEIGHT)
    fill(0, 0, 250);
    ellipse(this.posicao.x, this.posicao.y, this.raio*2, this.raio*2);
  }
}

