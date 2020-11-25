let img_d, img_n, img_s;

let img;

let btn_select1, btn_select2;

let charselect;

let vetor;

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
    vetor.x = mouseX - img.width / 2;
    vetor.y = mouseY - img.height / 2;
    vetor.z = 100;

    line(0, 0, 100, vetor.x, vetor.y, vetor.z);

    let locX = mouseX - img.width / 2;
    let locY = mouseY - img.height / 2;
    pointLight(255, 255, 255, locX, locY, 100);


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