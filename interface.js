const FRONT = "card-front";
const BACK =  "card-back";
const CARD = "card";
const ICON = "icon";


startGame(); // Starts the game

function startGame(){
    initializeCards(game.createCardsFromFlags()); // Initialize and create cards
}

function initializeCards(cards){ // Creates the html of the cards
    let gameBoard = document.getElementById("gameBoard"); // Gets the game board
    gameBoard.innerHTML = ''; // Game board starts clean
    game.cards.forEach(card => { // For each card, they will have... 
        let cardElement = document.createElement('div'); // Creates a div
        cardElement.id = card.id; // Receives the id
        cardElement.classList.add(CARD); // Receives the class
        cardElement.dataset.icon = card.icon; // Receives the icon
        createCardContent(card, cardElement); // Creates the card content
        cardElement.addEventListener('click', flipCard); // Deals with the click
        gameBoard.appendChild(cardElement); // Adds the cards as child of gameBoard
    })
}

function createCardContent(card, cardElement){
    createCardFace(FRONT, card, cardElement); // Creates the faces of cards
    createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element){
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face); // Adds the faces class
    if(face === FRONT){ // Front face has...
        let iconElement = document.createElement('img'); // Receives the icon
        iconElement.classList.add(ICON); // Adds the icon class
        if(innerWidth > 430){ // Add icon image according to width size
            iconElement.src = "./images/" + card.icon + ".png";
        }
        if(innerWidth < 430  && innerWidth > 380){
            iconElement.src = "./images/" + card.icon + "-72.png";
        }
        if(innerWidth < 380){
            iconElement.src = "./images/" + card.icon + "-64.png";
        }
        cardElementFace.appendChild(iconElement); // Adds the icon as child of iconElement
    }else{ // Back face has...
        let iconElement = document.createElement('img');
        if(innerWidth < 430 && innerWidth > 380){ // Responsive back image
            iconElement.src = "./images/world.png";
        }
        if(innerWidth < 430 && innerWidth > 380){
            iconElement.src = "./images/world-72.png";
        }
        if(innerWidth < 380){
            iconElement.src = "./images/world-64.png";
        }
        cardElementFace.appendChild(iconElement); //Adds the icon as child of iconElement
    }
    element.appendChild(cardElementFace); // Adds the faces as child of element
}

function flipCard(){
    let playerMoves = document.querySelector("h2#moves1");
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
                        if(game.moves == 10){
                            let hiddenText = document.getElementById("hiddenText");
                            hiddenText.innerHTML = `10 moves? You are cheating bro...`;
                        }
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