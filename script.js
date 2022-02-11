const FRONT = "card-front";
const BACK =  "card-back";

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
    console.log(cards);
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
    for(let flag of flags){
        cards.push(createPairFromFlag(flag));
    }
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