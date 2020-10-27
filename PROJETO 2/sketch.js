const WIDTH = 1000;
const HEIGHT = 600;

let t = 0.05;
let pontos = [];
let curvas = [];
let curva = [];
let doi = false;
let btn_CriarCurva, btn_SelecionarCurva, btn_DeletarCurva;
let box_PontosControle, box_PoligonaisControle, box_Curvas;
let a = 1;

function setup() {
  createCanvas(WIDTH, HEIGHT);

  background(188);


  fill(70);
  rect(0, 0, WIDTH/6, HEIGHT);
  
  

  btn_CriarCurva = createButton('New Curve').position(20, 50).mousePressed(Adamastor);
  btn_SelecionarCurva = createButton('Select Curve').position(20, 100);
  btn_DeletarCurva = createButton('Delete Curve').position(20, 150);
  box_PontosControle = createCheckbox('Control Points', true)
  box_PoligonaisControle = createCheckbox('Control Poligonals', true);
  box_Curvas = createCheckbox('Curves', true);
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
