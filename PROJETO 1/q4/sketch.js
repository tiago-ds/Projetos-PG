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
  //console.log(new Date() - Date()
}

class Circulo {
  constructor(UC) {
    this.dCirculo = 200*UC
    this.dBolinha = 50*UC
    this.x = WIDTH/2
    this.y = HEIGHT/2
    this.angulo = 0
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
    rotate(this.angulo*(-5.1))
    strokeWeight(8)
    stroke('red')
    point(0, -50)
    this.angulo -= 1.7
    pop()
  }
}