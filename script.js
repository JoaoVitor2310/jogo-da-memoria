const FRONT = "card-front";
const BACK =  "card-back";
const CARD = "card";
const ICON = "icon";

let flags = ['brazil',
    'argentina',
    'uruguay',
    'canada',
    'chile',
    'england',
    'germany',
    'portugal',
    'sweeden',
    'USA'];

let cards = null;
startGame();

function startGame(){
    cards = createCardsFromFlags(flags);
    shuffleCards(cards);
    initializeCards(cards);
}

function initializeCards(cards){
    let gameBoard = document.getElementById("gameBoard");
    cards.forEach(card => {
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

function shuffleCards(cards){
    let currentIndex = (cards.length);
    let randomIndex = 0;
    while(currentIndex !== 0){
        randomIndex = (Math.floor(Math.random() *currentIndex));
        currentIndex--;
        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]];
    }
}

function createCardsFromFlags(flags){
    cards = [];
    flags.forEach((flag) => {
        cards.push(createPairFromFlag(flag));
    })
    return (cards.flatMap(pair => pair));
}

function createPairFromFlag(flag){
    return [{
        id: createIdWithFlag(flag),
        icon: flag,
        flipped: false,
    },{
        id: createIdWithFlag(flag),
        icon: flag,
        flipped: false,
    }]
}

function createIdWithFlag(flag){
    return flag + parseInt(Math.random() *100);
}

function flipCard(){
    this.classList.add("flip");
}