import { GameManager } from './GameManager.js';
import { StateManager, GameSettings, GameState } from './StateManager.js';
import { UIManager } from './UIManager.js';

let settings: GameSettings; // Definiere settings als globale Variable

let gameManager: GameManager;
let stateManager: StateManager;
let uiManager: UIManager;

document.getElementById('startBtn')?.addEventListener('click', () => {
  const player1 = (document.getElementById('player1') as HTMLInputElement)
    .value;
  const player2 = (document.getElementById('player2') as HTMLInputElement)
    .value;
  let numPairs = parseInt(
    (document.getElementById('numPairs') as HTMLInputElement).value,
  );

  if (isNaN(numPairs) || numPairs === 0) numPairs = 8;

  if (numPairs > 12) {
    alert('zu viele Karten');
    return;
  }


  const defaultPlayer1 = 'Spieler 1';
  const defaultPlayer2 = 'Spieler 2';

  // Überprüfen, ob die Eingabefelder leer sind
  const player1Name = player1 || defaultPlayer1;
  const player2Name = player2 || defaultPlayer2;

  // Globale settings-Variable setzen
  settings = {
    numPairs,
    isMultiplayer: true,
    playerNames: [player1Name, player2Name],
  };

  const symbols: string[] = [
    '🍎',
    '🍌',
    '🍓',
    '🍇',
    '🍍',
    '🥝',
    '🍒',
    '🥥',
    '🍑',
    '🍋',
    '🍉',
    '🍊',
  ];

  gameManager = new GameManager(symbols, settings.numPairs);
  stateManager = new StateManager(settings);
  uiManager = new UIManager();

  // Start Formular ausblenden
  document.getElementById('setupForm')?.classList.add('d-none');
  initGame();
});

function initGame(): void {
  stateManager.gameState = GameState.InProgress;
  stateManager.flippedCards = [];
  stateManager.matchedCards = 0;
  uiManager.renderBoard(gameManager.cards, handleCardClick);
  uiManager.updateScoreboard(stateManager.players, stateManager.currentPlayer);
}

function handleCardClick(cardElement: HTMLDivElement): void {
  const cardId = parseFloat(cardElement.dataset.id!);
  const card = gameManager.cards.find((c) => c.id === cardId);

  // Verhindern, dass Karten doppelt angeklickt werden
  if (
    !card ||
    card.isFlipped ||
    card.isMatched ||
    stateManager.flippedCards.length === 2
  )
    return;

  card.isFlipped = true;
  stateManager.flippedCards.push(card);
  uiManager.renderBoard(gameManager.cards, handleCardClick);

  if (stateManager.flippedCards.length === 2) {
    const [first, second] = stateManager.flippedCards;
    if (first.symbol === second.symbol) {
      first.isMatched = true;
      second.isMatched = true;
      stateManager.matchedCards++;
      stateManager.addPoint();
      stateManager.flippedCards = [];
      uiManager.renderBoard(gameManager.cards, handleCardClick);
    } else {
      setTimeout(() => {
        first.isFlipped = false;
        second.isFlipped = false;
        stateManager.flippedCards = [];
        stateManager.switchPlayer();
        uiManager.renderBoard(gameManager.cards, handleCardClick);
        uiManager.updateScoreboard(
          stateManager.players,
          stateManager.currentPlayer,
        );
      }, 1000);
      return;
    }

    uiManager.updateScoreboard(
      stateManager.players,
      stateManager.currentPlayer,
    );
    if (stateManager.isGameComplete(settings.numPairs)) {
      stateManager.gameState = GameState.Completed;
      uiManager.showCompletionMessage();
      // Formular wieder einblenden, nachdem das Spiel beendet ist
      document.getElementById('setupForm')?.classList.remove('d-none');
    }
  }
}
