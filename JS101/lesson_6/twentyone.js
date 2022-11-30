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
  console.log("**********************************************************************");
  console.log(
    `Welcome to TwentyOne! \n\nHere are the rules:\n\n1. To win, get as close to ${MAX_HAND_VALUE} without going over. \n\n2. If you go over ${MAX_HAND_VALUE}, you bust and you lose. \n\n3. Both player and dealer each start with a hand of two cards. \n\n4. The player goes first and can only see one of the dealer's cards. \n\n5. Choose to "hit" for another card or "stay" to make it the dealer's turn. \n\n6. The first player to ${MATCH_WIN_VALUE} games wins the match.\n\n`
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

  for (let idx = 0; idx < values.length; idx++) {
    let value = values[idx];
    if (["K", "Q", "J"].includes(value)) {
      sumTotal += FACE_CARD_VALUE;
    } else if (value === "A") {
      sumTotal += ACE_VALUE;
    } else {
      sumTotal += Number(value);
    }
  }

  values.filter(value => value === 'A').forEach(_ => {
    if (sumTotal > MAX_HAND_VALUE) sumTotal -= ACE_CORRECTION_VALUE;
  });

  return sumTotal;
}

function busted(cards) {
  debugger;
  return sumTotal(cards) > MAX_HAND_VALUE;
}

function displayCards(playersHand, dealersHand, conceal) {
  console.clear();

  let playersResult = ``;
  let dealersResult = ``;

  for (let idx = 0; idx < playersHand.length; idx++) {
    playersResult += playersHand[idx].join("");
    if (idx < playersHand.length - 1) playersResult += ", ";
  }

  if (conceal) {
    dealersResult = `(??), ${dealersHand[1].join("")}`;
  } else {
    for (let idx = 0; idx < dealersHand.length; idx++) {
      dealersResult += dealersHand[idx].join("");
      if (idx < dealersHand.length - 1) dealersResult += ", ";
    }

    dealersResult += ` (\x1b[32m${sumTotal(dealersHand)}\x1b[0m)`;
  }

  console.log(`Player: ${playersResult} (\x1b[32m${sumTotal(playersHand)}\x1b[0m) \nDealer: ${dealersResult}`);
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
  displayCards(playersHand, dealersHand, true);

  while (true) {
    let choice = hitOrStay();

    debugger;
    if (choice === "h" && !busted(playersHand)) {
      drawCard(playersHand, deck);
      displayCards(playersHand, dealersHand, true);
    } else if (choice === "s" || busted(playersHand)) {
      break;
    }

    if (busted(playersHand)) break;
  }

}

function dealersTurn(playersHand, dealersHand, deck) {
  while (true) {
    let dealersTotal = sumTotal(dealersHand);

    if (dealersTotal >= MAX_DEALER_HIT_VALUE) break;

    drawCard(dealersHand, deck);
    displayCards(playersHand, dealersHand);
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
  } else if (playersTotal === dealersTotal) {
    return "TIE";
  } else {
    return null;
  }
}

function displayGameWinnerHelper(pHand, dHand, message) {
  displayCards(pHand, dHand);
  console.log(`${message}`);
}

function displayGameWinner(pHand, dHand, pTotal, dTotal) {
  let result = detectGameWinner(pTotal, dTotal);

  switch (result) {
    case "PLAYER_BUSTED":
      displayGameWinnerHelper(pHand, dHand, "You bust. Dealer wins this game.");
      break;
    case "DEALER_BUSTED":
      displayGameWinnerHelper(pHand, dHand, "Dealer bust. You win this game.");
      break;
    case "PLAYER":
      displayGameWinnerHelper(pHand, dHand, "You win this game.");
      break;
    case "DEALER":
      displayGameWinnerHelper(pHand, dHand, "Dealer wins this game.");
      break;
    case "TIE":
      displayGameWinnerHelper(pHand, dHand, "Tie game.");
  }
}

function incrementMatchScore(playersTotal, dealersTotal) {
  if (
    detectGameWinner(playersTotal, dealersTotal) === "DEALER_BUSTED" ||
    detectGameWinner(playersTotal, dealersTotal) === "PLAYER"
  ) {
    playerMatchScore += 1;
  } else if (
    detectGameWinner(playersTotal, dealersTotal) === "PLAYER_BUSTED" ||
    detectGameWinner(playersTotal, dealersTotal) === "DEALER"
  ) {
    dealerMatchScore += 1;
  }
}

function displayMatchScore(playerMatchScore, dealerMatchScore) {
  console.log("-------------------------------");
  console.log(`|   Player: ${playerMatchScore}  |  Dealer: ${dealerMatchScore}   |`);
  console.log("-------------------------------");
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
  console.log("****************************");
  console.log(`${winner} has won the match!`);
  console.log("****************************");
}

function playAnotherMatch() {
  let answer = readline
    .question("Would you like to play another match? (y or n) ")
    .toLowerCase();

  while (answer !== "y" && answer !== "n") {
    answer = readline
      .question(
        "That's an invalid response. Would you like to play another match? (y or n) "
      )
      .toLowerCase();
  }

  if (answer === "y") return "Yes";

  return null;
}

// Main Program

greeting();

while (true) { // match loop
  let deck = initializeDeck();

  while (true) { // game loop
    console.clear();
    let playersHand = [];
    let dealersHand = [];
    let dealersTotal = 0;
    let playersTotal = 0;

    initialDraw(playersHand, dealersHand, deck);

    playersTurn(playersHand, dealersHand, deck);
    playersTotal = sumTotal(playersHand);

    if (!busted(playersHand)) dealersTurn(playersHand, dealersHand, deck);
    dealersTotal = sumTotal(dealersHand);

    displayGameWinner(playersHand, dealersHand, playersTotal, dealersTotal);

    incrementMatchScore(playersTotal, dealersTotal);

    displayMatchScore(playerMatchScore, dealerMatchScore);

    if (detectMatchWinner(playerMatchScore, dealerMatchScore)) {
      displayMatchWinner();
      break;
    }

    console.log("Press any key for next game...");
    readline.keyIn();
  }

  if (!playAnotherMatch()) break;

  playerMatchScore = 0;
  dealerMatchScore = 0;
}

console.clear();
console.log(`Thanks for playing TwentyOne!`);
console.log("Press any key to exit...");
readline.keyIn();
console.clear();