let bracinho;

const WIDTH = 800;
const HEIGHT = 800;
const FRAMERATE = 60;

let startDate = new Date();

// Variável auxiliar
let finished = false;

function setup() {
  // Cria o canvas e o objeto do Braço
  createCanvas(WIDTH, HEIGHT);
  bracinho = new Braco(30);
  angleMode(DEGREES);
  frameRate(60);
}

function draw() {
  background(245, 245, 220);
  bracinho.update();
}

class Braco{
  
  constructor(UC){

    // Cria guias para o braço e o antebraço
    this.braco = new createVector(0, 2*UC); 
    this.antebraco = new createVector(0, 3*UC);

    // Inicializa variável que ajustará a rotação
    this.angulo = 0;

    /* Constante somada ao ângulo a cada frame.
    /  Esse é o valor pois o braço deve girar 45°
    /  a cada 2 segundos, por isso o valor de 
    /  FRAMERATE é dividido por 2.
    */
    this.const = 45 / (FRAMERATE*2);
  }
  
  update(){
    
    /* Condição para medir o tempo inicial da 
    /  animação 
    */
    //if (frameCount == 0) {
    //  startDate = new Date();
    //}
    
    
    /* Condição que define quando a rotação
    /  vai parar
    */
    if(this.angulo > -45){
      this.angulo-=this.const;
    }
    
    /* Condição para o tempo só ser imprimido
    /  uma vez
    */
    else if(!finished){
        console.log(`TIME: ${new Date() - startDate}`);
        finished = true;
    }
    
    /* "Sobe um nível" na operação do canvas
    /  para realizar operações matriciais
    */
    push();
    
    /* Transfere o centro de rotação para
    /  o meio horiontal do canvas.
    */
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
    // Fim das operações para o braço
    
    /* "Sobe" mais um nível, para preservar
    /  as operações realizadas no nível 
    /  anterior
    */ 
    push();
    
    /* Move o centro de rotação para o 
    /  início do antebraço
    */ 
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
    // Fim das operações para o antebraço
    
    /* "Desce" o nível subido nos push()
    /  anteriores
    */
    pop();
    pop();
  }
}

function mouseClicked(event){
  console.log(event);
  bracinho.angulo = 0;
  finished = false;
  startDate = new Date();
}