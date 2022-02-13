let game = {
    lockMode: false,
    firstCard: null,
    secondCard: null,

    setCard: function(id){
        let card = this.cards.filter(card=>card.id === id)[0];
        //console.log(card);
        if(card.flipped || this.lockMode){
            return false;
        }

        if(!this.firstCard){
            this.firstCard = card;
            return true;
        }else{
            this.secondCard = card;
            this.lockMode = true;
            return true;
        }
    },

    checkMatch: function(){
        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards: function(){
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },
    
    flags: ['brazil',
    'argentina',
    'uruguay',
    'canada',
    'chile',
    'england',
    'germany',
    'portugal',
    'sweeden',
    'USA'],

    cards:  null,

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