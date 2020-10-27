let t = 0.05;
let tamanho = false;
let pontos = [];

let curva = [];

function setup() {
  createCanvas(400, 400);
  background(188);
}

function draw() {
  strokeWeight(5);
  for(pontoo in pontos){
    point(pontos[pontoo].x, pontos[pontoo].y); 
  }
  square(350, 0, 50);
  text('  Botão', 350, 25);
  strokeWeight(2);

  if(tamanho){
    tamanho = pontos.length;
    if(t < 1){
    let ponto = castelinho(pontos);
    curva.push({ x: ponto.x, y: ponto.y });
    t+=0.002;
    for(x = 0; x < curva.length; x++){
      point(curva[x].x, curva[x].y);
    }
  }
  }
  
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
  if((mouseX >= 350 && mouseX <= 400) && (mouseY >= 0 && mouseY <= 50)){
    tamanho = true;
    background(188);
  }
  else{
    pontos.push({x:mouseX, y:mouseY});
    t = 0;
  }
}

