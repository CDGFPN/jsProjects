//Páginas
const gamePage = document.querySelector("#game-page");
const scorePage = document.querySelector("#score-page");
const splashPage = document.querySelector("#splash-page");
const countdownPage = document.querySelector("#countdown-page");

// Tela inicial
const startForm = document.querySelector("#start-form");
const radioContainers = document.querySelectorAll(".radio-container");
const radioInputs = document.querySelectorAll("input");
const bestScores = document.querySelectorAll(".best-score-value");

// Página contagem regressiva
const countdown = document.querySelector(".countdown");

// Página do jogo
const itemContainer = document.querySelector(".item-container");

// Página de pontuação
const finalTimeEl = document.querySelector(".final-time");
const baseTimeEl = document.querySelector(".base-time");
const penaltyTimeEl = document.querySelector(".penalty-time");
const playAgainBtn = document.querySelector(".play-again");

// Equações
let questionsAmount = 0;
let equationsArray = [];
let playerGuesses = [];

// Página do jogo (para funções de criação de equações)
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];

// Cronometro
let timer;
let timePlayed = 0;
let baseTime = 0;
let penaltyTime = 0;
let finalTime = 0;
let finalDisplayTime = "0.0s";

//Rolar da tela
let valueY = 0;

// Reinicia o jogo
function playAgain() {
  gamePage.addEventListener("click", startTimer);
  scorePage.hidden = true;
  splashPage.hidden = false;
  countdown.textContent = "3";
  equationsArray = [];
  playerGuesses = [];
  valueY = 0;
  radioContainers[checkedRadioIndex].classList.remove("selected-label")
}

function showScorePage() {
  gamePage.hidden = true;
  scorePage.hidden = false;
  playAgainBtn.disabled = true;
  setTimeout(() => {
    playAgainBtn.disabled = false;
  }, 1000);
}

// Formatar e mostrar tempo no DOM
function scoresToDom() {
  finalDisplayTime = finalTime.toFixed(1);
  baseTime = timePlayed.toFixed(1);
  penaltyTime = penaltyTime.toFixed(1);

  baseTimeEl.textContent = `Tempo base: ${baseTime}s`;
  penaltyTimeEl.textContent = `Penalidade: +${penaltyTime}s`;
  finalTimeEl.textContent = `${finalDisplayTime}s`;
  showScorePage();
}

//Parar o cronometro e processar os resultados, ir para página de pontuação
function checkTime() {
  if (playerGuesses.length == questionsAmount) {
    clearInterval(timer);
    checkWrongGuesses();
    scoresToDom();
  }
}

//Verifica as questões erradas
function checkWrongGuesses() {
  playerGuesses.forEach((e, i) => {
    let object = equationsArray[i];
    if (e !== object.evaluated) {
      penaltyTime += 0.5;
    }
  });
  finalTime = timePlayed + penaltyTime;
}

//Adiciona 1/10s para timePlayed
function addTime() {
  timePlayed += 0.1;
  checkTime();
}

// Inicia cronometro quando a pagina do jogo é clicada
function startTimer() {
  //reinicia tempos
  timePlayed = 0;
  penaltyTime = 0;
  finalTime = 0;
  timer = setInterval(addTime, 100);
  gamePage.removeEventListener("click", startTimer);
}

// Rolar e armazenar a seleção do usuário em playerGuesses
function select(guessedTrue) {
  //Rolar 80px por vez
  valueY += 80;
  itemContainer.scroll(0, valueY);

  //adiciona resposta do jogador pro array
  return guessedTrue ? playerGuesses.push("true") : playerGuesses.push("false");
}

// Mostrar página de jogo
function showGamePage() {
  countdownPage.hidden = true;
  gamePage.hidden = false;
  itemContainer.scrollTop = 0;
}

// Adiciona dinamicamente equações corretas/erradas
function populateGamePage() {
  //Reseta o DOM, colocar espaço vazio acima
  itemContainer.textContent = "";

  //Espaçador
  const topSpacer = document.createElement("div");
  topSpacer.classList.add("height-240");

  //Item selecionado
  const selectedItem = document.createElement("div");
  selectedItem.classList.add("selected-item");

  //Anexar
  itemContainer.append(topSpacer, selectedItem);

  //Criar equações e elemenntos no DOM
  createEquations();
  equationsToDOM();

  // Colocar outro espaço vazio em baixo
  const bottomSpacer = document.createElement("div");
  bottomSpacer.classList.add("height-500");
  itemContainer.appendChild(bottomSpacer);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Funções para criar as equações
function createEquations() {
  const wrongEquations = getRandomInt(questionsAmount);
  const correctEquations = questionsAmount - wrongEquations;

  for (let i = 0; i < correctEquations; i++) {
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    const equationValue = firstNumber * secondNumber;
    const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
    equationObject = { value: equation, evaluated: "true" };
    equationsArray.push(equationObject);
  }

  for (let i = 0; i < wrongEquations; i++) {
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    const equationValue = firstNumber * secondNumber;
    wrongFormat[0] = `${firstNumber} * ${
      secondNumber + getRandomInt(3) + 1
    } = ${equationValue}`;
    wrongFormat[1] = `${firstNumber} * ${secondNumber} = ${
      equationValue + getRandomInt(3) + 1
    }`;
    wrongFormat[2] = `${
      firstNumber + getRandomInt(3) + 1
    }  * ${secondNumber} = ${equationValue}`;
    const formatChoice = getRandomInt(wrongFormat.length);
    const equation = wrongFormat[formatChoice];
    equationObject = { value: equation, evaluated: "false" };
    equationsArray.push(equationObject);
  }
  shuffle(equationsArray);
}

//Adiciona equações para o DOM
function equationsToDOM() {
  equationsArray.forEach((equation) => {
    const item = document.createElement("div");
    item.classList.add("item");
    const equationText = document.createElement("h1");
    equationText.textContent = equation.value;
    item.appendChild(equationText);
    itemContainer.appendChild(item);
  });
}

// Inicia contagem regressiva
function countdownStart() {
  return new Promise((resolve, reject) => {
    let cd = Number(countdown.textContent) - 1;

    const intervalId = setInterval(() => {
      if (cd > 0) {
        countdown.textContent = cd;
        cd--;
      } else {
        countdown.textContent = "GO!";
        setTimeout(() => {
          clearInterval(intervalId);
          resolve();
        }, 1000);
      }
    }, 1000);
  });
}

// Navegar da Tela Inicial para tela de contagem regressiva
function showCountDown() {
  countdownPage.hidden = false;
  splashPage.hidden = true;
  countdownStart().then(() => {
    showGamePage();
    populateGamePage();
  });
}

// Pega o valor do input radio selecionado
let checkedRadioIndex;
function getRadioValue() {
  let radioValue;
  radioInputs.forEach((radioInput, index) => {
    if (radioInput.checked) {
      checkedRadioIndex = index;
      radioValue = Number(radioInput.value);
    }
  });
  return radioValue;
}

// Função pra decidir a quantidade de questões
function selectQuestionAmount(e) {
  e.preventDefault();
  questionsAmount = getRadioValue();
  if (questionsAmount !== undefined) {
    showCountDown();
  }
}

startForm.addEventListener("click", () => {
  radioContainers.forEach((radioEl) => {
    radioEl.classList.remove("selected-label");
    if (radioEl.children[1].checked) {
      radioEl.classList.add("selected-label");
    }
  });
});

startForm.addEventListener("submit", selectQuestionAmount);
gamePage.addEventListener("click", startTimer);
gamePage.addEventListener('wheel', function(e) {
  e.preventDefault();
}, { passive: false });