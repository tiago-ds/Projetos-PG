let img_d, img_n, img_s;

let img;

let btn_select1, btn_select2;

let charselect;

let vetor;

// "Zoom in e Out"
let locZ = 100;

img_d = charselect + '/char_d.png';
img_n = charselect + '/char_n.png';
img_s = charselect + '/char_s.png';

function setup() {
  createCanvas(800, 800, WEBGL);
  vetor = new createVector(0, 0, 0);
  btn_select1 = createButton('char1').position(19, 19).mousePressed(select_char1);
  btn_select2 = createButton('char2').position(19, 76).mousePressed(select_char2);
}

function draw() {
  background(255);
  
  

  if(img){
    //Mapeia o valor do mouse entre 0 e O tamanho da imagem, para que a luz o siga.
    let mX = map(mouseX, 0, width, -width / 2, img.width);
    let mY = map(mouseY, 0, height, -height / 2, img.height / 2);
    
    let light_vector = new createVector(mX, mY, locZ);

    line(-img.width / 2, 0, 0, light_vector.x, light_vector.y, light_vector.z);

    //WIP
    //let locX = - width / 2;
    //let locY = - height / 2;

    pointLight(255, 255, 255, light_vector);


    push();
    texture(img);
    noStroke();
    rect(- width / 2, - height / 2, img.width, img.height);
    pop();
  }
}

function select_char1(){
  charselect = 'assets/char1';
  img_n = charselect + '/char_n.png';
  loadChar();
}

function select_char2(){
  charselect = 'assets/char2';
  img_n = charselect + '/char_n.png';
  loadChar();
}

function loadChar(){
  img = loadImage(img_n);
}


// "zoom in e zoom out"
function mouseWheel(event) {
  
  // Ele só diminuirá o Z da luz se ele for maior que 0
  if(event.delta < 0){
    if(locZ > 0)
      locZ += event.delta/10;
  }

  // De forma similar, ele só aumentará o Z da luz se ele for menor que 500
  else{
    if(locZ < 500)
      locZ += event.delta/10;
  }
  // Desabilita o Scroll da página.
  return false;
}

function mouseClicked(){
  console.log(-img.width/2, -img.height/2);
}