const cards = document.querySelectorAll(".cards");
let hasFlippedCard = false;
var firstCard, secondCard;
let blockBoard = false;
// Vira as cartas
function flipCards() {
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
    firstCard = this; // add o primeiro card
    return;
  }

  secondCard = this; // add o segundo card
  hasFlippedCard = false;
  checkForMatch();
}
// Contatador de Tentativas
var count = 0;
function numeroTentativas() {
  if (!unFlipCard()) {
    count++;
    document.getElementById("vezes").innerText = count;
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
function clickFlip(){
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
  if (firstCard.dataset.cards === secondCard.dataset.cards) {
    total += 1;
    // Se virar todas as cartas
    if (total == 22) {
      alert(
        "Parabens, você concluiu a fase do jogo! Total de pontos: " + total
      );
      return;
    }
    document.getElementById("count").innerText = total;

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
    let ramdomPosition = Math.floor(Math.random() * 44);
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
  crom = setInterval(() => timer(), tempo);
}
function pause() {
  clearInterval(crom);
}
function sttop() {
  clearInterval(crom);
  hh = 0;
  mm = 0;
  ss = 0;
  document.getElementById("count").innerText = "0";
  document.getElementById("vezes").innerText = "0";
  document.getElementById("crono").innerText = "00:00:00";
  
   
}
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

  document.getElementById("crono").innerText = format;
}
