const FRONT = "card-front";
const BACK =  "card-back";
const CARD = "card";
const ICON = "icon";


startGame();

function startGame(){
    initializeCards(game.createCardsFromFlags());
}

function initializeCards(cards){
    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = '';
    game.cards.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;
        createCardContent(card, cardElement);
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    })
}

function createCardContent(card, cardElement){
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element){
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if(face === FRONT){
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./images/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    }else{
        let iconElement = document.createElement('img');
        iconElement.src = "./images/world.png";
        cardElementFace.appendChild(iconElement);
    }
    element.appendChild(cardElementFace);
}

function flipCard(){
    let playerMoves = document.querySelector("h2#moves1");
    //console.log(playerMoves);
    if(game.setCard(this.id)){
        this.classList.add("flip");
        if(game.secondCard){
            if(game.checkMatch()){
                playerMoves.innerHTML = `Moves: ${game.moves}`;
                game.clearCards();
                if(game.checkGameOver()){
                    setTimeout(()=>{
                        let gameOverLayer = document.getElementById("gameOver");
                        gameOverLayer.style.display = 'flex';
                        playerMoves.innerHTML = `Moves: ${game.moves}`;
                        let playerMoves2 = document.querySelector("h2#moves2");
                        playerMoves2.innerHTML = `Moves: ${game.moves}`;
                    }, 500);
                }
            }else{
                playerMoves.innerHTML = `Moves: ${game.moves}`;
                setTimeout(()=> {
                let firstCardView = document.getElementById(game.firstCard.id);
                let secondCardView = document.getElementById(game.secondCard.id);
                firstCardView.classList.remove('flip');
                secondCardView.classList.remove('flip');
                game.unflipCards();
                }, 1000);
            }
        }
    }
}

function restart(){
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = 'none';
    game.moves = 0;
    let playerMoves = document.querySelector("h2#moves1");
    playerMoves.innerHTML = `Moves: ${game.moves}`;
}