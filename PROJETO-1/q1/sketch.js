// Declarar variável global da bolinha
let bolinha; 

// Constantes para definir velocidade
const WIDTH = 1000;
const HEIGHT = 1000;
const FRAMERATE = 60;

// Variável para medir o tempo do trajeto
//let startDate;

function setup() {

  createCanvas(WIDTH, HEIGHT);

  // Inicia a bolinha com raio 30
  bolinha = new Ball(30);
  
  /* Troca o frameRate para que o
  /  percurso dure 4 segundos sem
  /  que o FrameRate importe
  */ 
  frameRate(FRAMERATE);
}

function draw() {
  background(118);
  
  // Chama os métodos da bolinha
  bolinha.update();
  bolinha.display();
}

class Ball {

  constructor(raio) {
    this.raio = raio;
    
    /* Iniciar a posição da bolinha encostada
    /  na parede.
    */
    this.posicao = new createVector(raio, HEIGHT/2 - raio);

    /* Fórmula da velocidade. A velocidade 
    /  vertical é 10, como especificado na
    /  questão, e a horizontal a largura da 
    /  da tela dividida por duas vezes o 
    /  FrameRate pois ela tem 2 segundos para
    /  chegar de um lado ao outro da tela.
    /  A subtração de 0.5 é apenas para tratar
    /  a confusão que o JS faz com números
    /  de ponto flutuante.
    */
    this.velocidade = new createVector(WIDTH/(FRAMERATE*2) - 0.5, -10);

    /* Vetor de gravidade, no valor especificado
    /  na questão
    */
    this.gravidade = new createVector(0, 0.5);
  }
  
  update() {

    // Movimenta a bolinha
    this.posicao.add(this.velocidade);

    /* Condição para caso a bolinha bata em
    /  uma das paredes.
    */
    if((this.posicao.x + this.raio) > WIDTH ||
      this.posicao.x < this.raio){

      // Comandos para medir o tempo do percurso
      //console.log(`DATE: ${new Date() - startDate}`);
      //startDate = new Date();
      
      // Põe a bolinha na direção contrária
      this.velocidade.x *= -1;
    }
    /* Condição para a bolinha quicar na superfície
    /  vermelha.
    */
    if((this.posicao.y + this.raio) > HEIGHT/2){

      // Troca o sentido vertical da bolinha
      this.velocidade.y *= -1;
      
      // Esse é mais um ajuste para ajudar o JS
      // a tratar números quebrados.
      this.posicao.y = HEIGHT/2 - this.raio;
    }
    
    // A cada frame, adiciona a gravidade;
    this.velocidade.add(this.gravidade);
    
  }
  display() {
    // Comandos para iniciar a contagem de tempo
    //if (frameCount == 0) {
    //  startDate = new Date();
    //}

    // Desenha o plano de fundo
    fill(250, 0, 0);
    rect(0, HEIGHT/2, WIDTH, HEIGHT)
    fill(0, 0, 250);

    // Desenha a bolinha
    ellipse(this.posicao.x, this.posicao.y, this.raio*2, this.raio*2);
  }
}

