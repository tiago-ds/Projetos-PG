let bracinho;
let WIDTH = 500;
let HEIGHT = 500;
let startDate = new Date();
let ok = false;

function setup() {
  // Cria o canvas e o objeto do Braço
  createCanvas(WIDTH, HEIGHT);
  bracinho = new Braco(15);
  angleMode(DEGREES);
  frameRate(55);
}

function draw() {
  background(25, 70, 180);
  bracinho.update();
}

class Braco{
  
  constructor(UC){
    this.braco = new createVector(0, 2*UC); 
    this.antebraco = new createVector(0, 3*UC);
    this.angulo = 0;
    this.const = -0.5;
  }
  
  update(){
    if(this.angulo > -45){
      this.angulo+=this.const;
    }else{
      if(!ok){
        console.log(`TIME: ${new Date() - startDate}`);
        ok = true;
      }
      
    }
    if (frameCount == 0) {
      startDate = new Date();
    }
    push();
    // Transfere o centro de rotação para
    // o meio do canvas.
    translate(WIDTH/2, 2*HEIGHT/6);
    
    // Rotaciona 
    rotate(this.angulo);
    
    // Linha do braço
    strokeWeight(3);
    stroke(0);
    line(0, 0, 0, this.braco.y);
    
    // Ponto do braço
    strokeWeight(10);
    stroke(255);
    point(0, 0);
    
    // Fim das operações pro braço
    push();
    translate(0, this.braco.y);
    rotate(this.angulo);
    
    // Linha do antebraço
    strokeWeight(3);
    stroke(0);
    line(0, 0, 0, this.antebraco.y);
    
    // Pontos do antebraço
    strokeWeight(10);
    stroke(255);
    point(0, 0);
    point(0, this.antebraco.y);
    
    pop();
    pop();
  }
}