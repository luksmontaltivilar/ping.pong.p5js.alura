//Variáveis
//Variáveis Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametroBolinha = 20;
let raio = diametroBolinha / 2;

//Velocidade Bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//Variáveis da Raquete
let xRaquete = 8;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 90;

//Variáveis do Oponente
let xOponente = 582
let yOponente = 150
let velocidadeYOponente;

//Colisão
let colidiu = false;

//Pontuações / Placar
let meusPontos = 0;
let pontosOponente = 0;

//Sons do Jogo
let trilhaSonora;
let pontos;
let raquetada;




//Início do Código
function preload(){
  trilhaSonora = loadSound("trilha.mp3")
  pontos = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilhaSonora.loop();
}

function draw() {
  background(0);
  mostrarBolinha();
  movimentarBolinha();
  verificarColisaoBordas();
  mostrarRaquete(xRaquete, yRaquete);
  mostrarRaquete(xOponente, yOponente);
  movimentarRaquete();
  movimentoOponente();
  verificarColisaoRaquete(xRaquete, yRaquete);
  verificarColisaoRaquete(xOponente, yOponente);
  incluirPlacar();
  marcarPontos();
}



//Funções Secundárias Bolinha
function mostrarBolinha () {
  circle(xBolinha, yBolinha, diametroBolinha);
}

function movimentarBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificarColisaoBordas() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }

  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}



//Funções Secundárias Raquete
function mostrarRaquete(x, y) {
  rect(x, y, comprimentoRaquete, alturaRaquete)
}

function movimentarRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}


//Funções do Oponente
function movimentoOponente() {
  if (keyIsDown(87)) {
    yOponente -= 10;
  }
  if (keyIsDown(83)) {
    yOponente += 10;
  }
}


//Outras Funções
function verificarColisaoComRaquete() {
  if (xBolinha - raio < xRaquete + comprimentoRaquete && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete) {
    raquetada.play();
    velocidadeXBolinha *= -1;
  }
}


function verificarColisaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if (colidiu) {
    raquetada.play();
    velocidadeXBolinha *= -1;
  }
}


//Placar
function incluirPlacar() {
  stroke(255)
  textAlign(CENTER);
  textSize(22);
  fill(color(255,140,0));
  rect(180, 10, 40, 25);
  fill(255);
  text(meusPontos, 200, 30);
  fill(color(255,140,0));
  rect(380, 10, 40, 25);
  fill(255);
  text(pontosOponente, 400, 30);
}

function marcarPontos() {
  if (xBolinha > 590) {
    pontos.play();
    meusPontos += 1;
  }
  if (xBolinha < 10) {
    pontos.play();
    pontosOponente += 1;
  }
}