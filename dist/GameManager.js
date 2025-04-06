export class GameManager {
    constructor(symbols, numPairs) {
        this.symbols = symbols.slice(0, numPairs);
        this.cards = this.generateShuffledCards();
    }
    generateShuffledCards() {
        const deck = this.symbols.flatMap((symbol) => [
            { id: Math.random(), symbol, isFlipped: false, isMatched: false },
            { id: Math.random(), symbol, isFlipped: false, isMatched: false },
        ]);
        return this.shuffle(deck);
    }
    shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }
}
