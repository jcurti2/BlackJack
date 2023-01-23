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
        this.hand = [];
        this.sum = 0;
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

let newCard = deck1.dealCard

function drawCard(myCard, cardHolder){
    let copy = document.getElementById('cardTemp').cloneNode(true);
    copy.document.getElementById('cardNum') = myCard.cardValue();
    copy.document.getElementById('cardSuit') = myCard.suitValue();
    cardHolder = document.getElementById('cardHolder');
    cardHolder.append(copy);
}


function endGame(){
     toggleHitHold('none');
     togglePlayAgain('');
     message.innerHTML = 'Play again?';
     
}






function hitMe(){
    player1.addCardToHand(deck1.dealCard())
    if(player1.sum > 21){
        winLose.innerHTML = `${player1.name} bust! Dealer wins!`
        document.getElementById('dealr').innerHTML = dealer.sum; 
        document.getElementById('player').innerHTML = player1.sum;    
        // return player1.sum
        // console.log(player1.sum);
        // console.log(playerMessage);
        endGame();
    } else {
        document.getElementById('player').innerHTML = player1.sum;
        winLose.innerHTML = 'Do you dare draw another?'
        // return player1.sum
        // console.log(player1.sum);
    }
}

const hold = document.querySelector('#pass');

const hit = document.getElementById('addCard'); 

const playAgain = document.querySelector('#newDeal');

let player1 = new Player('Player1', false);

let dealer = new Player('Dealer', true);

let deck1 = new Deck;

let winLose = document.querySelector('.winLoseMsg')

let message = document.querySelector('.displayMessage');

// let newCard = document.createElement('div');

// head message 'welcome to the blackjack table, good luck beating the dealer'

// document.getElementById('player').innerHTML = player1.sum;

// document.getElementById('dealr').innerHTML = dealer.sum;

deck1.fillDeck();

deck1.shuffleDeck();

player1.addCardToHand(deck1.dealCard());

// newCard.document.getElementById('dealerCard').append(newCard); 

player1.addCardToHand(deck1.dealCard());

document.getElementById('player').innerHTML = player1.sum;

if(player1.sum == 21){
   winLose.innerHTML = (`${player1} wins!`);
    document.getElementById('dealr').innerHTML = dealer.sum;
    endGame();
};
// console.log(player1.sum);
// console.log(player1.hand);
dealer.addCardToHand(deck1.dealCard());

dealer.addCardToHand(deck1.dealCard());

if(dealer.sum == 21){
    winLose.innerHTML = 'Dealer Wins!'
    document.getElementById('player').innerHTML = player1.sum;
    document.getElementById('dealr').innerHTML = dealer.sum;
    endGame();
    // console.log('Dealer wins!')
}
// console.log(dealer.sum);
// console.log((dealer.hand));

hit.addEventListener('click', () => hitMe());
// console.log(player1.sum)
// console.log(player1.hand);

hold.addEventListener('click', () => 
{
// Dealer's turn 
    while ( 16 > dealer.sum){ 
        dealer.addCardToHand(deck1.dealCard())
        // document.getElementById('dealerCard').append(newCard);
        document.getElementById('dealr').innerHTML = dealer.sum;
         
        // console.log(player1.sum); console.log(dealer.sum);
    }
    if (player1.sum == dealer.sum) { 
    winLose.innerHTML = 'Its a tie!'
    document.getElementById('dealr').innerHTML = dealer.sum;
    // console.log('Its a tie!');
    // console.log(dealer.sum); console.log(player1.sum);console.log(dealer.hand); console.log(player1.hand);
    endGame()
    }
    else if (dealer.sum > player1.sum && dealer.sum <= 21) {
    winLose.innerHTML = 'Dealer Wins!'
    document.getElementById('dealr').innerHTML = dealer.sum;
    // console.log('Dealer Wins!'); console.log(dealer.sum); console.log(player1.sum);console.log(dealer.hand); console.log(player1.hand);
    endGame()
    }
    else {
    winLose.innerHTML = `${player1.name} wins!`
    document.getElementById('dealr').innerHTML = dealer.sum;
    // console.log(`${player1.name} wins! Dealer bust!`); 
    // console.log(dealer.sum); console.log(player1.sum);console.log(dealer.hand); console.log(player1.hand);
    endGame()
    }
} 
);

//this function allows me to pass in '' to enable or none to disable the boxes ability to be clicked
function toggleHitHold(value){
    document.getElementById('addCard').style.pointerEvents = value;
    document.getElementById('pass').style.pointerEvents = value;
}

function togglePlayAgain(val){
    document.getElementById('newDeal').style.pointerEvents = val;
}

playAgain.addEventListener('click', () => {
    toggleHitHold('');
    togglePlayAgain('none');
    message.innerHTML = `Let's see if ${player1.name} can win this time!`
    winLose.innerHTML = ''
    player1.hand = [];
    dealer.hand = [];
    player1.sum = 0;
    document.getElementById('player').innerHTML = player1.sum;
    dealer.sum = 0;
    document.getElementById('dealr').innerHTML = dealer.sum;
        if (deck1.cards.length < 20){deck1.fillDeck(); deck1.shuffleDeck(); 
            // console.log(deck1.cards)
            player1.addCardToHand(deck1.dealCard());
            player1.addCardToHand(deck1.dealCard());
                document.getElementById('player').innerHTML = player1.sum;
            dealer.addCardToHand(deck1.dealCard());
            dealer.addCardToHand(deck1.dealCard());
    } else{
            player1.addCardToHand(deck1.dealCard());
            player1.addCardToHand(deck1.dealCard());
                document.getElementById('player').innerHTML = player1.sum;
            dealer.addCardToHand(deck1.dealCard());
            dealer.addCardToHand(deck1.dealCard());
            // console.log(player1.sum); console.log(dealer.sum); console.log(player1.hand); console.log(dealer.hand);
        }
    }
)



// let joker = new Card(1, 6);
// let joker2 = new Card(3, 11
//     )



// deck1.shuffleDeck();
// console.log(deck1.cards);
// player1.handValue()

// console.log(player1.sum);
// console.log(player1.hand);