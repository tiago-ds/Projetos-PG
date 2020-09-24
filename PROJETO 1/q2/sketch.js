let anguloBraco = 0
let anguloAntebraco = 0
let anguloBola = 0

  
function setup() {
  createCanvas(1000, 800)
  angleMode(DEGREES)
}

function draw() {
  //UC = 100
  background(220)

  let ombro = ellipse(400, 200, 15)
  let cotovelo = ellipse(400,400, 15)
  let braco = line(400, 200, 400, 400)
  push()
  translate(400, 400)
  rotate(anguloAntebraco)
  let antebraco = line(0, 0, 0, 300)
  
  if (anguloAntebraco == -90) {
    pop()
  }
  anguloAntebraco--
  
}