// TODO:
// Trocar o evevento de mudar a cor do botão de mouse clicked pra mouse pressed
const WIDTH = 1000;
const HEIGHT = 600;

// Cores do gradiente que serão inicializadas em setup();
let BGC1;
let BGC2;

// A gente não sabe usar recursão, então vamos de variável global
let curva_selecionada;
let ponto_movendo;
let ponto_selecionado;

// Array com as curvas
let curvas = [];

// Array dos pontos de controle sendo adicionados agr
let pontos_controle;

// Variável de seleção do número de Avaliações
let numero_avaliacoes = 200;

//Flags para mostrar ou não essas coisas aí
let flag_pontos_controle = true;
let flag_poligonais_controle = false;
let flag_curvas = true;

let selecionando_curva = false;
let adicionando_ponto = false;

let btn_CriarCurva = document.getElementById('newCurve');
let btn_SelecionarCurva = document.getElementById('selectCurve');
let btn_DeletarCurva = document.getElementById('deleteCurve');

// botoes de adicionar e remover ponto
let btn_AdicionarPonto =  document.getElementById('addPoint');
let btn_DeletarPonto = document.getElementById('deletePoint');

let box_PontosControle = document.getElementById('controlPoints');
let box_PoligonaisControle = document.getElementById('polygonalPoints');
let box_Curvas = document.getElementById('curves');

let avaliacoes_form = document.getElementById('avaliationsNumber');
//avaliacoes_form.value = numero_avaliacoes;

btn_CriarCurva.onclick = criar_curva;
btn_SelecionarCurva.onclick = selecionar_curva; 
btn_DeletarCurva.onclick = deletar_curva;

btn_AdicionarPonto.onclick = adicionar_ponto;
btn_DeletarPonto.onclick = deletar_ponto;


box_PontosControle.onchange = TogglePontosControle;
box_PoligonaisControle.onchange = TogglePoligonaisControle;
box_Curvas.onchange = ToggleCurvas;

avaliacoes_form.onchange = nova_avaliacoes_n;

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
    if(flag_curvas)
      curvas[curva].display_curva();
    if(flag_poligonais_controle)
      curvas[curva].display_poligonais();
    if(flag_pontos_controle)
      curvas[curva].display_pontos();
  }
}

// Funções do mouse //
function mouseClicked() {
  if(curva_selecionada != undefined){
    if(adicionando_ponto && mouse_in_canvas()){
      curvas[curva_selecionada].pontos_controle.push(new Ponto(mouseX, mouseY));
      curvas[curva_selecionada].regenerate();
      btn_AdicionarPonto.style.backgroundColor = 'white';
      btn_AdicionarPonto.innerText = 'Adicionar Ponto';
      adicionando_ponto = false;
      return;
    }else{
      if(ponto_selecionado != undefined){
        curvas[curva_selecionada].pontos_controle[ponto_selecionado].selecionado = false;
        ponto_selecionado = undefined;
      }
      for(const p of curvas[curva_selecionada].pontos_controle){
        if(check_near(p, mouseX, mouseY)){
          ponto_selecionado = curvas[curva_selecionada].pontos_controle.indexOf(p);
          p.selecionado = true;
        }
      }
    }
  }
  if(selecionando_curva){
    procurar_curva();
  }
  if(mouse_in_canvas() && pontos_controle != undefined)
    pontos_controle.push(new Ponto(mouseX, mouseY));
}

function mousePressed() {
  if(curva_selecionada != undefined){
    //até a linha 109 é pra mover o ponto
    for(const p of curvas[curva_selecionada].pontos_controle){
      if(check_near(p, mouseX, mouseY)){
        p.locked = true;
        ponto_movendo = curvas[curva_selecionada].pontos_controle.indexOf(p);
        return;
      }
    }
  }
}

function mouseDragged() {
  if(ponto_movendo != undefined){
    var p = curvas[curva_selecionada].pontos_controle[ponto_movendo];
    if(p.locked && mouse_in_canvas()){
      p.x = mouseX;
      p.y = mouseY;
      curvas[curva_selecionada].regenerate();
  }
}
}

function mouseReleased() {
  if(ponto_movendo != undefined){
    curvas[curva_selecionada].pontos_controle[ponto_movendo].locked = false;
    ponto_movendo = undefined;
  }
}

// De casteljau. Ela recebe um array de pontos, e retorna um ponto.
// O X seria o equivalente ao parâmetro
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

    this.selecionada = false;
  }

  regenerate(){
    this.pontos_avaliacao = Generate(this.pontos_controle).pontos_avaliacao;
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
    for(const p of this.pontos_controle){
      stroke(0);
      if(this.selecionada)
        stroke(250, 50, 50);
      p.display();
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

    this.selecionado = false;
  }
  display(){
    if(this.selecionado)
      stroke(50, 250, 50);
    strokeWeight(5);
    point(this.x, this.y);
  }
}

//Checkboxes
function TogglePontosControle() {
  if(flag_pontos_controle)
    flag_pontos_controle = false;
  else
    flag_pontos_controle = true;
}

function TogglePoligonaisControle(){
  if(flag_poligonais_controle)
    flag_poligonais_controle = false;
  else
    flag_poligonais_controle = true;
}

function ToggleCurvas(){
  if(flag_curvas)
    flag_curvas = false;
  else
    flag_curvas = true;
}

//Métodos de criar, selecionar e deletar curva.
function criar_curva(){
  if(selecionando_curva){
    selecionando_curva = false;
    btn_SelecionarCurva.style.backgroundColor = 'white';
    btn_SelecionarCurva.innerText = 'Selecionar Curva';
  }
  // Condição que não deixa que tenha uma curva selecionada na hora de 
  // criar uma curva nova.
  if(curva_selecionada != undefined){
    if(ponto_selecionado != undefined){
      curvas[curva_selecionada].pontos_controle[ponto_selecionado].selecionado = false;
      ponto_selecionado = undefined;
    }
    curvas[curva_selecionada].selecionada = false;
    curva_selecionada = undefined;
    btn_SelecionarCurva.style.backgroundColor = 'white';
    btn_SelecionarCurva.innerText = 'Selecionar Curva';
  }
  // Caso já esteja sendo criada uma curva
  if(pontos_controle != undefined){
    // Uma curva é composta por pelo menos 2 pontos de controle.
    if(pontos_controle.length > 1){
      curvas.push(Generate(pontos_controle));
      pontos_controle = undefined;
      btn_CriarCurva.style.backgroundColor = 'white';
    }else{
      return;
    }
  }else{
    pontos_controle = [];
    btn_CriarCurva.style.backgroundColor = 'red';
  }
}

function selecionar_curva(){
  // Condição que faz com que não seja permitido selecionar uma curva
  // enquanto constrói uma
  if(pontos_controle)
    return;
  if(curva_selecionada != undefined){
    if(ponto_selecionado != undefined){
      curvas[curva_selecionada].pontos_controle[ponto_selecionado].selecionado = false;
      ponto_selecionado = undefined;
    }
    curvas[curva_selecionada].selecionada = false;
    curva_selecionada = undefined;
    btn_SelecionarCurva.style.backgroundColor = 'white';
    btn_SelecionarCurva.innerText = 'Selecionar Curva';
    return;
  }
  if(!selecionando_curva){
    selecionando_curva = true;
    btn_SelecionarCurva.style.backgroundColor = 'red';
    btn_SelecionarCurva.innerText = 'Cancelar';
  }else{
    selecionando_curva = false;
    btn_SelecionarCurva.style.backgroundColor = 'white';
    btn_SelecionarCurva.innerText = 'Selecionar Curva';
  }
}

function deletar_curva(){
    if(curva_selecionada != undefined){
      curvas.splice(curva_selecionada, 1);
      curva_selecionada = undefined;
      btn_SelecionarCurva.style.backgroundColor = 'white';
      btn_SelecionarCurva.innerText = 'Selecionar Curva';
    }else{
      alert('Desculpe, não há curva selecionada.');
    }
}

function adicionar_ponto(){
  if(curva_selecionada == undefined){
    alert('Selecione a curva que quer fazer alterações.');
    return;
  }
  if(adicionando_ponto){
    adicionando_ponto = false;
    btn_AdicionarPonto.style.backgroundColor = 'white';
    btn_AdicionarPonto.innerText = 'Adicionar Ponto';
    return;
  }
  if(pontos_controle == undefined && !selecionando_curva){
    adicionando_ponto = true;
    btn_AdicionarPonto.style.backgroundColor = 'red';
    btn_AdicionarPonto.innerText = 'Cancelar';
  }
}

function deletar_ponto(){
  if(ponto_selecionado == undefined){
    alert('Desculpe, não há ponto selecionado.');
  }else{
    curvas[curva_selecionada].pontos_controle.splice(ponto_selecionado, 1);
    curvas[curva_selecionada].regenerate();
    ponto_selecionado = undefined;
  }
}

// Método para trocar o número de avaliações
function nova_avaliacoes_n(){
  if(!isNaN(avaliacoes_form.value) && avaliacoes_form.value >= 1){
    numero_avaliacoes = avaliacoes_form.value;
    for(const c of curvas)
      c.regenerate();
  }else{
    alert('Favor digitar um número válido.');
    avaliacoes_form.value = numero_avaliacoes;
  }
}

// Vai criar uma curva através de vários Decasteljau
function Generate(pontos_controle){
  let c = new Curva();
  for(x = 0; x <= numero_avaliacoes; x++){
    let ponto = castelinho(pontos_controle, x);
    c.pontos_avaliacao.push(new Ponto(ponto.x, ponto.y));
    c.pontos_controle = pontos_controle;
  }
  return c;
}

// Pra desenhar um gradiente de fundo bonitinho kk

function setGradient(x, y, w, h, c1, c2) {
  noFill();
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}


// Funções de utilidade pra deixar o código principal mais limpo
function check_near(P, mX, mY){
  // Vê se tem um ponto perto do mouse
  if((mX <= (P.x + 4) && mX >= (P.x - 4)) && (mY <= (P.y + 4) && mY >= (P.y - 4)))
    return true;
  return false;
}

function procurar_curva(){
  // Ele olha dentro de cada ponto de avaliação de cada curva, até achar alguma próxima
  // do mouse.
  for(const c of curvas){
    for(const p of c.pontos_avaliacao){
      if(check_near(p, mouseX, mouseY)){

        curva_selecionada = curvas.indexOf(c);
        c.selecionada = true;

        selecionando_curva = false;

        btn_SelecionarCurva.style.backgroundColor = 'blue';
        btn_SelecionarCurva.innerText = 'Desselecionar'

        return;
      }
    }
    for(const p of c.pontos_controle){
      if(check_near(p, mouseX, mouseY)){
        curva_selecionada = curvas.indexOf(c);
        c.selecionada = true;

        selecionando_curva = false;

        btn_SelecionarCurva.style.backgroundColor = 'blue';
        btn_SelecionarCurva.innerText = 'Desselecionar'
      }
    }
  }
}

function mouse_in_canvas(){
  if((mouseX >= 0 && mouseX <= WIDTH) && (mouseY >= 0 && mouseY <= HEIGHT))
    return true;
  return false;
}

