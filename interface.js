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
        cardElementFace.innerHTML = "&lt/&gt";
    }
    element.appendChild(cardElementFace);
}

function flipCard(){
    if(game.setCard(this.id)){
        this.classList.add("flip");
        if(game.checkMatch()){
            game.clearCards();
        }else{
            setTimeout(()=> {
            let firstCardView = document.getElementById(game.firstCard.id);
            let secondCardView = document.getElementById(game.secondCard.id);
            firstCardView.classList.remove('flip');
            secondCardView.classList.remove('flip');
            game.clearCards();
            }, 1000);
        }
    }
}