class Card{
    constructor(suitId,id){
    this.suitId = suitId;
    this.id= id;
}
cardValue() {
    if (this.id == 1){
        return 'A';
    } else if (this.id == 11){
        return 'J';
    } else if (this.id == 12){
        return 'Q';
    } else if (this.id == 13){
        return 'K';
    } else {
        return this.id.toString(); 
    }
    }
    suitValue(){
        if(this.suitId == 1){
            return 'Spades';
        }else if(this.suitId == 2){
            return 'Clubs';
        }else if (this.suitId == 3){
            return 'Diamonds';
        }else {
            return 'Hearts';
        }
    }
}

class Player{
    constructor(player){
        this.name = player;
        this.hand = [];
    }
}
class Deck{
    cards = [];
    fillDeck(){
        for(let i = 1; i <= 13; i++)
        {
            for(let j = 1; j<= 4; j++){
               let temp = new Card(j, i)
               console.log(temp.cardValue());
               this.cards.push(temp);
            }
        }
        
    }
    shuffleDeck(){

    }
    dealCard(){

    }

}
let player1 = new Player('Player1');

let dealer = new Player('Dealer');


let deck1 = new Deck
deck1.fillDeck();
console.log(deck1.cards);