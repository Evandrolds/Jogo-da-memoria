const cards = document.querySelectorAll(".card");
let hasFlippedCard = false;
var firstCard, secondCard, thirdCard;
let blockBoard = false;

// Vira as cartas
var nome = "";
function flipCards() {
  if (pauserd) {
    disableCards();
    return;
  }
  getData();
  //this.classList.toggle('flip'); // adiciona e tira a classe
  // função que vira as cartas após o click
  if (blockBoard) {
    return;
  }
  if (this === firstCard) {
    return;
  }
  this.classList.add("flip"); // adiciona uma vez só
  if (!hasFlippedCard) {
    hasFlippedCard = true;

    firstCard = this;
    // add o primeiro card
    return;
  }

  secondCard = this; // add o segundo card
  thirdCard = this;
  hasFlippedCard = false;
  checkForMatch();
}

// Pegando os dados do jogador antes de começar o jogo
function getData(){
  if (!crom) {
    alert("Antes de começar o jogo é peciso adicionar seu nome!");
    nome = prompt("Digite o seu nome para começar o jogo;", " Nome");
    if (nome == null || nome == false) {
      return;
    }
    document.getElementById("name").innerText = nome;
    start();
    return;
  }
}

// Contatador de Tentativas
var count = 0;
function numeroTentativas() {
  if (!unFlipCard()) {
    count++;
    document.getElementById("trying").innerText = count;
  } else {
    unFlipCard();
  }
}

//desvira as carta
function unFlipCard() {
  // função que vira as cartas se não forem iguais
  blockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
  blockBoard = false;
}

// pega o envendo do click
function clickFlip() {
  resetBoard();
  cards.forEach((card) => {
    card.addEventListener("click", flipCards);
  });
}

clickFlip();
// Variavel que adiciona os pontos
var total = 0;
// checar se as cartas são iguais
function checkForMatch() {
  //contar tentaivas
  numeroTentativas();
  if (firstCard.dataset.card === secondCard.dataset.card) {
    total++;
    document.getElementById("punctuation").innerText = total;
    // Se virar todas as cartas
    if (total == 1) {
      pause();
      unFlipCard();
      alert("Parabens, você concluiu o jogo! Total de pontos: " + total);
      if (total == 36 && clickFlip) {
        disableCards();
        confirmar = confirm("Deseja jogar novamente?");
        if (confirmar == !null || confirm.caller.length > 0) {
          nome = prompt("Digite o seu nome ");
        }
        document.getElementById("name").innerText = nome;
        return;
      }
    }

    document.getElementById("punctuation").innerText = total;

    return disableCards();
  } else {
    unFlipCard();
  }
}

// desabilita as cartas
function disableCards() {
  firstCard.removeEventListener("click", flipCards);
  secondCard.removeEventListener("click", flipCards);
  resetBoard();
}

// reseta as variáveis
function resetBoard() {
  [hasFlippedCard, blockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Nome dado á essa função ( immdiately invoque function) Ela só assiona quando chamada
// Embaralharas acartas
(function embaralharCards() {
  cards.forEach((card) => {
    let ramdomPosition = Math.floor(Math.random() * 72);
    card.style.order = ramdomPosition;
  });
}) /* Ela está sendo chamada aqui ==> */();

// Funcoes do Timer
var hh = 0;
var mm = 0;
var ss = 0;
var tempo = 1000; // quanto miléssimos vale um minuto
var crom;
function start() {
  if(crom !== 0){
    pauserd = false;
   
  crom = setInterval(() => timer(), tempo);
  }
  
}

// Pause do jogo
var pauserd = false;
function pause() {
  clearInterval(crom);
  pauserd = true;
  return pauserd;
}

//Stop do jogo
function stopp() {
  clearInterval(crom);

  hh = 0;
  mm = 0;
  ss = 0;
  unFlipCard();
  document.getElementById("punctuation").innerText = "0";
  document.getElementById("trying").innerText = "0";
  document.getElementById("time").innerText = "00:00:00";
  if (crom == 0) {
    disableCards();
    return;
  }
  
}
// Timer do jogo
function timer() {
  ss++;
  if (ss == 60) {
    ss = 0;
    mm++;
    if (mm == 60) {
      mm = 0;
      hh++;
    }
  }

  var format =
    (hh < 10 ? "0" + hh : hh) +
    ":" +
    (mm < 10 ? "0" + mm : mm) +
    ":" +
    (ss < 10 ? "0" + ss : ss);

  document.getElementById("time").innerText = format;
}

document.getElementsById(".exit").onClick = exit();
  function exit(){
    let N = confirm("Deseja Sair da página?");
    if(N){ 
      return window.close();
     }
     return;
  }

