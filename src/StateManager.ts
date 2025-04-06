import { Card } from './GameManager.js';

export enum GameState {
  NotStarted,
  InProgress,
  Completed,
}

export interface Player {
  name: string;
  score: number;
}

export interface GameSettings {
  numPairs: number;
  isMultiplayer: boolean;
  playerNames: string[];
}

export class StateManager {
  public gameState: GameState = GameState.NotStarted;
  public flippedCards: Card[] = [];
  public matchedCards: number = 0;
  public players: Player[];
  public currentPlayerIndex: number = 0;

  constructor(settings: GameSettings) {
    this.players = settings.playerNames.map((name) => ({ name, score: 0 }));
  }

  switchPlayer(): void {
    this.currentPlayerIndex =
      (this.currentPlayerIndex + 1) % this.players.length;
  }

  get currentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }

  addPoint(): void {
    this.players[this.currentPlayerIndex].score += 1;
  }

  isGameComplete(totalPairs: number): boolean {
    return this.matchedCards === totalPairs;
  }
}
