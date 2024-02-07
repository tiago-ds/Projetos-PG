// Constantes úteis em todo código de p5js
const WIDTH = 1000;
const HEIGHT = 650;

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

// Flags de controle
let selecionando_curva = false;
let adicionando_ponto = false;

// Flags para mostrar ou não essas coisas aí
let flag_pontos_controle = true;
let flag_poligonais_controle = false;
let flag_curvas = true;


// Botões que interagem com as curvas
let btn_CriarCurva = document.getElementById('newCurve');
let btn_SelecionarCurva = document.getElementById('selectCurve');
let btn_DeletarCurva = document.getElementById('deleteCurve');

// Botões de adicionar e remover ponto
let btn_AdicionarPonto =  document.getElementById('addPoint');
let btn_DeletarPonto = document.getElementById('deletePoint');

// Checkboxes
let box_PontosControle = document.getElementById('controlPoints');
let box_PoligonaisControle = document.getElementById('polygonalPoints');
let box_Curvas = document.getElementById('curves');

let avaliacoes_form = document.getElementById('avaliationsNumber');

// Adicionando os eventos
btn_CriarCurva.onclick = criar_curva;
btn_SelecionarCurva.onclick = selecionar_curva; 
btn_DeletarCurva.onclick = deletar_curva;

btn_AdicionarPonto.onclick = adicionar_ponto;
btn_DeletarPonto.onclick = deletar_ponto;

box_PontosControle.onchange = TogglePontosControle;
box_PoligonaisControle.onchange = TogglePoligonaisControle;
box_Curvas.onchange = ToggleCurvas;

avaliacoes_form.onchange = nova_avaliacoes_n;

// Coloridinho
let sld_Red = document.getElementById('redSlider');
let sld_Green = document.getElementById('greenSlider');
let sld_Blue = document.getElementById('blueSlider');

// COLORIDINHOOOOOOOO
sld_Red.oninput = sld_Red_Change;
sld_Green.oninput = sld_Green_Change;
sld_Blue.oninput = sld_Blue_Change;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  BGC1 = color(183, 206, 232);
  BGC2 = color(247, 247, 247);
}

function draw() {
  setGradient(0, 0, WIDTH, HEIGHT, BGC1, BGC2, 1);
  stroke(0);
  // Pontos de controle sendo undefined: Não entra no for
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
  // Caso haja uma curva selecionada
  if(curva_selecionada != undefined){
    // Adicionando ponto à curva selecionada
    if(adicionando_ponto && mouse_in_canvas()){
      curvas[curva_selecionada].pontos_controle.push(new Ponto(mouseX, mouseY));
      curvas[curva_selecionada].regenerate();
      btn_AdicionarPonto.style.backgroundColor = 'white';
      btn_AdicionarPonto.innerText = 'Adicionar Ponto';
      adicionando_ponto = false;
      return;
    }else{
      // Se ele clicar fora de um ponto selecionado, ele o desseleciona
      if(ponto_selecionado != undefined){
        curvas[curva_selecionada].pontos_controle[ponto_selecionado].selecionado = false;
        ponto_selecionado = undefined;
      }
      // Selecionando um ponto
      for(const p of curvas[curva_selecionada].pontos_controle){
        // Checa se o mouse tá perto do ponto recebido
        if(check_near(p, mouseX, mouseY)){
          ponto_selecionado = curvas[curva_selecionada].pontos_controle.indexOf(p);
          p.selecionado = true;
        }
      }
    }
  }

  // Se ele está selecionando uma curva
  if(selecionando_curva){
    procurar_curva();
  }

  // Se ele está Adicionando uma nova curva
  if(mouse_in_canvas() && pontos_controle != undefined)
    pontos_controle.push(new Ponto(mouseX, mouseY));
}

function mousePressed() {
  // Só faz alguma coisa com o mouse pressionado se tiver uma curva
  // selecionada
  if(curva_selecionada != undefined){
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
  // Se estiver arrastando um ponto
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


// De casteljau. Ela recebe um array de pontos, e retorna um ponto.
// O X seria o equivalente ao t na fórmula
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

// Classes de ponto, e curva
class Curva{
  // O tamanho de pontos_Avaliacao será de n+1 avaliações,
  // pois ele serve de base para as linhas de avaliação.
  // (mas continua tendo o número de avaliações pedido)
  constructor(){
    this.pontos_avaliacao = [];
    this.pontos_controle = [];

    this.cor_red = 0;
    this.cor_green = 0;
    this.cor_blue = 0;

    this.selecionada = false;
  }

  // Só pra refazer a curva quando há alguma mudança nos seus
  // pontos de controle
  regenerate(){
    this.pontos_avaliacao = Generate(this.pontos_controle).pontos_avaliacao;
  }

  display_curva(){
    strokeWeight(2);
    let c = color(this.cor_red, this.cor_green, this.cor_blue);
    stroke(c);
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
  // Possibilidade de cancelar a seleção da curva
  if(selecionando_curva){
    selecionando_curva = false;
    btn_SelecionarCurva.style.backgroundColor = 'white';
    btn_SelecionarCurva.innerText = 'Selecionar Curva';
  }
  // Condição que não deixa que tenha uma curva selecionada na hora de 
  // criar uma curva nova.
  if(curva_selecionada != undefined){
    // Desselecionar curva e ponto selecionados
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
      btn_CriarCurva.innerText = 'Criar Curva';
    }else{
      // Cancelar a criação da curva (caso tenha 0 ou 1 pontos de controle)
      pontos_controle = undefined;
      btn_CriarCurva.style.backgroundColor = 'white';
      btn_CriarCurva.innerText = 'Criar Curva';
    }
  }
  // Começando a criar uma curva.
  else{
    pontos_controle = [];
    btn_CriarCurva.style.backgroundColor = '#93dbd6';
    btn_CriarCurva.innerText = 'Finalizar';
  }
}

function selecionar_curva(){
  // Condição que faz com que não seja permitido selecionar uma curva
  // enquanto constrói uma
  if(pontos_controle)
    return;
  // Desselecionar curva
  if(curva_selecionada != undefined){
    sld_Green.value = 0;
    sld_Blue.value = 0;
    sld_Red.value = 0;
    if(adicionando_ponto){
      adicionando_ponto = false;
      btn_AdicionarPonto.style.backgroundColor = 'white';
      btn_AdicionarPonto.innerText = 'Adicionar Ponto';
    }
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
  // Começar a seleção da curva
  if(!selecionando_curva){
    selecionando_curva = true;
    btn_SelecionarCurva.style.backgroundColor = '#93dbd6';
    btn_SelecionarCurva.innerText = 'Cancelar';
  }
  // Cancelar a seleção
  else{
    selecionando_curva = false;
    btn_SelecionarCurva.style.backgroundColor = 'white';
    btn_SelecionarCurva.innerText = 'Selecionar Curva';
  }
}

function deletar_curva(){
  // Só se pode deletar uma curva quando ela está selecionada
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
  // Só se pode adicionar um ponto a uma curva que está selecionada
  if(curva_selecionada == undefined){
    alert('Selecione a curva que quer fazer alterações.');
    return;
  }
  // Possibilidade de cancelar a adição do ponto
  if(adicionando_ponto){
    adicionando_ponto = false;
    btn_AdicionarPonto.style.backgroundColor = 'white';
    btn_AdicionarPonto.innerText = 'Adicionar Ponto';
    return;
  }
  // Começar a adição de ponto (caso não esteja em outros estados)
  if(pontos_controle == undefined && !selecionando_curva){
    adicionando_ponto = true;
    btn_AdicionarPonto.style.backgroundColor = '#93dbd6';
    btn_AdicionarPonto.innerText = 'Cancelar';
  }
}

function deletar_ponto(){
  // Só é possível deletar um ponto caso ele esteja selcionado
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
  // Só pega números maiores ou iguais a 1
  if(!isNaN(avaliacoes_form.value) && avaliacoes_form.value >= 1){
    numero_avaliacoes = avaliacoes_form.value;
    // Redesenhar cada curva do array de curvas.
    for(const c of curvas)
      c.regenerate();
  }else{
    alert('Favor digitar um número válido.');
    avaliacoes_form.value = numero_avaliacoes;
  }
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

        btn_SelecionarCurva.style.backgroundColor = '#79a9ec';
        btn_SelecionarCurva.innerText = 'Desselecionar';

        sld_Red.value = c.cor_red;
        sld_Green.value = c.cor_green;
        sld_Blue.value = c.cor_blue;

        return;
      }
    }
    // Mesma coisa, mas para os pontos de controle
    for(const p of c.pontos_controle){
      if(check_near(p, mouseX, mouseY)){
        curva_selecionada = curvas.indexOf(c);
        c.selecionada = true;

        selecionando_curva = false;

        btn_SelecionarCurva.style.backgroundColor = '#79a9ec';
        btn_SelecionarCurva.innerText = 'Desselecionar';

        sld_Red.value = curvas[c].cor_red;
        sld_Green.value = curvas[c].cor_green;
        sld_Blue.value = curvas[c].cor_blue;
      }
    }
  }
}

function mouse_in_canvas(){
  if((mouseX >= 0 && mouseX <= WIDTH) && (mouseY >= 0 && mouseY <= HEIGHT))
    return true;
  return false;
}

//Coloridinhas funções
function sld_Red_Change(){
  if(curva_selecionada != undefined){
    curvas[curva_selecionada].cor_red = sld_Red.value;
  }else{
    sld_Red.style.cursor = "default";
    sld_Red.value = 0;
  }
}

function sld_Green_Change(){
  if(curva_selecionada != undefined){
    curvas[curva_selecionada].cor_green = sld_Green.value;
  }else{
    sld_Green.style.cursor = "default";
    sld_Green.value = 0;
  }
}

function sld_Blue_Change(){
  if(curva_selecionada != undefined){
    curvas[curva_selecionada].cor_blue = sld_Blue.value;
  }else{
    sld_Blue.style.cursor = "default";
    sld_Blue.value = 0;
  }
}
