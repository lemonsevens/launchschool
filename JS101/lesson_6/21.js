// 1. Initialize deck
// 2. Deal cards to player and dealer
// 3. Player turn: hit or stay
//  - repeat until bust or stay
// 4. If player bust, dealer wins
// 5. Dealer turn: hit or stay
//  - repeat until total >= 17
// 6. If dealer busts, player wins
// 7. Compare cards and declare winner

const readline = require("readline-sync");

const CARD_VALUES = [
  "Ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "Jack",
  "Queen",
  "King",
];
const CARD_SUITS = ["Diamonds", "Clubs", "Hearts", "Spades"];
const GAME_NAME = "Twenty-One";

const MAX_VALUE = 21;
const MAX_DEALER_HIT_VALUE = 17;

const ACE_VALUE = 11;
const ACE_CORRECTION = 10;
const ROYAL_VALUE = 10;

const WINNING_SCORE = 5;

let round = 0;
let playerScore = 0;
let dealerScore = 0;

let playerTotal;
let dealerTotal;

function greeting() {
  console.log(
    `Welcome!\n\nThe goal of ${GAME_NAME} is to try to get as close to ${MAX_VALUE} without going over. If you go over ${MAX_VALUE}, it's a bust, and you lose.\n`
  );
  console.log(
    "Player and dealer are initially dealt a hand of two cards. The player can see their 2 cards, but can only see one of the dealer's cards. The player always goes first, and can decide to either hit or stay.\n"
  );
  console.log("When the player stays, it's the dealer's turn.\n");
  console.log(
    "When both the player and the dealer stay, it's time to compare the total value of the cards and see who has the highest value.\n"
  );
  console.log(
    `The first player to score ${WINNING_SCORE} points wins the game.\n`
  );
  console.log("Press any key to continue...");

  readline.keyIn();
  console.clear();
}

// shuffle an array
function shuffle(array) {
  for (let index = array.length - 1; index > 0; index--) {
    let otherIndex = Math.floor(Math.random() * (index + 1)); // 0 to index
    [array[index], array[otherIndex]] = [array[otherIndex], array[index]]; // swap elements
  }
  return array;
}

// initialize the deck
function initializeDeck() {
  let deck = [];

  for (let suitIndex = 0; suitIndex < CARD_SUITS.length; suitIndex++) {
    let suit = CARD_SUITS[suitIndex];

    for (let valueIndex = 0; valueIndex < CARD_VALUES.length; valueIndex++) {
      let value = CARD_VALUES[valueIndex];
      deck.push([suit, value]);
    }
  }
  return shuffle(deck);
}

function total(cards) {
  // cards = [['H', '3'], ['S', 'Q'], ... ]

  let values = cards.map((value) => value[1]);

  let totalValue = 0;
  for (let index = 0; index < values.length; index++) {
    let value = values[index];
    if (value === "Ace") {
      totalValue += ACE_VALUE;
    } else if (["Jack", "Queen", "King"].includes(value)) {
      totalValue += ROYAL_VALUE;
    } else {
      totalValue += Number(value);
    }
  }

  values
    .filter((value) => value === "Ace")
    .forEach((_) => {
      if (totalValue > MAX_VALUE) totalValue -= ACE_CORRECTION;
    });

  return totalValue;
}

function busted(total) {
  return total > MAX_VALUE;
}

function detectResult(playerTotal, dealerTotal) {
  if (playerTotal > MAX_VALUE) {
    return "PLAYER_BUSTED";
  } else if (dealerTotal > MAX_VALUE) {
    return "DEALER_BUSTED";
  } else if (playerTotal > dealerTotal) {
    return "PLAYER";
  } else if (playerTotal < dealerTotal) {
    return "DEALER";
  } else {
    return "TIE";
  }
}

function displayResult(playerTotal, dealerTotal) {
  let result = detectResult(playerTotal, dealerTotal);

  switch (result) {
    case "PLAYER_BUSTED":
      console.log("You busted. Dealer wins this round.");
      break;
    case "DEALER_BUSTED":
      console.log("Dealer busted. You win this round.");
      break;
    case "PLAYER":
      console.log("You win this round.");
      break;
    case "DEALER":
      console.log("Dealer wins this round.");
      break;
    case "TIE":
      console.log("It's a tie.");
  }
}

function incrementScore(playerTotal, dealerTotal) {
  let result = detectResult(playerTotal, dealerTotal);

  if (result === "PLAYER_BUSTED" || result === "DEALER") {
    dealerScore += 1;
    round += 1;
  } else if (result === "DEALER_BUSTED" || result === "PLAYER") {
    playerScore += 1;
    round += 1;
  }
}

function displayScore() {
  console.log(" ---------------------------------------------- ");
  console.log(
    `| Round: ${round} | Player Score: ${playerScore} | Dealer Score: ${dealerScore} |`
  );
  console.log(" ---------------------------------------------- ");
}

function askPlayAgain() {
  let answer = readline.question();

  while (answer !== "y" && answer !== "n") {
    console.log("Invalid choice. Please select y for yes or n for no.");
    answer = readline.question().toLowerCase();
  }

  return answer;
}

function popTwoFromDeck(deck) {
  return [deck.pop(), deck.pop()];
}

function drawTwoCards(deck, playerDeck, dealerDeck) {
  playerDeck.push(...popTwoFromDeck(deck));
  dealerDeck.push(...popTwoFromDeck(deck));
}

function hand(cards) {
  return cards.map((card) => `${card[1]} of ${card[0]}`).join(", ");
}

function displayInitialDraw(playerTotal, playerCards, dealerCards) {
  playerTotal = total(playerCards);

  console.log(
    `Dealer has a ${dealerCards[0][1]} of ${dealerCards[0][0]} and a face down card.`
  );
  console.log(
    `You have: a ${playerCards[0][1]} of ${playerCards[0][0]} and a ${playerCards[1][1]} of ${playerCards[1][0]} for a total of ${playerTotal}.`
  );
}

function hitOrStay() {
  console.log("Would you like to (h)it or (s)tay?");
  let answer = readline.question().toLowerCase();

  while (answer !== "h" && answer !== "s") {
    console.log("Invalid choice. Please select h for hit or s for stay.");
    answer = readline.question().toLowerCase();
  }
  return answer;
}

function playersMove(playerCards, playerTotal, deck) {
  while (true) {
    let playerTurn = hitOrStay();

    if (playerTurn === "h" && !busted(playerTotal)) {
      playerCards.push(deck.pop());
      playerTotal = total(playerCards);
      console.log(
        `=> You chose to hit!\nYour cards are now: ${hand(
          playerCards
        )} with a total of ${playerTotal}.`
      );
    } else if (playerTurn === "s") {
      console.log(`=> You stayed at ${playerTotal}.`);
      break;
    } else if (busted(playerTotal)) {
      break;
    }
    playerTotal = total(playerCards);

    if (busted(playerTotal)) {
      break;
    }
  }
}

function dealersMove(dealerCards, dealerTotal, deck) {
  console.log("Dealer's turn.");

  while (dealerTotal < MAX_DEALER_HIT_VALUE) {
    console.log("Dealer hits.");
    dealerCards.push(deck.pop());
    dealerTotal = total(dealerCards);
    console.log(`Dealer's cards are now: ${hand(dealerCards)}`);
  }

  if (busted(dealerTotal)) {
    console.log(`Dealer total is now: ${dealerTotal}`);
  } else {
    dealerTotal = total(dealerCards);
    console.log(`Dealer stays at ${dealerTotal}.`);
  }
}

function displayStayResults(dealerCards, playerCards) {
  console.log("==============\n");
  console.log(`Dealer has ${hand(dealerCards)} for a total of: ${dealerTotal}`);
  console.log(
    `Player has ${hand(playerCards)} for a total of: ${playerTotal}\n`
  );
  console.log("==============");
}

function someoneWonOverall() {
  return playerScore === WINNING_SCORE || dealerScore === WINNING_SCORE;
}

function displayWinner() {
  if (playerScore === WINNING_SCORE) {
    console.log(
      `Player has scored ${WINNING_SCORE} points total. Player wins the game!`
    );
  } else {
    console.log(
      `Dealer has scored ${WINNING_SCORE} points total. Dealer wins the game!`
    );
  }
}

function resetRoundAndScore() {
  round = 0;
  playerScore = 0;
  dealerScore = 0;
}

// game begins
greeting();

while (true) {
  let deck = initializeDeck();
  let playerCards = [];
  let dealerCards = [];

  // initial deal
  drawTwoCards(deck, playerCards, dealerCards);

  // total from the initial deal
  playerTotal = total(playerCards);
  dealerTotal = total(dealerCards);

  displayInitialDraw(playerTotal, playerCards, dealerCards);

  // player turn
  playersMove(playerCards, playerTotal, deck);
  playerTotal = total(playerCards); // update player's total

  // if player does not bust, dealer's turn
  if (!busted(playerTotal)) {
    dealersMove(dealerCards, dealerTotal, deck);
  }

  // both player and dealer stays - compare cards!
  dealerTotal = total(dealerCards); // update dealer's total
  displayStayResults(dealerCards, playerCards);

  // display result of the round
  displayResult(playerTotal, dealerTotal);
  incrementScore(playerTotal, dealerTotal);
  displayScore();

  if (someoneWonOverall()) {
    displayWinner();
    console.log("Do you want start a new game? (y or n)");
    let answer = askPlayAgain();
    if (answer === "n") {
      console.clear();
      break;
    } else {
      resetRoundAndScore();
      console.clear();
    }
  } else {
    console.log(
      "Winner cannot be determined yet. Enter y to continue to the next round or n to exit the match early."
    );
    let answer = askPlayAgain();
    if (answer === "n") {
      console.clear();
      break;
    }
  }
}
