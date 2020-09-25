let pontinho;
const WIDTH = 500;
const HEIGHT = 500;
const oX = WIDTH/2;
const oY = HEIGHT/2;

function setup() {
  frameRate(60);
  // Modo de tratar ângulos será em graus;
  angleMode(DEGREES);
  
  // Cria canvas
  createCanvas(WIDTH, HEIGHT);
  background(100);
  
  // OX e OY
  stroke(10, 10, 250);
  line(0, HEIGHT/2, WIDTH, HEIGHT/2);
  stroke(10, 250, 10);
  line(WIDTH/2, 0, WIDTH/2, HEIGHT);
  
  // Cria o ponto de início
  pontinho = new Ponto(WIDTH/2 - 20, HEIGHT/2);
}

function draw() {
  stroke(250, 10, 10);
  strokeWeight(5);
  pontinho.nextFrame();
}

class Ponto {
  constructor() {
    this.raio = -20;
    this.angulo = 0;
    this.const = -0.111111;
  }
  nextFrame(){
    push();
    translate(oX, oY);
    rotate(-this.angulo);
    point(this.raio, 0);
    this.angulo+=0.5;
    console.log(this.angulo);
    if(this.angulo > 180){
      this.raio-=0.1111; 
    }
    if(this.angulo > 360){
      this.raio-=0.1111; 
    }
    if(this.angulo > 540){
      this.raio-=0.1111; 
    }
    pop();
  }
}
