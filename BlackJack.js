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
    playerTurn().addCardToHand(deck1.dealCard())
    if(playerTurn().sum > 21){
        playerMessage = `${playerTurn()} bust!`     
        return playerTurn().sum
    } else {
        return playerTurn().sum
    }
}

const hold = document.querySelector('#pass');

const hit = document.getElementById('addCard'); 

let player1 = new Player('Player1', false);

let dealer = new Player('Dealer', true);

let deck1 = new Deck;

let message = document.querySelector('.displayMessage');

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

hit.addEventListener('click', () => hitMe() );
// ;console.log('hit')

hold.addEventListener('click', () => 
{
// Dealer's turn 
    while (player1.sum > dealer.sum){
        hitMe();
    }
    if (player1.sum = dealer.sum) { 
    message.innerHTML = 'Its a tie!' ;
    }
    else if (dealer.sum > player.sum && dealer.sum <= 21) {
    message.innerHTML = 'Dealer Wins!'
    }
    else {
    message.innerHTML = `${player1} wins!`
    }
} 
);








// let joker = new Card(1, 6);
// let joker2 = new Card(3, 11
//     )



// deck1.shuffleDeck();
// console.log(deck1.cards);
// player1.handValue()

// console.log(player1.sum);
// console.log(player1.hand);