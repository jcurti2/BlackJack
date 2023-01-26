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

        this.wins = 0;
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

let player1 = new Player(localStorage.getItem('player1'), false);

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

    copy.querySelector('.cardSuit').classList.add(myCard.suitValue());

    copy.id = 'copy'

    let whosCard = document.getElementById(cardHolder);

    whosCard.append(copy);
}
function startGame() {

    deck1.fillDeck();

    deck1.shuffleDeck();

    document.getElementById('p1').innerHTML = `${player1.name}`

    document.getElementById('playerWins').innerHTML = 'Wins: ' + player1.wins;

    document.getElementById('dealer').innerHTML = 'Dealer'

    document.getElementById('dealerWins').innerHTML = 'Wins: ' + dealer.wins;

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

        player1.wins += 1;

        document.getElementById('playerWins').innerHTML = 'Wins: ' +  player1.wins;

        endGame();

    } else if (dealer.sum == 21) {

        winLose.innerHTML = 'Dealer Wins!'

        document.getElementById('player').innerHTML = player1.sum;

        document.getElementById('dealr').innerHTML = dealer.sum;

        dealer.wins += 1;

        document.getElementById('dealerWins').innerHTML = 'Wins: ' + dealer.wins;

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

        dealer.wins += 1;

        document.getElementById('dealerWins').innerHTML = 'Wins: ' + dealer.wins;

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
winLose.innerHTML = `Good luck ${player1.name}!`

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

        dealer.wins += 1;

        document.getElementById('dealerWins').innerHTML = 'Wins: ' + dealer.wins;

        endGame()
    }
    else {

        winLose.innerHTML = `${player1.name} wins!`

        document.getElementById('dealr').innerHTML = dealer.sum;

        document.getElementById('playerWins').innerHTML = player1.wins;

        player1.wins += 1;

        document.getElementById('playerWins').innerHTML = 'Wins: ' + player1.wins;

        endGame()
    }
});

playAgain.addEventListener('click', () => {
    
    toggleHitHold('');

    togglePlayAgain('none');

    message.innerHTML = `Good luck ${player1.name}!`

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
