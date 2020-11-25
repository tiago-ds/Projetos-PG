let img_d, img_n, img_s;

let img;

let btn_select1, btn_select2;

let charselect;

img_d = charselect + '/char_d.png';
img_n = charselect + '/char_n.png';
img_s = charselect + '/char_s.png';

function setup() {
  createCanvas(800, 800, WEBGL);
  btn_select1 = createButton('char1').position(19, 19).mousePressed(select_char1);
  btn_select2 = createButton('char2').position(19, 76).mousePressed(select_char2);
}

function draw() {
  background(255);
  if(img){
    image(img, -400, -400);
  }
}

function select_char1(){
  charselect = 'assets/char1';
  img_d = charselect + '/char_d.png';
  loadChar();
}

function select_char2(){
  charselect = 'assets/char2';
  img_d = charselect + '/char_d.png';
  loadChar();
}

function loadChar(){
  img = loadImage(img_d);
}