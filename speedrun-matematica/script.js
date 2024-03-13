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

//
let questionsAmount = 0;

// Inicia contagem regressiva
function countdownStart() {
  let cd = Number(countdown.textContent)-1;
  
  const intervalId = setInterval(()=>{
    if(cd>0){
        countdown.textContent = cd;
        cd--;
    }else{
        countdown.textContent = 'GO!'
        clearInterval(intervalId)
    }
  }, 1000)
}

// Navegar da Tela Inicial para tela de contagem regressiva
function showCountDown() {
  countdownPage.hidden = false;
  splashPage.hidden = true;
  countdownStart();
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
