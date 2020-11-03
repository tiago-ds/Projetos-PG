// TODO:
// Lista que salva as curvas pra poder selecionar qualquer uma delas
// Campo pra trocar o valor de numero_avaliacoes
// Botão de alterar curva escolhida

// minha ideia:
// em cada rodada do Draw(), eu pego os pontos de controle de todas as curvas,
// e aplico de casteljau com cada array de pontos de controle, um pra cada curva
// o objeto Curva vai ter pontos de controle e cor apenas. Em cada rodada do draw,
// eu entrego esse atributo de cada curva pra um decasteljau, e ele recalcula.


//pra a area da curva selecionada:
//let divla = document.querySelector('saidjfasjfisajdf')
//divla.appendChild(o node);

const WIDTH = 1000;
const HEIGHT = 600;

let BGC1;
let BGC2;

let construindo = false;

let selecionada;
let selecionado;

// Array com as curvas
let curvas = [];

// WIP array dos pontos de controle sendo adicionados agr
let pontos_controle = [];

// WIP variável de seleção do número de Avaliações
let numero_avaliacoes = 100;

//Flags para mostrar ou não essas coisas aí
let FlagPontosControle = true;
let FlagPoligonaisControle = false;
let FlagCurvas = true;

let btn_CriarCurva = document.getElementById('newCurve');
let btn_SelecionarCurva = document.getElementById('selectCurve');
let btn_DeletarCurva = document.getElementById('deleteCurve');

let box_PontosControle = document.getElementById('controlPoints');
let box_PoligonaisControle = document.getElementById('polygonalPoints');
let box_Curvas = document.getElementById('curves');

btn_CriarCurva.onclick = criar_curva;
btn_SelecionarCurva.onclick = selecionar_curva; 
btn_DeletarCurva.onclick = deletar_curva;

box_PontosControle.onchange = TogglePontosControle;
box_PoligonaisControle.onchange = TogglePoligonaisControle;
box_Curvas.onchange = ToggleCurvas;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  BGC1 = color(183, 206, 232);
  BGC2 = color(247, 247, 247);
}

function draw() {
  setGradient(0, 0, WIDTH, HEIGHT, BGC1, BGC2, 1);
  stroke(0);
  for(ponto in pontos_controle){
    pontos_controle[ponto].display();
  }
  for(curva in curvas){
    if(FlagCurvas)
      curvas[curva].display_curva();
    if(FlagPontosControle)
      curvas[curva].display_pontos();
    if(FlagPoligonaisControle)
      curvas[curva].display_poligonais();
  }
}

function mouseClicked() {
  if(mouseX >= 0 && mouseX <= WIDTH && construindo)
    pontos_controle.push(new Ponto(mouseX, mouseY));
}

function mousePressed() {
  if(selecionada){
    for(const p of curvas[selecionada].pontos_controle){
      if(check_near(p, mouseX, mouseY)){
        p.locked = true;
        selecionado = curvas[selecionada].pontos_controle.indexOf(p);
        console.log(selecionado)
      }
    }
  }
}

function  mouseDragged() {
  if(selecionado != undefined){
    for(const p of curvas[selecionada].pontos_controle){
        if(p.locked){
          p.x = mouseX;
          p.y = mouseY;
      }
    }
  }
}

function mouseReleased() {
  if(selecionado != undefined){
    curvas[selecionada].pontos_controle[selecionado].locked = false;
    selecionado = undefined;
  }
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

class Curva{
  // O tamanho de pontos_Avaliacao será de n+1 avaliações,
  // pois ele serve de base para as linhas de avaliação.
  constructor(){
    this.pontos_avaliacao = [];
    this.pontos_controle = [];

    this.cor = 0;

    this.secionada = false;
  }

  display_curva(){
    strokeWeight(2);
    stroke(this.cor);
    if(this.selecionada)
      stroke(118);
    for(x = 0; x < this.pontos_avaliacao.length - 1; x++){
      line(this.pontos_avaliacao[x].x,
           this.pontos_avaliacao[x].y,
           this.pontos_avaliacao[x + 1].x,
           this.pontos_avaliacao[x + 1].y);
    }
  }

  display_pontos(){
    strokeWeight(5);
    stroke(0);
    for(x = 0; x < this.pontos_controle.length; x++){
      point(this.pontos_controle[x].x, this.pontos_controle[x].y);
    }
  }

  display_poligonais(){
    strokeWeight(1);
    stroke(0);
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

function TogglePontosControle() {
  if(FlagPontosControle)
    FlagPontosControle = false;
  else
    FlagPontosControle = true;
}

function TogglePoligonaisControle(){
  if(FlagPoligonaisControle)
    FlagPoligonaisControle = false;
  else
    FlagPoligonaisControle = true;
}

function ToggleCurvas(){
  if(FlagCurvas)
    FlagCurvas = false;
  else
    FlagCurvas = true;
}

function criar_curva(){
  if(selecionada != undefined){
    curvas[selecionada].selecionada = false;
    selecionada = undefined;
  }
  if(construindo){
    if(pontos_controle.length > 1){
      curvas.push(Generate(pontos_controle));
      construindo = false;
      btn_CriarCurva.style.backgroundColor = 'white';
      pontos_controle = [];
    }
    return;
  }
  construindo = true;
  btn_CriarCurva.style.backgroundColor = 'red';
}

function selecionar_curva(){
  if(selecionada)
    curvas[selecionada].selecionada = false;
  let index = prompt('Qual curva?');
  if(index >= 0 && curvas.length > index){
    curvas[index].selecionada = true;
    selecionada = index;
  }
  else
    alert('Essa curva não existe');
}

function deletar_curva(){
    if(selecionada){
        curvas.splice(selecionada, 1);
        selecionada = undefined;
    }else{
        alert('SELECIONA A PORRA DA CURVA');
    }
}

//vai me dar uma curva que tem os pontos de avaliação e os pontos de controle
function Generate(pontos_controle){
  let c = new Curva();
  for(x = 0; x <= numero_avaliacoes; x++){
    let ponto = castelinho(pontos_controle, x);
    c.pontos_avaliacao.push(new Ponto(ponto.x, ponto.y));
    c.pontos_controle = pontos_controle;
  }
  return c;
}

// pra desenhar um gradiente de fundo bonitinho kk

function setGradient(x, y, w, h, c1, c2) {
  noFill();
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}

function check_near(P, mX, mY){
    if((mX <= (P.x + 4) && mX >= (P.x - 4)) && (mY <= (P.y + 4) && mY >= (P.y - 4)))
        return true;
    return false;
}