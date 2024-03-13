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


// Pega o valor do input radio selecionado
function getRadioValue(){
    let radioValue;
    radioInputs.forEach((radioInput)=>{
        if(radioInput.checked){
            radioValue = Number(radioInput.value)
        }
    })
    return radioValue;
}

// Função pra decidir a quantidade de questões
function selectQuestionAmount(e){
    e.preventDefault();
    questionsAmount = getRadioValue();
    console.log(`qtd: ${questionsAmount}`);

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

startForm.addEventListener('submit', selectQuestionAmount)
