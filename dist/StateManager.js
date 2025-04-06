export var GameState;
(function (GameState) {
    GameState[GameState["NotStarted"] = 0] = "NotStarted";
    GameState[GameState["InProgress"] = 1] = "InProgress";
    GameState[GameState["Completed"] = 2] = "Completed";
})(GameState || (GameState = {}));
export class StateManager {
    constructor(settings) {
        this.gameState = GameState.NotStarted;
        this.flippedCards = [];
        this.matchedCards = 0;
        this.currentPlayerIndex = 0;
        this.players = settings.playerNames.map((name) => ({ name, score: 0 }));
    }
    switchPlayer() {
        this.currentPlayerIndex =
            (this.currentPlayerIndex + 1) % this.players.length;
    }
    get currentPlayer() {
        return this.players[this.currentPlayerIndex];
    }
    addPoint() {
        this.players[this.currentPlayerIndex].score += 1;
    }
    isGameComplete(totalPairs) {
        return this.matchedCards === totalPairs;
    }
}
