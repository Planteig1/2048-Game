
const cardList = ["👽","👾"," 🤖","😎","🎅🏻","🦧","🐳","⛄️","✈️","🚀"];
let cardSet;
let rows = 5;
let columns = 4;
let board = document.querySelector(".game-board");
let moveCounter = document.querySelector(".moves-count");
let startGameButton = document.querySelector(".start-button");
let landingPageModal = document.querySelector(".modal");
let restartPageModal = document.querySelector(".modal-reset-page");
let resetButton = document.querySelector(".reset-button");
let resultText = document.querySelector(".result-text");
let amountOfMoves = 0;
let amountOfCardsCorrect = 0;


/* USE IF YOU WANT TO CHEAT
let cheatButton = document.querySelector(".win-button");
cheatButton.addEventListener("click", () => {
    document.querySelectorAll(".card-hidden").forEach(card => card.classList.toggle("card-hidden"))
    if(document.querySelectorAll(".card-hidden").length === 0) {
        restartPageModal.style.display = "flex";
        resultText.innerText = `Congratulations, you won in ${moveCounter.innerText} moves! 🏆`
    }
});
*/

startGameButton.addEventListener("click", () => {
    shuffleCards()
    startGame()
    landingPageModal.style.display = "none";

});
resetButton.addEventListener("click", () => {
    resetGame()
    shuffleCards()
    startGame()
    restartPageModal.style.display = "none";
});


function shuffleCards() {
    // 1. Create two sets of cards
    cardSet = cardList.concat(cardList);
    // 2. Shuffle the cards
    for (let i = 0; i < cardSet.length; i++) {
        let randomIndex = Math.floor(Math.random() * cardSet.length);
        let tempCardSet = cardSet[i];
        cardSet[i] = cardSet[randomIndex];
        cardSet[randomIndex] = tempCardSet;
    }
    console.log(cardSet)
    return cardSet
}

function startGame() {
    // 1. Create a board
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let j = 0; j < columns; j++) {
            let currentCard = cardSet.pop();
            row.push(currentCard);
            // 2. Create the cards
           let card = document.createElement("div");
           card.classList.add("card");
           card.id = `${r}-${j}`;
           card.innerHTML = currentCard;
           card.addEventListener("click", selectCard);
           board.appendChild(card);
           console.log(row)
        }
    }
    setTimeout(hideCards, 1000)

}
function hideCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r + "-" + c);
            card.classList.toggle("card-hidden")
        }
    }
}

let card1Selected = null;
let card2Selected = null;

function selectCard() {
    if (this.classList.contains("card-hidden")) {
        if(!card1Selected) {
            card1Selected = this;
            card1Selected.classList.toggle("card-hidden");
            card1Selected.classList.toggle("card-flip");
        } else if (!card2Selected && this !== card1Selected) {
            card2Selected = this;
            card2Selected.classList.toggle("card-hidden");
            card2Selected.classList.toggle("card-flip");

            amountOfMoves += 1;
            moveCounter.innerText = amountOfMoves
            setTimeout(checkMatch, 1000);
        }

    }
}

function checkMatch () {
    if (card1Selected.innerText === card2Selected.innerText) {
        card1Selected = null;
        card2Selected = null;
        amountOfCardsCorrect += 2;

    } else {
        card1Selected.classList.toggle("card-hidden");
        card1Selected.classList.toggle("card-flip");
        card2Selected.classList.toggle("card-hidden");
        card2Selected.classList.toggle("card-flip");
        card1Selected = null;
        card2Selected = null;
    }
    if(amountOfCardsCorrect === (rows * columns)) {
        restartPageModal.style.display = "flex";
        resultText.innerText = `Congratulations, you won in ${moveCounter.innerText} moves! 🏆`
    }
}

function resetGame() {
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => card.remove());
    amountOfMoves = 0;
    moveCounter.innerText = amountOfMoves

}
