export class UIManager {
    renderBoard(cards, onClick) {
        const board = document.getElementById('game-board');
        board.innerHTML = '';
        cards.forEach((card) => {
            //Karten erstellen
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.dataset.id = card.id.toString();
            cardElement.textContent =
                card.isFlipped || card.isMatched ? card.symbol : '?';
            if (card.isFlipped) {
                cardElement.classList.add('flipped');
            }
            if (card.isMatched)
                cardElement.classList.add('matched');
            cardElement.addEventListener('click', () => onClick(cardElement));
            board.appendChild(cardElement);
        });
    }
    updateScoreboard(players, currentPlayer) {
        const scoreboard = document.getElementById('scoreboard');
        scoreboard.innerHTML = players
            .map((p) => `<span${p === currentPlayer ? ' style="font-weight: bold;"' : ''}>${p.name}: ${p.score}</span>`)
            .join('<br>');
    }
    showCompletionMessage() {
        const msg = document.getElementById('completion-message');
        msg.textContent = "Congratulations! You've matched all pairs!";
    }
}
