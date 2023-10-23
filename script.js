
const cardList = ["hello","👾"," 🤖","😎","🎅🏻","🦧","🐳","⛄️","✈️","🚀"];
// 👽
let cardSet;
let board = [];
let rows = 4;
let columns = 5;

window.onload = () => {
    shuffleCards()
    startGame()
}

function shuffleCards() {
    // 1. Create two sets of cards
    let cardSet = cardList.concat(cardList);
    // 2. Shuffle the cards
    for (let i = 0; i < cardSet.length; i++) {
        let randomIndex = Math.floor(Math.random() * cardSet.length);
        let tempCardSet = cardSet[i];
        cardSet[i] = cardSet[randomIndex];
        cardSet[randomIndex] = tempCardSet;
    }
    console.log(cardSet);
}
function startGame() {
    // 1. Create the board
    let gameboard = document.getElementById("gameboard");
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
                let currentCard = cardSet.pop();
                row.push(currentCard);

                let card = document.createElement("div");
                card.id = `${r}-${c}`;
                card.textContent = currentCard;
                gameboard.appendChild(card);
                console.log(currentCard)
        }
        console.log(row);

    }
}
