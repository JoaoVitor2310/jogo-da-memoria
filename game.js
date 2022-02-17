let game = { // Game will be an object of back end
    lockMode: false, // Inicial states
    firstCard: null,
    secondCard: null,

    flags: ['brazil', //Flags array
    'argentina',
    'uruguay',
    'canada',
    'chile',
    'england',
    'germany',
    'portugal',
    'sweeden',
    'USA'],

    cards:  null, // Inicial states
    moves: 0,

    setCard: function(id){
        let card = this.cards.filter(card=>card.id === id)[0];
        if(card.flipped || this.lockMode){
            return false;
        }

        if(!this.firstCard){
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        }else{
            this.secondCard = card;
            this.lockMode = true;
            this.secondCard.flipped = true;
            return true;
        }
    },

    checkMatch: function(){
        if(!this.firstCard || !this.secondCard){
            this.moves++;
            return false;
        }
        this.moves++;
        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards: function(){
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },
    
    unflipCards(){
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver(){
        return this.cards.filter(card=>!card.flipped).length == 0; // Game over state 
    },

    createCardsFromFlags: function(){ // Creating cards
        this.cards = []; // Cards will be here
        this.flags.forEach((flag) => { // Each card will have a pair
            this.cards.push(this.createPairFromFlag(flag)); // Creates a pair
        })
        this.cards = (this.cards.flatMap(pair => pair)); // Separates pairs into individual cards
        this.shuffleCards();
        return this.cards;
    },
    
    createPairFromFlag: function(flag){
        return [{ // Each pair of cards has id, icon and flip state
            id: this.createIdWithFlag(flag),
            icon: flag,
            flipped: false,
        },{
            id: this.createIdWithFlag(flag),
            icon: flag,
            flipped: false,
        }]
    },
    
    createIdWithFlag: function(flag){
        return flag + parseInt(Math.random() *100); // Creates a random id for each pair
    },

    shuffleCards: function(cards){ // Shuffles the cards
        let currentIndex = this.cards.length; // We will start from the last to the fist one
        let randomIndex = 0;
        while(currentIndex !== 0){
            randomIndex = (Math.floor(Math.random() *currentIndex)); // Random Index to shuffle
            currentIndex--; // Decrements
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]; // Change the cards position
        }
        
    }


}