var _a;
import { GameManager } from './GameManager.js';
import { StateManager, GameState } from './StateManager.js';
import { UIManager } from './UIManager.js';
let settings; // Definiere settings als globale Variable
let gameManager;
let stateManager;
let uiManager;
(_a = document.getElementById('startBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    var _a;
    const player1 = document.getElementById('player1')
        .value;
    const player2 = document.getElementById('player2')
        .value;
    let numPairs = parseInt(document.getElementById('numPairs').value);
    if (isNaN(numPairs) || numPairs === 0)
        numPairs = 8;
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
    const symbols = [
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
    (_a = document.getElementById('setupForm')) === null || _a === void 0 ? void 0 : _a.classList.add('d-none');
    initGame();
});
function initGame() {
    stateManager.gameState = GameState.InProgress;
    stateManager.flippedCards = [];
    stateManager.matchedCards = 0;
    uiManager.renderBoard(gameManager.cards, handleCardClick);
    uiManager.updateScoreboard(stateManager.players, stateManager.currentPlayer);
}
function handleCardClick(cardElement) {
    var _a;
    const cardId = parseFloat(cardElement.dataset.id);
    const card = gameManager.cards.find((c) => c.id === cardId);
    // Verhindern, dass Karten doppelt angeklickt werden
    if (!card ||
        card.isFlipped ||
        card.isMatched ||
        stateManager.flippedCards.length === 2)
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
        }
        else {
            setTimeout(() => {
                first.isFlipped = false;
                second.isFlipped = false;
                stateManager.flippedCards = [];
                stateManager.switchPlayer();
                uiManager.renderBoard(gameManager.cards, handleCardClick);
                uiManager.updateScoreboard(stateManager.players, stateManager.currentPlayer);
            }, 1000);
            return;
        }
        uiManager.updateScoreboard(stateManager.players, stateManager.currentPlayer);
        if (stateManager.isGameComplete(settings.numPairs)) {
            stateManager.gameState = GameState.Completed;
            uiManager.showCompletionMessage();
            // Formular wieder einblenden, nachdem das Spiel beendet ist
            (_a = document.getElementById('setupForm')) === null || _a === void 0 ? void 0 : _a.classList.remove('d-none');
        }
    }
}
