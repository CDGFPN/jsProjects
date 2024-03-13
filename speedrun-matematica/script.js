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

// Página do jogo (para funções de criação de equações)
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];

// Mostrar página de jogo
function showGamePage() {
  countdownPage.hidden = true;
  gamePage.hidden = false;
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
    console.log(equationText);
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
        clearInterval(intervalId);
        resolve();
      }
    }, 1000);
  });
}

// Navegar da Tela Inicial para tela de contagem regressiva
function showCountDown() {
  countdownPage.hidden = false;
  splashPage.hidden = true;
  countdownStart().then(() => {
    createEquations();
    showGamePage();
    equationsToDOM();
  });
}

// Pega o valor do input radio selecionado
function getRadioValue() {
  let radioValue;
  radioInputs.forEach((radioInput) => {
    if (radioInput.checked) {
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
    //adiciona estilo de selecionado se for escolhido
  });
});

startForm.addEventListener("submit", selectQuestionAmount);
