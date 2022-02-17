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

    createCardsFromFlags: function(){
        this.cards = [];
        this.flags.forEach((flag) => {
            this.cards.push(this.createPairFromFlag(flag));
        })
        this.cards = (this.cards.flatMap(pair => pair));
        this.shuffleCards();
        return this.cards;
    },
    
    createPairFromFlag: function(flag){
        return [{
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
        return flag + parseInt(Math.random() *100);
    },

    shuffleCards: function(cards){
        let currentIndex = this.cards.length;
        let randomIndex = 0;
        while(currentIndex !== 0){
            randomIndex = (Math.floor(Math.random() *currentIndex));
            currentIndex--;
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }
        
    }


}