const WIDTH = 1000;
const HEIGHT = 600;

let t = 0.05;
let pontos = [{x:'10', y:'10'},
            {x:'10', y:'150'},
            {x:'200', y:'300'},
            {x:'200', y:'150'}];

let curvas = [];
let curva = [];
let doi = false;

let btn_CriarCurva = document.getElementById('newCurve');
console.log(btn_CriarCurva)
let btn_SelecionarCurva = document.getElementById('selectCurve');
let btn_DeletarCurva = document.getElementById('deleteCurve');

let box_PontosControle, box_PoligonaisControle, box_Curvas;
let a = 1;

btn_CriarCurva.onclick = Adamastor;
function setup() {
  createCanvas(WIDTH, HEIGHT);

  box_PontosControle = createCheckbox('Control Points', true)
  box_PoligonaisControle = createCheckbox('Control Poligonals', true);
  box_Curvas = createCheckbox('Curves', true);

  box_PontosControle.id('checkbox')
  box_PoligonaisControle.id('checkbox')
  box_PoligonaisControle.id('checkbox')
  //box_PontosControle.changed(Evento);
  //butao.mousePressed(Adamastor);
}


function draw() {
  strokeWeight(5);
  
  if(!doi)
    doi = true;
  if(a == 1){
    for(pontoo in pontos){
      point(pontos[pontoo].x, pontos[pontoo].y); 
    }
  }
  strokeWeight(2);
  if(doi){
    for(i = 0; i < curvas.length; i++){
      for(j = 0; j < curvas[i].length; j++)
        point(curvas[i][j].x, curvas[i][j].y);
    }
  }
  doi = false;
  curvas.push(curva);
  curva = [];
}

function castelinho(pontos) {
  if (pontos.length > 1) {
    let aux = [];
    let xX;
    let yY;
    for (i = 0; i < pontos.length - 1; i++) {
      xX = pontos[i].x * (1 - t) + pontos[i + 1].x * t;
      yY = pontos[i].y * (1 - t) + pontos[i + 1].y * t;
      aux.push({ x: xX, y: yY });
    }
    return castelinho(aux);
  }
  else {
    return pontos[0];
  }
}

function mouseClicked() {
  if(mouseX >= WIDTH/6){
    pontos.push({x:mouseX, y:mouseY});
    t = 0;
  }
  else{
    
  }
}


function Adamastor(){
  console.log("teste")
  while(t <= 1){
    let ponto = castelinho(pontos);
    fazendo = true;
    curva.push({ x: ponto.x, y: ponto.y });
    for(x = 0; x < curva.length; x++){
      point(curva[x].x, curva[x].y);
    }
    t+=0.002;
  }
  doi = true;
  pontos = [];
}
