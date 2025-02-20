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

  //Werte übergeben
  for (let i = 1; i <= 16; i++) {
    const card = document.getElementById('card' + i);
    card.textContent = '?'; // Set back to '?'
    card.dataset.symbol = symbols[i - 1]; // Store the symbol in a custom data attribute
    card.classList.remove('flipped', 'matched'); // Reset card state
  }
  flippedCards = [];
  matchedCards = 0;
  document.getElementById('completion-message').textContent = '';
}

// Function to flip a card
function flipCard(cardId) {
  const card = document.getElementById(cardId);
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
