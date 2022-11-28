/*
  - Initialize deck
  - Deal two cards each to player and dealer
  - Display hands, concealing second dealer card
  - Player's turn
    - ask hit or stay?
      - if hit, deal new card
        - display player and dealer hand
        - repeat until bust or stay
      - if bust, end game
      - if stay, continue to dealers turn
  - Dealers turn
    - if total is < 17
      - deal new card
      - display player and dealer hand
      - repeat until total >= 17 or bust
  - Detect and display winner
  */

const readline = require("readline-sync");

const MAX_HAND_VALUE = 21;
const MAX_DEALER_HIT_VALUE = 17;
const ACE_VALUE = 11;
const ACE_CORRECTION_VALUE = 10;
const FACE_CARD_VALUE = 10;

const MATCH_WIN_VALUE = 5;

let playerMatchScore = 0;
let dealerMatchScore = 0;

function greeting() {
  console.clear();
  console.log(
    `Welcome to TwentyOne! Here are the rules:\n\n1. To win, get as close to ${MAX_HAND_VALUE} without going over. \n\n2. If you go over ${MAX_HAND_VALUE}, you bust and you lose. \n\n3. Both player and dealer each start with a hand of two cards. \n\n4. The player goes first and can only see one of the dealer's cards. \n\n5. Choose to "hit" for another card or "stay" to make it the dealer's turn. \n\n6. The first player to ${MATCH_WIN_VALUE} games wins the match.\n\n`
  );
  console.log("Press any key to continue...");

  readline.keyIn();
  console.clear();
}

function initializeDeck() {
  const deckObj = {
    suit: ["H", "D", "S", "C"],
    values: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
  };

  let deck = [];

  for (let suitIndex = 0; suitIndex < deckObj["suit"].length; suitIndex++) {
    for (
      let valuesIndex = 0;
      valuesIndex < deckObj["values"].length;
      valuesIndex++
    ) {
      deck.push([deckObj["suit"][suitIndex], deckObj["values"][valuesIndex]]);
    }
  }
  debugger;

  return shuffle(deck);
}

function shuffle(deck) {
  for (let index = deck.length - 1; index > 0; index--) {
    let otherIndex = Math.floor(Math.random() * (index + 1)); // 0 to index
    [deck[index], deck[otherIndex]] = [deck[otherIndex], deck[index]]; // swap elements
  }

  return deck;
}

function drawCard(hand, deck) {
  hand.push(deck.pop());
}

function initialDraw(playersHand, dealersHand, deck) {
  drawCard(playersHand, deck);
  drawCard(dealersHand, deck);
  drawCard(playersHand, deck);
  drawCard(dealersHand, deck);
}

function sumTotal(cards) {
  // cards = [['D', 'J'], ['C', '7'], ...]
  let values = cards.map((value) => value[1]);
  let sumTotal = 0;

  for (let idx = 0; idx < cards.length; idx++) {
    let value = values[idx];
    if (value === "A") {
      sumTotal += ACE_VALUE;
    } else if (["K", "Q", "J"].includes(value)) {
      sumTotal += FACE_CARD_VALUE;
    } else {
      sumTotal += Number(value);
    }

    if (value === "A" && sumTotal > MAX_HAND_VALUE) {
      sumTotal -= ACE_CORRECTION_VALUE;
    }
  }

  return sumTotal;
}

function busted(cards) {
  return sumTotal(cards) > MAX_HAND_VALUE;
}

function displayCards(playersHand, dealersHand) {
  console.clear();
  let playersResult = ``;
  let dealersResult = ``;

  for (let idx = 0; idx < playersHand.length; idx++) {
    playersResult += playersHand[idx].join("");
    if (idx < playersHand.length - 1) playersResult += ", ";
  }

  for (let idx = 0; idx < dealersHand.length; idx++) {
    dealersResult += dealersHand[idx].join("");
    if (idx < dealersHand.length - 1) dealersResult += ", ";
  }

  console.log(`Player: ${playersResult} \nDealer: ${dealersResult}`);
}

function hitOrStay() {
  let answer = readline
    .question("Would you like to (h)it or (s)tay? ")
    .toLowerCase();

  while (answer !== "h" && answer !== "s") {
    answer = readline
      .question(
        "That's an invalid response. Would you like to (h)it or (s)tay? "
      )
      .toLowerCase();
  }

  return answer;
}

function playersTurn(playersHand, dealersHand, deck) {
  let choice;
  while (true) {
    displayCards(playersHand, dealersHand);
    choice = hitOrStay();

    if (choice === "h" && !busted(playersHand)) {
      drawCard(playersHand, deck);
    } else {
      break;
    }
  }
}

function dealersTurn(dealersHand, dealersTotal) {
  while (true) {
    if (dealersTotal >= MAX_DEALER_HIT_VALUE) break;
    drawCard(dealersHand);
    displayCards();
  }
}

function detectGameWinner(playersTotal, dealersTotal) {
  if (playersTotal > MAX_HAND_VALUE) {
    return "PLAYER_BUSTED";
  } else if (dealersTotal > MAX_HAND_VALUE) {
    return "DEALER_BUSTED";
  } else if (playersTotal > dealersTotal) {
    return "PLAYER";
  } else if (playersTotal < dealersTotal) {
    return "DEALER";
  } else {
    return "TIE";
  }
}

function displayGameWinner(playersTotal, dealersTotal) {
  let result = detectGameWinner(playersTotal, dealersTotal);

  switch (result) {
    case "PLAYER_BUSTED":
      console.log("You bust. Dealer wins this game.");
      break;
    case "DEALER_BUSTED":
      console.log("Dealer bust. You win this game.");
      break;
    case "PLAYER":
      console.log("You win this game.");
      break;
    case "DEALER":
      console.log("Dealer wins this game.");
      break;
    case "TIE":
      console.log("Tie game.");
  }
}

function incrementMatchScore(playerMatchScore, dealerMatchScore) {
  if (
    detectGameWinner() === "DEALER_BUSTED" ||
    detectGameWinner() === "PLAYER"
  ) {
    playerMatchScore += 1;
    return playerMatchScore;
  } else if (
    detectGameWinner() === "PLAYER_BUSTED" ||
    detectGameWinner() === "DEALER"
  ) {
    dealerMatchScore += 1;
    return dealerMatchScore;
  }

  return null;
}

function displayMatchScore(playerMatchScore, dealerMatchScore) {
  console.log("--------------------------------");
  console.log(`| Player: ${playerMatchScore} | ${dealerMatchScore} |`);
  console.log("--------------------------------");
}

function detectMatchWinner(playerMatchScore, dealerMatchScore) {
  if (playerMatchScore >= MATCH_WIN_VALUE) {
    return "Player";
  } else if (dealerMatchScore >= MATCH_WIN_VALUE) {
    return "Dealer";
  }

  return null;
}

function displayMatchWinner() {
  let winner = detectMatchWinner(playerMatchScore, dealerMatchScore);
  console.log(`${winner} has won the match!`);
}

function resetGame(playersHand, playersTotal, dealersHand, dealersTotal) {
  playersHand = [];
  dealersHand = [];
  playersTotal = 0;
  dealersTotal = 0;

  return [playersHand, playersTotal, dealersHand, dealersTotal];
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

/**********************
 * greeting
 * loop (match)
 * initialize deck
 * loop (game)
 * draw cards
 * display cards
 * players turn
 * dealers turn
 * determine winner
 * display game results
 * display match results
 * loop (game)
 * display match winner
 * ask to play again
 * loop (match)
 */

// greeting();

while (true) {
  let deck = initializeDeck();

  while (true) {
    let playersHand = [];
    let dealersHand = [];
    console.clear();
    initialDraw(playersHand, dealersHand, deck);

    let playersTotal = sumTotal(playersHand);
    let dealersTotal = sumTotal(dealersHand);

    playersTurn(playersHand, dealersHand, deck);
    playersTotal = sumTotal(playersHand);

    if (!busted(playersHand)) dealersTurn(dealersHand, dealersTotal);
    dealersTotal = sumTotal(dealersHand);

    displayGameWinner(playersTotal, dealersTotal);

    // incrementMatchScore(playerMatchScore, dealerMatchScore);
    // displayMatchScore(playerMatchScore, dealerMatchScore);

    // if (detectMatchWinner(playerMatchScore, dealerMatchScore)) {
    //   displayMatchWinner();
    // }
    dealersHand = [];
    playersHand = [];
  }
}
