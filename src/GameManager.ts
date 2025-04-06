export interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export class GameManager {
  private symbols: string[];
  public cards: Card[];

  constructor(symbols: string[], numPairs: number) {
    this.symbols = symbols.slice(0, numPairs);
    this.cards = this.generateShuffledCards();
  }

  private generateShuffledCards(): Card[] {
    const deck: Card[] = this.symbols.flatMap((symbol) => [
      { id: Math.random(), symbol, isFlipped: false, isMatched: false },
      { id: Math.random(), symbol, isFlipped: false, isMatched: false },
    ]);
    return this.shuffle(deck);
  }

  private shuffle<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
  }
}
