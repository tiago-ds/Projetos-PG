let circulo
let WIDTH = 500
let HEIGHT = 500
let startDate = new Date()


function setup() {
  createCanvas(WIDTH, HEIGHT)
  angleMode(DEGREES)
  circulo = new Circulo(2)
}

function draw() {
  background(220);
  circulo.update()
}

class Circulo {
  constructor(UC) {
    this.dCirculo = 200*UC
    this.dBolinha = 50*UC
    this.x = WIDTH/2
    this.y = HEIGHT/2
    this.angulo = 0
    this.angulinho = 0
  }
  
  update() {
    push()
    noFill()
    stroke('blue')
    strokeWeight(2)
    circle(this.x, this.y, this.dCirculo)
    translate(this.x, this.y)
    rotate(this.angulo)
    circle(0, -150, this.dBolinha)
    translate(0, -150)
    rotate(this.angulinho)
    strokeWeight(8)
    stroke('red')
    point(0, -50)
    this.angulo -= 1.5 // 360º em 4s -> 90º em 4s -> 90/60frames = 1.5º por frame
    this.angulinho += 4.5 // como o circulo pequeno tem raio R/4 e o grande R, o circulo pequeno, durante a translaçao, gera um novo circulo a partir do seu centro, com raio R - R/4 = 3R/4. considerando esses valores, sabemos que o circulo pequeno vai sofrer 3 rotações enquanto translada o circulo grande. 3 rotações -> 360 * 3 = 1080º. ao longo de 4 segundos -> 270º por segundo. como são 60 frames por segundo, são 270/60 graus por frame = 4.5º
    pop()
    //console.log(this.angulinho + " graus, " + (new Date() - startDate) + " ms")
  }
}
