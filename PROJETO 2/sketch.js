const WIDTH = 1000;
const HEIGHT = 600;

let curvas = [];
let pontos_controle = [];

let numero_avaliacoes = 200;

let butao;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  background(188);
  butao = createButton('generate').position(50, 50);
  butao.mousePressed(Generate);
}

function draw() {
  for(ponto in pontos_controle){
    pontos_controle[ponto].display();
  }
  for(curva in curvas){
    curvas[curva].display_curva();
    curvas[curva].display_pontos();
    curvas[curva].display_poligonais();
  }
}

function mouseClicked() {
  pontos_controle.push(new Ponto(mouseX, mouseY));
}

function castelinho(pontos, x) {
  if (pontos.length > 1) {
    let aux = [];
    let tX, tY;
    for (i = 0; i < pontos.length - 1; i++) {
      tX = pontos[i].x * (1 - (x/numero_avaliacoes)) + pontos[i + 1].x * (x/numero_avaliacoes);
      tY = pontos[i].y * (1 - (x/numero_avaliacoes)) + pontos[i + 1].y * (x/numero_avaliacoes);
      aux.push(new Ponto(tX, tY));
    }
    return castelinho(aux, x);
  }
  else {
    return pontos[0];
  }
}


function Generate(){
  if(pontos_controle.length <= 1)
    return;
  let c = new Curva();
  for(x = 0; x <= numero_avaliacoes; x++){
    let ponto = castelinho(pontos_controle, x);
    c.pontos_avaliacao.push({ x: ponto.x, y: ponto.y });
    c.pontos_controle = pontos_controle;
  }
  curvas.push(c);
  pontos_controle = [];
}

class Curva{
  constructor(){
    //O tamanho de pontos_Avaliacao será de n+1 avaliações,
    //pois ele serve de base para as linhas de avaliação.
    this.pontos_avaliacao = [];
    this.pontos_controle = [];
  }
  display_curva(){
    strokeWeight(2);
    for(x = 0; x < this.pontos_avaliacao.length - 1; x++){
      line(this.pontos_avaliacao[x].x,
           this.pontos_avaliacao[x].y,
           this.pontos_avaliacao[x + 1].x,
           this.pontos_avaliacao[x + 1].y);
    }
  }
  display_pontos(){
    strokeWeight(5);
    for(x = 0; x < this.pontos_controle.length; x++){
      point(this.pontos_controle[x].x, this.pontos_controle[x].y);
    }
  }
  display_poligonais(){
    strokeWeight(1);
    for(x = 0; x < this.pontos_controle.length - 1; x++){
      line(this.pontos_controle[x].x, 
           this.pontos_controle[x].y,
           this.pontos_controle[x + 1].x,
           this.pontos_controle[x + 1].y);
    }
  }
}

class Ponto{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  display(){
    strokeWeight(5);      
    point(this.x, this.y);
  }
}