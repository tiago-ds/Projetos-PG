let startDate = new Date();

/*  Explicação da questão: 
/   Nessa questão, a chave foi entender o padrão de
/   crescimento no "raio" da semi circuferência.
/   A partir do momento que é entendido que o centro
/   de rotação da próxima volta é o ponto de 
/   interseção do arco com o eixo X, a questão fica
/   bem simples. Basicamente, a cada meia volta ao 
/   redor do eixo, o raio é dobrado e o centro de 
/   rotação é transladado para o centro do próximo 
/   arco.
*/

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
  
  // Cria o ponto de início
  pontinho = new Ponto();
}

function draw() {
  if(frameCount == 0){
    startDate = new Date();
  }
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
    this.const = 0.75;
    this.tag = -1;
    this.cont = 0;
  }
  nextFrame(){
    
    /* A cada meia volta no eixo:
    /    - Soma o inverso do Raio ao desvio do eixo
    /    - Inverte a variável Tag para poder inverter a soma
    /    - Dobra o raio
    */
    if(this.angulo != 0 && this.angulo % 180 == 0){
      console.log(`Time : ${new Date() - startDate}`);
    /* A tag inicializa como -1 para que a primeira soma seja
    /  -20, e não 20, que seria o resultado caso a tag fosse 
    /  inicializada com 1;
    */
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
    /  de rotação
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
