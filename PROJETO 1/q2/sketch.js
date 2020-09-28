let bracinho;
let WIDTH = 500;
let HEIGHT = 500;
let startDate = new Date();

function setup() {
  // Cria o canvas e o objeto do Braço
  createCanvas(WIDTH, HEIGHT);
  bracinho = new Braco(20);
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
    this.const = 0.0045;
  }
  update(){
    /* Isso acontece por causa de JS.
    /  A ideia era que o ângulo*90 deveria
    /  ir até 45°. Mas como JS é TERRÍVEL
    /  pra trabalhar com números quebrados 
    /  - podemos perceber a discrepância 
    /  gigantesca se descomentarmos a linha
    /  40 -, tivemos que colocar 46 e 
    /  trabalhar com o operador "<", mas
    /  ainda assim não chegamos ao ângulo
    /  exato.Multiplicamos a condição por 
    /  90 que é o ângulo que engloba ir de 
    /  totalmente vertical até totalmente 
    /  horizontal.
    */
    if(this.angulo*90 < 46){
      //console.log(this.angulo * 90);
      if (frameCount == 0) {
        startDate = new Date();
      }
      push();
      // Transfere o centro de rotação para
      // o meio do canvas.
      translate(WIDTH/2, HEIGHT/2);
      rotate(-this.angulo);
      
      // linha do braço
      strokeWeight(2);
      stroke(0);
      line(0, 0, 0, this.braco.y);
      strokeWeight(8);
      stroke(255);
      point(0, 0);
      
      // fim das operações para o braço
      push();
      translate(0, this.braco.y);
      rotate(-this.angulo * 2);
      
      strokeWeight(2);
      stroke(0);
      line(0, 0, 0, this.antebraco.y);
      
      strokeWeight(8);
      stroke(255);
      point(0, 0);
      point(0, this.antebraco.y);
      
      this.angulo+=this.const;
      pop();
      pop();
    }
    else{
      push()
      translate(WIDTH/2, HEIGHT/2);
      rotate(-this.angulo);
      
      strokeWeight(2);
      stroke(0);
      line(0, 0, 0, this.braco.y);
      strokeWeight(8);
      stroke(255);
      point(0, 0);
      
      push();
      translate(0, this.braco.y);
      rotate(-this.angulo*2);
      
      strokeWeight(2);
      stroke(0);
      line(0, 0, 0, this.antebraco.y);
      strokeWeight(8);
      stroke(255);
      point(0, 0);
      point(0, this.antebraco.y);
      
      pop();
      pop();
      console.log(`DATE: ${new Date() - startDate}`);
      //console.log(this.angulo * 90);
    }
  }
}