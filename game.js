let game = { // Game is an object of back end
    lockMode: false, // Inicial states to check pairs
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

    setCard: function(id){ // Sets the clicked cards
        let card = this.cards.filter(card=>card.id === id)[0];
        if(card.flipped || this.lockMode){ // Verifies if the card is flipped
            return false;
        }

        if(!this.firstCard){ // First card to compare
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        }else{ // Second card to compare
            this.secondCard = card;
            this.lockMode = true; // Lock Mode to compare
            this.secondCard.flipped = true;
            return true;
        }
    },

    checkMatch: function(){ //Checks if there's a winner
        if(!this.firstCard || !this.secondCard){ // There is no cards selected
            this.moves++;
            return false;
        }
        this.moves++;
        return this.firstCard.icon === this.secondCard.icon; // There is a winner
    },

    clearCards: function(){ // Clears the compare cards and lock mode
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },
    
    unflipCards(){ // Come back to initial state cards
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