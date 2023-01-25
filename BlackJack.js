//functions classes and global variables
class Card {
    constructor(suitId, id) {

        this.suitId = suitId;

        this.id = id;
    }
    cardValue() {

        if (this.id == 1) {

            return 'A';

        } else if (this.id == 11) {

            return 'J';

        } else if (this.id == 12) {

            return 'Q';

        } else if (this.id == 13) {

            return 'K';

        } else {

            return this.id.toString();
        }
    }
    suitValue() {

        if (this.suitId == 1) {

            return 'Spades';

        } else if (this.suitId == 2) {

            return 'Clubs';

        } else if (this.suitId == 3) {

            return 'Diamonds';

        } else {

            return 'Hearts';
        }
    }
}

class Player {
    constructor(player, dealer) {

        this.name = player;

        this.hand = [];

        this.sum = 0;

        this.dealer = dealer
    }

    addCardToHand(card) {
        this.hand.push(card)

        if (card.id == 1) {

            if (this.sum >= 11) {

                this.sum += 1;

            } else {
                
                this.sum += 11
            }

        } else if (card.id > 10) {

            this.sum += 10;

        } else {

            this.sum += card.id
        }

    }
}
class Deck {
    cards = [];
    fillDeck() {
        for (let i = 1; i <= 13; i++) {

            for (let j = 1; j <= 4; j++) {

                let temp = new Card(j, i)

                this.cards.push(temp);
            }
        }

    }
    shuffleDeck() {
        this.cards.sort(() => Math.random() - 0.5)
    }
    dealCard() {

        return this.cards.pop();

    }

}
const timer = 5000;

const hold = document.querySelector('#pass');

const hit = document.getElementById('addCard');

const playAgain = document.querySelector('#newDeal');

let player1 = new Player('player1', false);

let dealer = new Player('Dealer', true);

let deck1 = new Deck;

let winLose = document.querySelector('.winLoseMsg')

let message = document.querySelector('.displayMessage');


function drawCard(myCard, cardHolder, dealerFirstCard) {

    let copy = document.getElementById('cardTemp').cloneNode(true);

    if (dealerFirstCard != undefined && dealerFirstCard) {

        copy.querySelector('.cardSuit').classList.add('dealerFirstCard');

        copy.querySelector('.cardNum').classList.add('dealerFirstCard');
    }

    copy.querySelector('.cardNum').innerHTML = myCard.cardValue();

    // copy.querySelector('.cardSuit').innerHTML = myCard.suitValue();

    copy.querySelector('.cardSuit').classList.add(myCard.suitValue());

    copy.id = 'copy'

    let whosCard = document.getElementById(cardHolder);

    whosCard.append(copy);
}
function startGame() {

    deck1.fillDeck();

    deck1.shuffleDeck();

    document.getElementById('p1').innerHTML = `${player1.name}`

    document.getElementById('dealer').innerHTML = 'Dealer'

    let myCard1 = deck1.dealCard()

    player1.addCardToHand(myCard1);

    drawCard(myCard1, 'playerCards');

    let myCard2 = deck1.dealCard()

    player1.addCardToHand(myCard2);

    drawCard(myCard2, 'playerCards');

    document.getElementById('player').innerHTML = player1.sum;

    let myCard3 = deck1.dealCard()

    dealer.addCardToHand(myCard3)

   drawCard(myCard3, 'dealerCards', true);

    let myCard4 = deck1.dealCard()

    dealer.addCardToHand(myCard4);

    drawCard(myCard4, 'dealerCards');

    if (player1.sum == 21) {

        winLose.innerHTML = (`${player1.name} wins!`);

        document.getElementById('dealr').innerHTML = dealer.sum;

        endGame();

    } else if (dealer.sum == 21) {

        winLose.innerHTML = 'Dealer Wins!'

        document.getElementById('player').innerHTML = player1.sum;

        document.getElementById('dealr').innerHTML = dealer.sum;

        endGame();
    }
}
function endGame() {

    toggleHitHold('none');

    togglePlayAgain('');

    message.innerHTML = 'Play again?';

    document.querySelectorAll('.dealerFirstCard').forEach(card => card.classList.remove('dealerFirstCard'))
}




function hitMe() {

    let myCard = deck1.dealCard()

    player1.addCardToHand(myCard)

    drawCard(myCard, 'playerCards')

    if (player1.sum > 21) {

        winLose.innerHTML = `${player1.name} bust! Dealer wins!`

        document.getElementById('dealr').innerHTML = dealer.sum;
        
        document.getElementById('player').innerHTML = player1.sum;

        endGame();
    } else {

        document.getElementById('player').innerHTML = player1.sum;

        winLose.innerHTML = 'Draw another?'

    }
}

function toggleHitHold(value) {

    document.getElementById('addCard').style.pointerEvents = value;

    document.getElementById('pass').style.pointerEvents = value;
}

function togglePlayAgain(val) {

    document.getElementById('newDeal').style.pointerEvents = val;

}

//game function below
startGame();

hit.addEventListener('click', () => hitMe());

hold.addEventListener('click', () => {
    // Dealer's turn 
    while (dealer.sum < 16) {

        let newCard = deck1.dealCard()

        drawCard(newCard, 'dealerCards');

        dealer.addCardToHand(newCard)

        document.getElementById('dealr').innerHTML = dealer.sum;

    }
    if (player1.sum == dealer.sum) {

        winLose.innerHTML = 'Its a tie!'

        document.getElementById('dealr').innerHTML = dealer.sum;

        endGame()
    }
    else if (dealer.sum > player1.sum && dealer.sum <= 21) {

        winLose.innerHTML = 'Dealer Wins!'

        document.getElementById('dealr').innerHTML = dealer.sum;

        endGame()
    }
    else {

        winLose.innerHTML = `${player1.name} wins!`

        document.getElementById('dealr').innerHTML = dealer.sum;

        endGame()
    }
});
//this function allows me to pass in '' to enable or none to disable the boxes ability to be clicked

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

    document.querySelectorAll('#copy').forEach(card => card.remove());

    startGame();
})
