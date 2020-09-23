let pontinho;
const WIDTH = 800;
const HEIGHT = 800;
const OX = WIDTH/2;
const OY = HEIGHT/2;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  background(100);
  pontinho = new Ponto(-20,0.5);
  stroke(10, 10, 250);
  line(0, HEIGHT/2, WIDTH, HEIGHT/2);
  stroke(10, 250, 10);
  line(WIDTH/2, 0, WIDTH/2, HEIGHT);
  frameRate(15);
}

function draw() {
  stroke(250, 10, 10);
  strokeWeight(5);
  pontinho.display();
  pontinho.update();
  
}

class Ponto {
  constructor(x, y) {
    this.posicao = new createVector(x, y);
  }
  update(){
  }
  display(){
    let step = frameCount % 20;
    let angle = map(step, 0, 20, 0, TWO_PI);
    let cos_a = cos(angle);
    let sin_a = sin(angle);
    translate(WIDTH/2, HEIGHT/2);
    applyMatrix(cos_a, -sin_a, sin_a, cos_a, 0, 0);
    if(step == 0){
      this.posicao.x *=2; 
    }
    point(this.posicao.x, this.posicao.y);
  }
}
