/*
DESCRIPTION:
  Create a game of twenty one.

RULES:
  - Deck:
    - 52 cards
      - 4 suits (hearts, diamonds, spades, clubs)
        - 13 values (2 - 10, jack, queen, king, ace)
  - Goal:
    - Player closest to 21 wins
    - if you go over: you bust (lose)
  - Setup:
    - Two players:
      - dealer
      - player
    - Initial draw of two cards each
    - Players can see only one (top) card of other player
  - Card Values:
    - 2-10 = card value
    - jack, queen and king = 10
    - ace = 1 or 11
      - determined by total hand value (so not to bust)
  - Player Turn:
    - Non-dealer always goes first.
    - Hit or stay
    - Player keeps going (hitting) until bust or until they stay
  - Dealer Turn:
    - After player stays, it's dealers turn
    - Must hit until >= 17
    - If dealer busts, player wins
  - Comparing Cards:
    - When both player and dealer stay, compare total value of cards.
    - Highest value wins.


DATA STRUCTURE:
  - Deck:         object = {
                    suit:   ['H', 'D', 'S', 'C'],
                    values: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
                  }
                  ->
                  array = [ ['H', 'A'], ['H', '2'], ['H', '3'], ... ['D', 'A'], ['D', '2'], ...]

  - Player hand: array = [ ['H', 'A'], ['D', '9'] ]
  - Dealer hand: array = [ ['S', '4'], ['C', '6'], ['D', '7'] ]


ALGORITHM:
  -
  - Initialize deck
  - Shuffle deck
  - Deal two cards to player and one to dealer
  - Display hands
  - Player's turn
    - ask hit or stay?
      - if hit, deal new card
    - display player and dealer hand
    - repeat until bust or stay
    - if bust, end game
    - if stay, continue to dealers turn
    - Dealers turn
    - deal new card
    - display player and dealer hand
    - repeat until total >= 17 or bust
  - Sum Totals and display winner
*/
const readline = require("readline-sync");

let deck = [];
let dealersCards = [];
let playersCards = [];

function initializeDeck(deck) {
  let deckObj = {
    suit: ["H", "D", "S", "C"],
    values: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
  };

  for (let suitIndex = 0; suitIndex < deckObj["suit"].length; suitIndex++) {
    for (
      let valuesIndex = 0;
      valuesIndex < deckObj["values"].length;
      valuesIndex++
    ) {
      deck.push([deckObj["suit"][suitIndex], deckObj["values"][valuesIndex]]);
    }
  }

  shuffle(deck);
  return deck;
}

function shuffle(deck) {
  for (let index = deck.length - 1; index > 0; index--) {
    let otherIndex = Math.floor(Math.random() * (index + 1)); // 0 to index
    [deck[index], deck[otherIndex]] = [deck[otherIndex], deck[index]]; // swap elements
  }
}

const drawCard = (player) => player.push(deck.pop());

function sumTotal(cards) {
  let sumTotal = 0;

  for (let i = 0; i < cards.length; i++) {
    if (cards[i][1] === "A") {
      sumTotal += 11;
    } else if (["K", "Q", "J"].includes(cards[i][1])) {
      sumTotal += 10;
    } else {
      sumTotal += Number(cards[i][1]);
    }
    if (cards[i][1] === "A" && sumTotal > 21) sumTotal -= 10;
  }

  return sumTotal;
}

function displayCards() {
  let playersResult = ``;
  let dealersResult = ``;
  
  for (let i = 0; i < playersCards.length; i++) {
    playersResult += playersCards[i].join("");
    if (i < playersCards.length - 1) playersResult += ", ";
  }

  for (let i = 0; i < dealersCards.length; i++) {
    dealersResult += dealersCards[i].join("");
    if (i < dealersCards.length - 1) dealersResult += ", ";
  }

  console.log(`Player: ${playersResult} \nDealer: ${dealersResult}`);
}

function playersTurn() {
  // let hitOrStay;
  let hitOrStay = readline.question("Hit? (y or n) ");
  if (hitOrStay === "y") {
    drawCard(playersCards);
    hitOrStay = "Hit";
  } else {
    hitOrStay = "Stay";
  }

  return hitOrStay;
}

/*
ALGORITHM:
  - Initialize deck
    - Shuffle deck
  - Deal two cards to player and one to dealer
  - Display hands
  - Player's turn
    - ask hit or stay?
      - if hit, deal new card
    - display player and dealer hand
    - repeat until bust or stay
    - if bust, end game
    - if stay, continue to dealers turn
    - Dealers turn
    - deal new card
    - display player and dealer hand
    - repeat until total >= 17 or bust
  - Sum Totals and display winner
*/

initializeDeck(deck);

drawCard(playersCards);
drawCard(playersCards);
drawCard(dealersCards);

displayCards();

playersTurn();

// while (true) {
//   console.clear();
//   if (sumTotal(playersCards) > 21) {
//     console.log(`You Bust!`);
//     console.log(sumTotal(playersCards));
//     break;
//   }
//   if (playersTurn() === "Stay") break;
// }