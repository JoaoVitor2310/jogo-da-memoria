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
    'USA'
];
createCardsFromFlags(flags);
function createCardsFromFlags(flags){
    let cards = [];
    for(let flag of flags){
        cards.push(createPairFromFlags(flag));
    }
    console.log(cards.flatMap(pair => pair));
}

function createPairFromFlags(flag){
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