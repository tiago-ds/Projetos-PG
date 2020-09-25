let pontinho;

const WIDTH = 800;
const HEIGHT = 800;

// Coordenadas da origem
const oX = WIDTH/2;
const oY = HEIGHT/2;

function setup() {
  // Definir frame rate
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
  strokeWeight(0.5);
  pontinho.linhas();
}

class Ponto {
  constructor() {
    this.raio = -20;
    this.angulo = 0;
    this.const = 1;
    this.tag = -1;
    this.cont = 0;
  }
  nextFrame(){
    
    /* A cada meia volta no eixo:
    /    - Soma o inverso Raio ao desvio do eixo
    /    - Inverte a variável Tag para poder inverter a soma
    /    - Dobra o raio
    */
    if(this.angulo != 0 && this.angulo % 180 == 0){
      this.cont += (-this.tag*this.raio);
      this.tag *= -1;
      this.raio *= 2;
    }
    
    /* A cada volta completa no eixo:
    /    - Zera o ângulo para facilitar operações.
    */
    if(this.angulo != 0 && this.angulo % 360 == 0){
      this.angulo = 0;
    }

    push();
    /* Adiciona o desvio para a origem estar no centro
    /  do canvas
    */ 
    translate(oX + this.cont, oY);
    
    /* Rotaciona o canvas na direção negativa, para a
    /  rotação ir no sentido anti-horário
    */
    rotate(-this.angulo);
    
    // Desenha o ponto considerando o desvio da espiral
    point(this.raio, 0);
    
    // Adiciona um valor pequeno ao ângulo para rotacionar
    this.angulo+=this.const;
    
    pop();
  }
    /* Função que desenha as linhas do eixo, para ficarem
    /  por cima da espiral.
    */
    linhas(){
      stroke(10, 10, 250);
      line(0, HEIGHT/2, WIDTH, HEIGHT/2);
      stroke(10, 250, 10);
      line(WIDTH/2, 0, WIDTH/2, HEIGHT); 
    }
}
