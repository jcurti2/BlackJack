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
    constructor(player,dealer){
        this.name = player;
        this.hand = [];``
        this.sum = 0
        this.dealer = dealer
    }
    addCardToHand(card){
        this.hand.push(card)
       if(card.id == 1 ){
        if(this.sum >= 11){
            this.sum += 1;
        }else {
            this.sum+=11
        }
        }else if(card.id > 10){
            this.sum += 10;
    } else {
        this.sum += card.id 
    }
    
}}
class Deck{
    cards = [];
    fillDeck(){
        for(let i = 1; i <= 13; i++)
        {
            for(let j = 1; j<= 4; j++){
               let temp = new Card(j, i)
            //    console.log(temp.cardValue());
               this.cards.push(temp);
            }
        }
        
    }
    shuffleDeck(){
        this.cards.sort(() => Math.random() - 0.5)
        // console.log(this.cards);
    }   
    dealCard(){
 
      return this.cards.pop();

    }

}
function hitMe(){
    playerTurn().addCardToHand(deck1.dealCard());
    if(playerTurn().sum > 21){
        playerMessage = `${playerTurn()} bust!` 
        playerTurn().sum = handValue    
    }
}

function playerTurn(){
    if (player.dealer == false){
        return player1;
    }else {
        return dealer;
    }
}
const hold = document.querySelector('#pass');

const hit = document.querySelector('#addCard'); 

let player1 = new Player('Player1', false);

let handValue = 0;

let dealer = new Player('Dealer', true);

let deck1 = new Deck;

deck1.fillDeck();

deck1.shuffleDeck();

player1.addCardToHand(deck1.dealCard());

player1.addCardToHand(deck1.dealCard());
// console.log(player1.sum);
// console.log(player1.hand);
dealer.addCardToHand(deck1.dealCard());

dealer.addCardToHand(deck1.dealCard());
// console.log(dealer.sum);
// console.log((dealer.hand));

//Need to determine who is first


hit.addEventListener('click', hitMe());

//hold.addEventListener('click', passtodealer);

//Dealer turn compare hand values, if less than player sum then add card. Then sum the value add another card. 
if (player1.sum > dealer.sum) {
    hitMe();
} else if (player1.sum = dealer.sum) { 
    //return message 'It's a tie!' 
}
else {
    //return message 'Dealer Wins!'
}










// let joker = new Card(1, 6);
// let joker2 = new Card(3, 11
//     )



// deck1.shuffleDeck();
// console.log(deck1.cards);
// player1.handValue()

// console.log(player1.sum);
// console.log(player1.hand);