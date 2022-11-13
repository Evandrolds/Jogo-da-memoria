const cards = document.querySelectorAll(".cards");
let hasFlippedCard = false;
var firstCard, secondCard;
let blockBoard = false;

// Vira as cartas
function flipCards() {
  getInformations();
   
  //this.classList.toggle('flip'); // adiciona e remove a classe
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

// pegar as informações do jogador //
var nome;
document.getElementById("name").innerText = "Jogador";
function getInformations() {
  if ((clickFlip) && (!play || !crom)) {
    alert("Antes de começar o jogo é peciso adicionar seu nome!");
    nome = prompt("Digite o seu nome para começar o jogo;", " Nome");
    if (nome == null || nome == false) {
      unFlipCard();
      disableCards();
    }
    document.getElementById("name").innerText = nome;
    play(); 
    return;
     
  }
  
  
}


// Contatador de Tentativas
var count = 0;
function numeroTentativas() {
  if (!unFlipCard()) {
    count++;
    document.getElementById("count").innerText = count;
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

// pega o envendo do click para mostrar a carta
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
  if (firstCard.dataset.cards === secondCard.dataset.cards) {
    total++;
    document.getElementById("punctuation").innerText = total;
    // Se virar todas as cartas
    if (total == 22) {
      pause();
      disableCards();
      congratulations(total);
      return;
    }

    document.getElementById("punctuation").innerText = total;

    return disableCards();
  } else {
    unFlipCard();
  }
}
function congratulations(total) {
  alert(" Total de PONTOS: " + total);
  alert("Parabens, você concluiu a primera fase do GAME !");
  let N = confirm("Você gostaria de começar o segunda fase do Game?");
  if (N !== null && total >= 1) {
    nextFase(total);
  }
}
// Função que chama a próxima fase
function nextFase(total) {
  if (total >= 22) {
    window.location.assign("../fase2/fase2.html");
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

// Funcoes do Play
var hh = 0;
var mm = 0;
var ss = 0;
var tempo = 1000; // quanto miléssimos vale um minuto
var crom;
function play() {
  return (crom = setInterval(() => timer(), tempo));
}

 

// Pause do jogo
function pause() {
    clearInterval(crom);
   
}

//Stop do jogo
function stopp() {
  clearInterval(crom);
  hh = 0;
  mm = 0;
  ss = 0;
  document.getElementById("punctuation").innerText = "0";
  document.getElementById("count").innerText = "0";
  document.getElementById("crono").innerText = "00:00:00";
  if (crom == 0) {
    unFlipCard();
    disableCards();
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

  document.getElementById("crono").innerText = format;
}
document.getElementsById(".exit").onClick = exit();
function exit() {
  let N = confirm("Deseja Sair da página?");
  if (N) {
    return window.close();
  }
  return;
}
