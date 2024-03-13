//Canvas
const { body } = document;
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
const width = 500;
const height = 700;
const screenWidth = window.screen.width;
const canvasPosition = screenWidth /2 - width /2;
const isMobile = window.matchMedia("max-width: 600px");
const gameOverEl = document.createElement("div");

//Raquete
const racketHeight = 10;
const racketWidth = 50;
const racketDiff = 25;
let racketBottomX = 225;
let racketTopX = 225;
let playerMoved = false;
let racketContact = false;

//Ball
let ballX = 250;
let ballY = 350;
const ballRadius = 5;

//Velocidade
let speedY;
let speedX;
let trajectoryX;
let computerSpeed;

// Mudar as configurações mobile
if (isMobile.matches) {
  speedY = speedY = -2;
  computerSpeed = 4;
} else {
  speedY = speedY = -1;
  computerSpeed = 3;
}

//Pontuação
let playerScore = 0;
let computerScore = 0;
const winningSCore = 5;
let isGameOver = true;
let isNewGame = true;

//Renderiza tudo no Canvas
function renderCanvas() {
  //Fundo do Canvas
  context.fillStyle = "black";
  context.fillRect(0, 0, width, height);

  //Cor da raquete
  context.fillStyle = "white";

  //Raquete do jogador (Baixo)
  context.fillRect(racketBottomX, height - 20, racketWidth, racketHeight);

  //Raquete do computador (Cima)
  context.fillRect(racketTopX, 10, racketWidth, racketHeight);

  //Linha tracejada do meio
  context.beginPath();
  context.setLineDash([4]);
  context.moveTo(0, 350);
  context.lineTo(500, 350);
  context.strokeStyle = "grey";
  context.stroke();

  //Bola
  context.beginPath();
  context.arc(ballX, ballY, ballRadius, 2 * Math.PI, false);
  context.fillStyle = "white";
  context.fill();

  //Pontuação
  context.font = "32px Courier New";
  context.fillText(playerScore, 20, canvas.height / 2 + 50);
  context.fillText(computerScore, 20, canvas.height / 2 - 30);
}

//Cria o elemento do Canvas
function createCanvas() {
  canvas.width = width;
  canvas.height = height;
  body.append(canvas);
  renderCanvas();
}

//Reseta a bola pro centro
function ballReset() {
  ballX = width / 2;
  ballY = height / 2;
  speedY = -3;
  racketContact = false;
}

//Ajusta o movimento da bola
function ballMove() {
  //Velocidade vertical
  ballY += -speedY;
  //Velocidade horizontal
  if (playerMoved && racketContact) {
    ballX += speedX;
  }
}

//Determina o que faz a bola quicar, pontuar e resetar bola
function ballBoundaries() {
  //Se bate na parede da esquerda
  if (ballX < 0 && speedX < 0) {
    speedX = -speedX;
  }
  //Se bate na parede da direita
  if (ballX > width && speedX > 0) {
    speedX = -speedX;
  }
  //Se passa da raquete do jogador (baixo)
  if (ballY > height - racketDiff) {
    if (ballX > racketBottomX && ballX < racketBottomX + racketWidth) {
      racketContact = true;
      //Aumenta velocidade ao acertar
      if (playerMoved) {
        speedY -= 1;
        //Velocidade máxima
        if (speedY < -5) {
          speedY = -5;
          computerSpeed = 6;
        }
      }
      speedY = -speedY;
      trajectoryX = ballX - (racketBottomX + racketDiff);
      speedX = trajectoryX * 0.3;
    } else if (ballY > height) {
      //Reseta bola, adiciona pontuação pro computador
      ballReset();
      computerScore++;
    }
  }
  //Se passa da raquete do computador(cima)
  if (ballY < racketDiff) {
    if (ballX > racketTopX && ballX < racketTopX + racketWidth) {
      //Adiciona velocidade ao acertar
      if (playerMoved) {
        speedY += 1;
        //Velocidade máxima
        if (speedY > 5) {
          speedY = 5;
        }
      }
      speedY = -speedY;
    } else if (ballY < 0) {
      //Reseta bola, adiciona pontuação pro jogador
      ballReset();
      playerScore++;
    }
  }
}

//Movimento do computador
function computerAI() {
  if (playerMoved) {
    if (racketTopX + racketDiff < ballX) {
      racketTopX += computerSpeed;
    } else {
      racketTopX -= computerSpeed;
    }
  }
}

function showGameOverEl(winner) {
  //esconder Canvas
  canvas.hidden = true;
  //Container
  gameOverEl.textContent = "";
  gameOverEl.classList.add("game-over-container");
  //Titulo
  const title = document.createElement("h1");
  title.textContent = `${winner} Wins!`;
  //Botão
  const playAgainBtn = document.createElement("button");
  playAgainBtn.setAttribute("onclick", "startGame()");
  playAgainBtn.textContent = "Play Again";
  //Anexar
  gameOverEl.append(title, playAgainBtn);
  body.appendChild(gameOverEl);
}

function gameOver(){
    if(playerScore === winningSCore || computerScore === winningSCore){
        isGameOver = true;
        //Decide vencedor
        const winner = playerScore === winningSCore ? 'Player 1' : 'Computer';
        showGameOverEl(winner);
    }
}

function animate(){
    renderCanvas();
    ballMove();
    ballBoundaries();
    computerAI();
    gameOver();
    if(!isGameOver){
        window.requestAnimationFrame(animate);
    }
}

function startGame() {
  if (isGameOver && !isNewGame) {
    body.removeChild(gameOverEl);
    canvas.hidden = false;
  }
  isGameOver = false;
  isNewGame = false;
  playerScore = 0;
  computerScore = 0;
  createCanvas();
  animate();
  canvas.addEventListener('mousemove', (e)=>{
    playerMoved = true;
    //compensa o canvas estar centralizado
    console.log(e.clientX);
    racketBottomX = e.clientX - canvasPosition - racketDiff;
    if(racketBottomX < racketDiff){
        racketBottomX = 0;
    }
    if(racketBottomX > width - racketWidth);
  })
  //esconde o cursor
  canvas.style.cursor = 'none';
}

// Ao carregar
startGame();
