let bracinho;
let WIDTH = 800;
let HEIGHT = 800;
let startDate = new Date();
let finished = false;

function setup() {
  // Cria o canvas e o objeto do Braço
  createCanvas(WIDTH, HEIGHT);
  bracinho = new Braco(30);
  angleMode(DEGREES);
  frameRate(45);
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
    this.const = -0.75;
  }
  
  update(){
    
    /* Condição para medir o tempo inicial da 
    /  animação 
    */
    if (frameCount == 0) {
      startDate = new Date();
    }
    
    
    /* Condição que define quando a rotação
    /  vai parar
    */
    if(this.angulo > -45){
      this.angulo+=this.const;
    }
    
    /* Condição para o tempo só ser imprimido
    /  uma vez
    */
    else if(!finished){
        console.log(`TIME: ${new Date() - startDate}`);
        finished = true;
    }
    
    /* "Sobe um nível" na operação de matrizes
    /
    */
    push();
    // Transfere o centro de rotação para
    // o meio do canvas.
    translate(WIDTH/2, 2*HEIGHT/6);
    
    // Rotaciona o canvas em -0,75 grau
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