let anguloBraco = 0, anguloAntebraco = 0, anguloOmbro = 0, anguloPulso = 0
let startDate = new Date()

function setup() {
  createCanvas(1000, 800)
  angleMode(DEGREES)
}

function draw() {
  let sec = second()
  if (frameCount == 1) {
  startDate = new Date()
  }
  background(220)
  
  //Rotaciona o braço
  push()
  translate(400, 400) //Defino o "ponto central" do plano como (400,400) para que a reta (que tem   (x2, y2) = (0,0) (ou seja, em (400, 400)), gire em torno de (x2, y2)
  rotate(anguloBraco)
  let braco = line(0, -200, 0, 0)
  if (anguloBraco > -45) {
      anguloBraco = anguloBraco - 0.5
  }
  pop()
  
  //Rotaciona a bolinha superior
  push()
  translate(400, 400)
  rotate(anguloOmbro)
  let ombro = ellipse(0, -200, 15)
  if (anguloOmbro > -45) {
    anguloOmbro = anguloOmbro - 0.5
  }
  pop()
  
  //Rotacionar o antebraço
  push()
  translate(400, 400)
  rotate(anguloAntebraco)
  let antebraco = line(0, 0, 0, 300) //Aqui, a reta gira em torno de (x1,y1), devido ao translate   realizado e ao fato de (x1, y1) = (0, 0)
  if (anguloAntebraco > -90) {
      anguloAntebraco--
  }
  pop()
  
  //Rotaciona a bolinha inferior
  push()
  translate(400, 400)
  rotate(anguloPulso)
  let pulso = ellipse(0,300, 15)
  if (anguloPulso > -90) {
    anguloPulso--
    console.log("TIME: " + (new Date() - startDate))
    stop()
  } 
  pop()
  
  let cotovelo = ellipse(400,400, 15) //Bolinha do meio

}