let flippedCards = [];
let matchedCards = 0;
let totalPairs = 8;

// Array of symbols for matching pairs
const symbols = [
  'A',
  'B',
  'C',
  'D',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'E',
  'F',
  'G',
  'H',
];

// shuffle method
function shuffleArray(array) {
  array.sort(() => Math.random() - 0.5);
}
// Spiel Inistializieren
function initGame() {
  let button = (document.getElementById('completed').style.display = 'none');
  shuffleArray(symbols);

  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';
  symbols.forEach((symbol) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.textContent = '?';
    card.addEventListener('click', flipCard);
    card.classList.remove('flipped', 'matched');
    document.getElementById('completion-message').textContent = '';

    gameBoard.appendChild(card);
  });

  //Werte übergeben

  flippedCards = [];
  matchedCards = 0;
}

// Function to flip a card
function flipCard(event) {
  const card = event.target;
  if (card.textContent === '?') {
    // Verhindern das mehr als 2 karten geklickt werden
    if (flippedCards.length == 2) {
      return;
    }
    card.textContent = card.dataset.symbol; // Reveal  symbol
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

// Function to check if two flipped cards match
function checkMatch() {
  let firstCard = flippedCards[0];
  let secondCard = flippedCards[1];
  if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
    // Mark as matched
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedCards++;
    flippedCards = [];
    checkGameCompletion();
  } else {
    // Karten verstecken
    setTimeout(() => {
      firstCard.textContent = '?';
      secondCard.textContent = '?';
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      flippedCards = [];
    }, 1000);
  }
}

// Function to check if the game is completed
function checkGameCompletion() {
  if (matchedCards === totalPairs) {
    let text = document.getElementById('completion-message');
    text.textContent = "Congratulations! You've matched all pairs!";
    text.style.color = 'White';

    let button = (document.getElementById('completed').style.display = 'block');
  }
}

// Reset the game
function resetGame() {
  initGame(); // Reinitialize the game with shuffled cards
}

// Start game when Page loads
window.onload = initGame;
