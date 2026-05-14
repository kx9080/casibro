function preload() {
  gamblingAlwaysPays = loadImage("images/gamblingAlwaysPays.png");
  heartCardImages = [];
  spadeCardImages = [];
  diamondCardImages = [];
  cloverCardImages = [];
  spadeCardImages[1] = loadImage("images/Pikes_A_white.png");
  heartCardImages[1] = loadImage("images/Hearts_A_white.png");
  diamondCardImages[1] = loadImage("images/Tiles_A_white.png");
  cloverCardImages[1] = loadImage("images/Clovers_A_white.png");
  spadeCardImages[11] = loadImage("images/Pikes_Jack_white.png");
  heartCardImages[11] = loadImage("images/Hearts_Jack_white.png");
  diamondCardImages[11] = loadImage("images/Tiles_Jack_white.png");
  cloverCardImages[11] = loadImage("images/Clovers_Jack_white.png");
  spadeCardImages[12] = loadImage("images/Pikes_Queen_white.png");
  heartCardImages[12] = loadImage("images/Hearts_Queen_white.png");
  diamondCardImages[12] = loadImage("images/Tiles_Queen_white.png");
  cloverCardImages[12] = loadImage("images/Clovers_Queen_white.png");
  spadeCardImages[13] = loadImage("images/Pikes_King_white.png");
  heartCardImages[13] = loadImage("images/Hearts_King_white.png");
  diamondCardImages[13] = loadImage("images/Tiles_King_white.png");
  cloverCardImages[13] = loadImage("images/Clovers_King_white.png");
  backCardImage = loadImage("images/cardBack.png");
  for (var i = 2; i < 11; i++) {
    spadeCardImages[i] = loadImage(`images/Pikes_` + i + "_white.png");
    heartCardImages[i] = loadImage(`images/Hearts_` + i + "_white.png");
    diamondCardImages[i] = loadImage(`images/Tiles_` + i + "_white.png");
    cloverCardImages[i] = loadImage(`images/Clovers_` + i + "_white.png");
  }
  start = true;
} //end preloading of images

// found out how to sort from https://www.w3schools.com/js/js_array_sort.asp

function setup() {
  checkWindowSize();
  createCanvas(1200, 600, defaultCanvas0);
  background(0);
  imageMode(CENTER);
  strokeWeight(0);

  // Hold Em'
  riverDrawn = false;
  turnDrawn = false;
  flopDrawn = false;
  potAmount = 0;
  betAmount = 0;
  checkEnd = false;
  pot = 0;

  //Theming
  theme = "dark";
  const changeThemeBtn = document.getElementById("changeThemeBtn");
  changeThemeBtn.addEventListener("click", function () {
    changeTheme();
    console.log("changed");
  });

  unflashBang = false;
  fakeallCards = [2, 1, 6, 5, 4, 3];
  fakeallSuits = [2, 1, 6, 0];

  gameStarted = false;

  //Player variables
  fakePlayerCard = [1, 2];
  playerCard = [];
  suit = [];
  playerRoll = 0;
  cardValue = [];
  numberOfCards = 0;
  busted = false;
  stand = false;
  playerHasToCall = false;
  playerWinningNumber = 0;

  //Casino variables
  fakeCasinoCard = [3, 4, 5, 6, 7];
  casinoCard = [];
  casinoCards = [];
  casinoSuit = [];
  casinoSuits = [];
  casinoRoll = 0;
  casinoNumberOfCards = 1;
  casinoCardValue = [];
  cardsOnTable = 0;
  computerFold = 0;
  computerMoney = 5000;
  rectMode(CENTER);
  casinoStand = false;

  casinoWinningNumber = 0;

  firstPair = 0;
  start = true;
  game = "";
  blackjackStarted = false;
  flashOpacity = 0;
  flashOpacityImage = 0;

  // Catpuccin Mocha Base
  backgroundColor = color(30, 30, 46);
  // Catpuccin Mocha Text
  textColor = color(205, 214, 244);

  if (document.cookie != 5000) {
    loadMoneyFromCookies();
    loop();
    return;
  } else {
    playerMoney = 5000;
    loop();
    return;
  }
}

function checkWindowSize() {
  if (window.width < 1000 || window.height < 600) {
    window.alert("Make this window bigger for a better experience");
    print(window.width + " x " + window.height);
  }
}

function flashBang(unBang) {
  if (unBang === true) {
    tint(255, 0);
    return;
  }
  if (flashOpacity < 50) {
    fill(255, 255, 255, flashOpacity);
    rect(width / 2, height / 2, width, height);
    tint(255, flashOpacityImage);
    image(gamblingAlwaysPays, width / 2, height / 2, 498, 281);
    flashOpacity += 1;
    flashOpacityImage += 12.5;
    print(flashOpacity);
  }
}

function draw() {
  // Display the starting screen
  while (start === true) {
    backgroundColor = color(30, 30, 46);
    textColor = color(205, 214, 244);
    background(backgroundColor);
    fill(textColor);
    textAlign(CENTER);
    textStyle(BOLD);
    textFont("Ubuntu Mono Sans");

    fill(49, 50, 68);
    square(200, height / 2 + 15, 50);
    square(width - 200, height / 2 + 15, 50);

    fill(textColor);
    //Whitejack Title
    textSize(48);
    text("Whitejack", width - 200, height / 2 - 50);
    textSize(24);
    textFont("Arial");
    textStyle(NORMAL);
    text("[B]", width - 200, height / 2 + 20);

    //Texas Hold'em Title
    textSize(48);
    text("Texas Hold'em", 200, height / 2 - 50);
    textSize(24);
    text("[N]", 200, height / 2 + 20);

    text("Press [R] to reset\nHold' Em money", width / 2, height / 2);
    return;
  }

  // Start Texas Hold'em
  if (game === "texasHoldEm") {
    // https://www.w3schools.com/js/js_timing.asp
    setInterval(flashBang(), 10);

    while (flashOpacity < 50) {
      return;
    }

    if (gameStarted === false) {
      background(backgroundColor);
      for (let i = 0; i < 5; i++) {
        imageMode(CENTER);
        image(backCardImage, width / 2 - 200 + 100 * i, height / 2, 80, 120);
      }
      drawHoldEmCards();
      casinoDrawHoldEmCards();
      gameStarted = true;
    }

    fill(textColor);
    textSize(48);
    textAlign(CENTER);
    textStyle(BOLD);
    textFont("Ubuntu Mono Sans");
    text("Texas Hold Em", width / 2, 470);
    textSize(15);

    textStyle(NORMAL);

    // Display player money and pot amount
    rectMode(CENTER);
    fill(backgroundColor);
    rect(90, 20, 200, 40);

    fill(textColor);
    text("Player Money: $" + playerMoney, 100, 30);

    fill(backgroundColor);
    rect(width / 2, 20, 200, 40);

    fill(textColor);
    text("Pot Amount: $" + pot, width / 2, 30);

    strokeWeight(0);
    textFont("Bebas Neue");
    text("Press 'A' to bet", width / 2, 510);
    text("Press 'C' to continue", width / 2, 550);
    text("Press 'Q' to call bet", width / 2, 530);
    text("Press 'M' to change games", width / 2, 570);
    text("Press 'R'  to reset game", width / 2, 590);

    fill(49, 50, 68);
    square(100, 530, 75);
    square(200, 530, 75);

    square(1100, 530, 75);
    square(1000, 530, 75);

    fill(textColor);
    textSize(25);
    text("Bet", 100, 540);
    text("Check", 200, 540);
    text("Call", 1000, 540);
    text("Reset", 1100, 540);

    if (computerFold) {
      window.alert("Computer has folded. You win!");
      playerMoney += potAmount;
      resetToHoldEm();
    }
  }

  // Start Whitejack
  if (game === "blackjack") {
    // https://www.w3schools.com/js/js_timing.asp
    setInterval(flashBang(), 10);

    while (flashOpacity < 50) {
      return;
    }

    if (unflashBang === false) {
      background(backgroundColor);
      unflashBang = true;
    }

    fill(textColor);
    textSize(48);
    textAlign(CENTER);
    textStyle(BOLD);
    textFont("Ubuntu Mono Sans");
    text("Whitejack", width / 2, 470);

    textSize(15);
    textStyle(NORMAL);
    strokeWeight(0);
    textFont("Bebas Neue");

    text("Total:", 50, 275);
    text("Total:", 1000, 275);

    text("Press 'P' to draw first Player hand", width / 2, 510);
    text("Press 'O' to draw another Player card", width / 2, 550);
    text("Press 'W' to stand", width / 2, 530);
    text("Press 'R' to reset game", width / 2, 570);
    text("Press 'M' to change games", width / 2, 590);
    textSize(20);
    text("Casino Cards", width - 100, 90);
    text("Player Cards", 100, 90);

    fill(49, 50, 68);
    rectMode(CENTER);
    rect(200, height / 2 + 200, 200, 100, 5);
    rect(width - 200, height / 2 + 200, 200, 100, 5);
    if (blackjackStarted === false) {
      rect(width / 2, height / 2, 200, 100, 5);
      fill(textColor);
      text("Start", width / 2, height / 2);
    }
    fill(textColor);
    text("Stand", 200, height / 2 + 210);
    text("Hit", width - 200, height / 2 + 210);

    if (stand === true) {
      // Start casino play
      if (casinoRoll < 17 && playerRoll > casinoRoll) {
        // Casino must draw
        casinoStand = false;
        casinoNumberOfCards++;
        rollACasinoCard(casinoNumberOfCards);
        text(casinoRoll, width - 100, 275);
      } else if (casinoRoll === playerRoll) {
        // Casino must draw on tie
        rollACasinoCard(casinoNumberOfCards);
        casinoNumberOfCards++;
        text(casinoRoll, width - 100, 275);
      } else {
        // Casino stands
        casinoStand = true;
        fill(backgroundColor);
        rect(width - 150, 270, 100, 50);
        fill(textColor);
        text(casinoRoll, width - 100, 275);
      }
      if (casinoStand === true && casinoRoll > playerRoll && casinoRoll < 22) {
        text("Casino Wins", width / 2, height / 2 + 50);
        print("Casino Wins");
      }
      if (casinoRoll > 21) {
        text("Casino Busted! Player Wins!", width / 2, height / 2 + 50);
        print("Player Wins, casino over");
      } else if (casinoStand === true && casinoRoll < playerRoll) {
        text("Player Wins", width / 2, height / 2 + 50);
        print("Player Wins");
      } else {
        fill(backgroundColor);
        rect(width - 150, 270, 100, 50);
        fill(textColor);
        text(casinoRoll, width - 100, 275);
      }
      fill(backgroundColor);
      rect(width - 150, 270, 100, 50);
      fill(textColor);
      text(casinoRoll, width - 100, 275);
    }
  }
}

function keyPressed() {
  if (key === "w" || key === "W") {
    // Stands in blackjack
    if (blackjackStarted === true) {
      stand = true;
    } else {
      window.alert("You need to draw before standing.");
    }
  } else if (
    (key === "p" && stand === false && playerRoll === 0) ||
    (key === "P" && stand === false && playerRoll === 0)
  ) {
    if (game === "blackjack") {
      // Redraw background
      background(backgroundColor);

      blackjackStarted = true;

      // Reset
      playerRoll = 0;
      busted = false;

      // Roll first casino card
      rollACasinoCard(casinoNumberOfCards);

      // Roll first two player cards
      rollAPlayerCard(1);
      rollAPlayerCard(2);
      numberOfCards = 2;
      text(playerRoll, 150, 275);
    }
  } else if (
    (key === "o" && stand === false && numberOfCards >= 2) ||
    (key === "O" && stand === false && numberOfCards >= 2)
  ) {
    if (game === "blackjack") {
      // Draw another player card
      if (busted === true) {
        text(playerRoll, 150, 275);
        text(
          "You already busted! No more cards for you.",
          width / 2,
          height / 2 + 50,
        );
      } else {
        numberOfCards++;
        rollAPlayerCard(numberOfCards);
        fill(backgroundColor);
        rect(150, 270, 100, 50);
        fill(textColor);
        text(playerRoll, 150, 275);
      }
    }
  } else if (key === "m" || key === "M") {
    // Reset the game fully
    setup();
  } else if (key === "b" || key === "B") {
    if (start === false) {
      return;
    }
    // Start blackjack from start screen
    start = false;
    background(backgroundColor);
    game = "blackjack";
  } else if (key === "n" || key === "N") {
    if (start === false) {
      return;
    }

    // Start texas hold em from start screen
    start = false;
    background(backgroundColor);
    game = "texasHoldEm";
    for (let i = 0; i < 5; i++) {
      imageMode(CENTER);
      image(backCardImage, width / 2 - 200 + 100 * i, height / 2, 80, 120);
    }
    drawHoldEmCards();
    casinoDrawHoldEmCards();
  } else if (key === "c" || key === "C") {
    // Does checking and card drawing
    while (playerHasToCall === true) {
      if (game === "texasHoldEm") {
        // Call computer bet
        window.alert("You have to call the bet of " + betAmount + ".");
        return;
      }
    }
    if (game === "texasHoldEm") {
      if (flopDrawn === false) {
        if (random(1) < 0.3) {
          computerBet();
          return;
        }
        flop();
        flopDrawn = true;
      } else if (turnDrawn === false) {
        if (random(1) < 0.3) {
          computerBet();
          return;
        }
        turn();
        turnDrawn = true;
      } else if (riverDrawn === false) {
        if (random(1) < 0.3) {
          computerBet();
          return;
        }
        river();
        riverDrawn = true;
      } else if (checkEnd === false) {
        if (random(1) < 0.3) {
          computerBet();
          return;
          ``;
        }
        window.alert(
          "All community cards have been drawn, press C to end the game.",
        );
        checkEnd = true;
      } else {
        showCasinoCards();
        checkPlayerWinningNumber();
        checkCasinoWinningNumber();

        if (playerWinningNumber > casinoWinningNumber) {
          text("Player Wins", width / 2, height / 2 + 100);
          playerMoney += potAmount;
          saveMoneyToCookies();
          return;
        }

        if (playerWinningNumber < casinoWinningNumber) {
          text("Casino Wins", width / 2, height / 2 + 100);
          return;
        }
        if ((playerWinningNumber = casinoWinningNumber)) {
          if (playerCard[0] > playerCard[1]) {
            if (
              playerCard[0] > casinoCard[0] ||
              playerCard[0] > casinoCard[1]
            ) {
              if (playerWinningNumber > casinoWinningNumber) {
                text("Player Wins", width / 2, height / 2 + 100);
                print("PlayerWin");
                playerMoney += potAmount;
                saveMoneyToCookies();
                return;
              }
            } else {
              if (playerWinningNumber < casinoWinningNumber) {
                text("Casino Wins", width / 2, height / 2 + 100);
                print("CasinoWin");
                return;
              }
            }
          } else {
            if (
              playerCard[1] > casinoCard[0] ||
              playerCard[1] > casinoCard[1]
            ) {
              if (playerWinningNumber > casinoWinningNumber) {
                text("Player Wins", width / 2, height / 2 + 100);
                print("PlayerWin");
                playerMoney += potAmount;
                saveMoneyToCookies();
                return;
              }
            } else {
              if (playerWinningNumber < casinoWinningNumber) {
                text("Casino Wins", width / 2, height / 2 + 100);
                print("CasinoWin");
                return;
              }
            }
          }
        } else {
          print("im broken");
        }
      }
    }
  } else if (key === "q" || key === "Q") {
    // Calls the bet
    if (game === "texasHoldEm") {
      if (playerHasToCall) {
        callBet();
        playerHasToCall = false;
      } else {
        window.alert("You have no bet to call.");
      }
    }
  } else if (key === "a" || key === "A") {
    // Lets you bet
    if (game === "texasHoldEm") {
      while (playerHasToCall === true) {
        if (game === "texasHoldEm") {
          window.alert("You have to call the bet of " + betAmount + ".");
          return;
        }
      }
      bet();
    }
  } else if (key === "h" || key === "H") {
    // Fake function checks for testing
    fakeCheckForStraight();
    fakeCheckForFlush();
    fakeCheckForThree();
    fakeCheckForPair();
    fakeCheckForRoyalFlush();
    fakeCheckForStraightFlush();
    fakeCheckFor4Kind();
    fakeCheckFor2Pair();
    fakeCheckForFullHouse();
  } else if (key === "r") {
    if (game === "blackjack") {
      // Does what the function says
      resetToBlackjack();
    } else if (game === "texasHoldEm") {
      // Does what the function says
      resetToHoldEm();
    } else {
      // Reset Currency
      window.alert("Reseting your currency.");
      playerMoney = 5000;
      saveMoneyToCookies();
    }
  }
}

function mousePressed() {
  // Handles clicking for the various buttons
  print("MouseX " + mouseX + " MouseY " + mouseY);
  if (start === true) {
    if (mouseY > 295 && mouseY < 345) {
      if (mouseX > 180 && mouseX < 230) {
        print("hi");
        if (start === false) {
          return;
        }

        // Start texas hold em from start screen
        start = false;
        background(backgroundColor);
        game = "texasHoldEm";
        for (let i = 0; i < 5; i++) {
          imageMode(CENTER);
          image(backCardImage, width / 2 - 200 + 100 * i, height / 2, 80, 120);
        }
        drawHoldEmCards();
        casinoDrawHoldEmCards();
      }
      if (mouseX > 980 && mouseX < 1030) {
        if (start === false) {
          return;
        }
        // Start blackjack from start screen
        start = false;
        background(backgroundColor);
        game = "blackjack";
      }
    }
  }
  if (game === "blackjack") {
    if (mouseY > 450 && mouseY < 555) {
      if (mouseX > width - 300 && mouseX < width - 100) {
        if (stand === false && numberOfCards >= 2)
          if (busted === true) {
            // Draw another player card
            text(playerRoll, 150, 275);
            text(
              "You already busted! No more cards for you.",
              width / 2,
              height / 2 + 50,
            );
          } else {
            numberOfCards++;
            rollAPlayerCard(numberOfCards);
            fill(backgroundColor);
            rect(150, 270, 100, 50);
            fill(textColor);
            text(playerRoll, 150, 275);
          }
      } else if (mouseX > 100 && mouseX < 300) {
        if (blackjackStarted === true) {
          stand = true;
        } else {
          window.alert("You need to draw before standing.");
        }
      }
    }
    if (mouseY > 250 && mouseY < 350) {
      if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100) {
        // Redraw background
        background(backgroundColor);

        blackjackStarted = true;

        // Reset
        playerRoll = 0;
        busted = false;

        // Roll first casino card
        rollACasinoCard(casinoNumberOfCards);

        // Roll first two player cards
        rollAPlayerCard(1);
        rollAPlayerCard(2);
        numberOfCards = 2;
        text(playerRoll, 150, 275);
      }
    }
  }
  if (game === "texasHoldEm") {
    if (mouseY > 500 && mouseY < 575) {
      if (mouseX > 62.5 && mouseX < 140) {
        print("hello");
        if (game === "texasHoldEm") {
          while (playerHasToCall === true) {
            if (game === "texasHoldEm") {
              window.alert("You have to call the bet of " + betAmount + ".");
              return;
            }
          }
          print("nello");
          bet();
        }
      }
      if (mouseX > 162.5 && mouseX < 237.5) {
        while (playerHasToCall === true) {
          if (game === "texasHoldEm") {
            // Call computer bet
            window.alert("You have to call the bet of " + betAmount + ".");
            return;
          }
        }
        if (game === "texasHoldEm") {
          if (flopDrawn === false) {
            if (random(1) < 0.3) {
              computerBet();
              return;
            }
            flop();
            flopDrawn = true;
          } else if (turnDrawn === false) {
            if (random(1) < 0.3) {
              computerBet();
              return;
            }
            turn();
            turnDrawn = true;
          } else if (riverDrawn === false) {
            if (random(1) < 0.3) {
              computerBet();
              return;
            }
            river();
            riverDrawn = true;
          } else if (checkEnd === false) {
            if (random(1) < 0.3) {
              computerBet();
              return;
              ``;
            }
            window.alert(
              "All community cards have been drawn, press C to end the game.",
            );
            checkEnd = true;
          } else if (checkEnd === true) {
            showCasinoCards();

            checkPlayerWinningNumber();
            checkCasinoWinningNumber();

            print("Im Still Alive");

            if (playerWinningNumber > casinoWinningNumber) {
              text("Player Wins", width / 2, height / 2 + 100);
              playerMoney += potAmount;
              saveMoneyToCookies();
            }

            if (playerWinningNumber < casinoWinningNumber) {
              text("Casino Wins", width / 2, height / 2 + 100);
            }

            if ((playerWinningNumber = casinoWinningNumber)) {
              print("tied");
              if (playerCard[0] > playerCard[1]) {
                if (
                  playerCard[0] > casinoCard[0] ||
                  playerCard[0] > casinoCard[1]
                ) {
                  if (playerWinningNumber > casinoWinningNumber) {
                    text("Player Wins", width / 2, height / 2 + 100);
                    playerMoney += potAmount;
                    saveMoneyToCookies();
                    return;
                  }
                } else {
                  if (playerWinningNumber < casinoWinningNumber) {
                    text("Casino Wins", width / 2, height / 2 + 100);
                    return;
                  }
                }
              } else {
                if (
                  playerCard[1] > casinoCard[0] ||
                  playerCard[1] > casinoCard[1]
                ) {
                  if (playerWinningNumber > casinoWinningNumber) {
                    text("Player Wins", width / 2, height / 2 + 100);
                    playerMoney += potAmount;
                    saveMoneyToCookies();
                    return;
                  }
                } else {
                  if (playerWinningNumber < casinoWinningNumber) {
                    text("Casino Wins", width / 2, height / 2 + 100);
                    return;
                  }
                }
              }
              if (
                playerCard[1] === casinoCard[0] ||
                playerCard[1] === casinoCard[0] ||
                playerCard[0] === casinoCard[0] ||
                playerCard[0] === casinoCard[1]
              ) {
                text("It's a tie, giving money back.", width / 2);
                playerMoney += potAmount / 2;
                saveMoneyToCookies();
                return;
              }
            }
          }
        }
      }
      if (mouseX > 962.5 && mouseX < 1037.5) {
        if (game === "texasHoldEm") {
          if (playerHasToCall) {
            callBet();
            playerHasToCall = false;
          } else {
            window.alert("You have no bet to call.");
          }
        }
      }
      if (mouseX > 1062.5 && mouseX < 1137.5) {
        if (game === "blackjack") {
          resetToBlackjack();
        } else if (game === "texasHoldEm") {
          resetToHoldEm();
        } else {
          window.alert("No game to reset!");
        }
      }
    }
  }
}
//Blackjack functions

function bet() {
  // Lets you bet
  betAmount = int(window.prompt("Enter your bet amount:"));
  if (isNaN(betAmount) || betAmount <= 0 || betAmount > playerMoney) {
    window.alert("Invalid bet amount. Please enter a positive number.");
    return;
  }
  pot += betAmount;
  playerMoney -= betAmount;
  computerCallBet();
}

function computerBet() {
  // The computer is rich too
  betAmount = Math.floor(random(200, 1000));
  window.alert("The computer has bet " + betAmount + ".");
  pot += betAmount;
  computerMoney -= betAmount;
  playerHasToCall = true;
}

function computerCallBet() {
  // Computer bet handling
  if (betAmount > 1000) {
    window.alert("The computer folds your bet of " + betAmount + ".");
    computerFold = true;
    betAmount = 0;
    return;
  }
  if (betAmount < computerMoney) {
    window.alert("The computer has called your bet of " + betAmount + ".");
    computerMoney -= betAmount;
    pot += betAmount;
    betAmount = 0;
  } else {
    window.alert("The computer folds your bet of " + betAmount + ".");
    computerFold = true;
    betAmount = 0;
    return;
  }
}

function callBet() {
  // Calls computer bet
  if (playerMoney < betAmount) {
    window.alert("You don't have enough money.");
    return;
  }
  window.alert("You have called the bet of " + betAmount + ".");
  pot += betAmount;
  playerMoney -= betAmount;

  betAmount = 0;
}

function rollAPlayerCard(i) {
  // Roll player card and suit
  playerCard[i] = Math.floor(Math.random() * 13) + 1;
  suit[i] = Math.floor(Math.random() * 4) + 1;

  // Check for Ace and ask for desired value
  if (playerCard[i] === 1) {
    cardValue[i] = int(
      window.prompt(
        "You rolled an Ace! Would you like it to count as 1 or 11?",
      ),
    );
    if (cardValue[i] != 1 && cardValue[i] != 11) {
      window.alert("Invalid choice, Ace will count as 1.");
      cardValue[i] = 1;
    }
  }

  // Determine card value for face cards
  if (playerCard[i] > 1 && playerCard[i] < 11) {
    cardValue[i] = playerCard[i];
  } else if (playerCard[i] === 11) {
    cardValue[i] = 10;
  } else if (playerCard[i] === 12) {
    cardValue[i] = 10;
    text(casinoRoll, width - 100, 275);
  } else if (playerCard[i] === 13) {
    cardValue[i] = 10;
  }

  imageMode(CENTER);
  if (suit[i] === 1) {
    image(spadeCardImages[playerCard[i]], 100 * i, 180, 80, 120);
  } else if (suit[i] === 2) {
    image(heartCardImages[playerCard[i]], 100 * i, 180, 80, 120);
  } else if (suit[i] === 3) {
    image(diamondCardImages[playerCard[i]], 100 * i, 180, 80, 120);
  } else if (suit[i] === 4) {
    image(cloverCardImages[playerCard[i]], 100 * i, 180, 80, 120);
  }

  playerRoll += cardValue[i];
  print("This is player roll: " + i + " Value is: " + playerRoll);
  print(playerRoll);

  if (playerRoll > 21) {
    for (let j = 1; j <= numberOfCards; j++) {
      if (playerCard[j] === 1 && cardValue[j] === 11) {
        cardValue[j] = 1;
        playerRoll -= 10;
        fill(backgroundColor);
        rect(100, 250, 100, 50);
        fill(textColor);
        text(playerRoll, 150, 275);
        return;
      }
    }
    text("You Busted", width / 2, height / 2);
    rollACasinoCard(2);
    text(casinoRoll, width - 100, 275);
    busted = true;
  }
}

function rollACasinoCard(i) {
  casinoCard[i] = Math.floor(Math.random() * 13) + 1;
  casinoSuit[i] = Math.floor(Math.random() * 4) + 1;
  if (casinoCard[i] === 1) {
    if (casinoRoll + 11 > 21) {
      casinoCardValue[i] = 1;
    } else {
      casinoCardValue[i] = 11;
    }
  }
  //Assign Suits, plus a backup text system
  if (casinoSuit[i] === 1) {
    text("Spade", 1200 - 100 * i, 150);
  } else if (casinoSuit[i] === 2) {
    text("Heart", 1200 - 100 * i, 150);
  } else if (casinoSuit[i] === 3) {
    text("Diamond", 1200 - 100 * i, 150);
  } else if (casinoSuit[i] === 4) {
    text("Club", 1200 - 100 * i, 150);
  }
  // Handle face cards
  if (casinoCard[i] > 1 && casinoCard[i] < 11) {
    text(casinoCard[i], 1200 - 100 * i, 200);
    casinoCardValue[i] = casinoCard[i];
  } else if (casinoCard[i] === 11) {
    text("Jack", 1200 - 100 * i, 200);
    casinoCardValue[i] = 10;
  } else if (casinoCard[i] === 12) {
    text("Queen", 1200 - 100 * i, 200);
    casinoCardValue[i] = 10;
  } else if (casinoCard[i] === 13) {
    text("King", 1200 - 100 * i, 200);
    casinoCardValue[i] = 10;
  } else if (casinoCard[i] === 1) {
    text("Ace", 1200 - 100 * i, 200);
  }
  // Images
  if (casinoSuit[i] === 1) {
    image(spadeCardImages[casinoCard[i]], width - 100 * i, 180, 80, 120);
  } else if (casinoSuit[i] === 2) {
    image(heartCardImages[casinoCard[i]], width - 100 * i, 180, 80, 120);
  } else if (casinoSuit[i] === 3) {
    image(diamondCardImages[casinoCard[i]], width - 100 * i, 180, 80, 120);
  } else if (casinoSuit[i] === 4) {
    image(cloverCardImages[casinoCard[i]], width - 100 * i, 180, 80, 120);
  }
  casinoRoll += casinoCardValue[i];
  text(casinoRoll, width - 100, 275);
  print(playerRoll);
}

function flop() {
  // Draw first 3 cards
  fill(textColor);
  textSize(48);
  textAlign(CENTER);
  imageMode(CENTER);

  for (let i = 0; i < 3; i++) {
    casinoCards[i] = Math.floor(Math.random() * 13) + 1;
    casinoSuits[i] = Math.floor(Math.random() * 4) + 1;

    print(casinoCards[i]);
    print(casinoSuits[i]);

    if (casinoSuits[i] === 1) {
      print("Spade");
      image(
        spadeCardImages[casinoCards[i]],
        width / 2 - 200 + 100 * i,
        height / 2,
        80,
        120,
      );
    } else if (casinoSuits[i] === 2) {
      print("Heart");
      image(
        heartCardImages[casinoCards[i]],
        width / 2 - 200 + 100 * i,
        height / 2,
        80,
        120,
      );
    } else if (casinoSuits[i] === 3) {
      print("Diamond");
      image(
        diamondCardImages[casinoCards[i]],
        width / 2 - 200 + 100 * i,
        height / 2,
        80,
        120,
      );
    } else if (casinoSuits[i] === 4) {
      print("Club");
      image(
        cloverCardImages[casinoCards[i]],
        width / 2 - 200 + 100 * i,
        height / 2,
        80,
        120,
      );
    }
  }
  // Roll player card and suit
}

function turn() {
  // Draw the 4th card
  casinoCards[3] = Math.floor(Math.random() * 13) + 1;
  casinoSuits[3] = Math.floor(Math.random() * 4) + 1;

  print(casinoCards[3]);
  print(casinoSuits[3]);

  if (casinoSuits[3] === 1) {
    print("Spade");
    image(
      spadeCardImages[casinoCards[3]],
      width / 2 - 200 + 100 * 3,
      height / 2,
      80,
      120,
    );
  } else if (casinoSuits[3] === 2) {
    print("Heart");
    image(
      heartCardImages[casinoCards[3]],
      width / 2 - 200 + 100 * 3,
      height / 2,
      80,
      120,
    );
  } else if (casinoSuits[3] === 3) {
    print("Diamond");
    image(
      diamondCardImages[casinoCards[3]],
      width / 2 - 200 + 100 * 3,
      height / 2,
      80,
      120,
    );
  } else if (casinoSuits[3] === 4) {
    print("Club");
    image(
      cloverCardImages[casinoCards[3]],
      width / 2 - 200 + 100 * 3,
      height / 2,
      80,
      120,
    );
  }
}

function river() {
  // Draw the 5th card
  casinoCards[4] = Math.floor(Math.random() * 13) + 1;
  casinoSuits[4] = Math.floor(Math.random() * 4) + 1;

  print(casinoCards[4]);
  print(casinoSuits[4]);

  if (casinoSuits[4] === 1) {
    print("Spade");
    image(
      spadeCardImages[casinoCards[4]],
      width / 2 - 200 + 100 * 4,
      height / 2,
      80,
      120,
    );
  } else if (casinoSuits[4] === 2) {
    print("Heart");
    image(
      heartCardImages[casinoCards[4]],
      width / 2 - 200 + 100 * 4,
      height / 2,
      80,
      120,
    );
  } else if (casinoSuits[4] === 3) {
    print("Diamond");
    image(
      diamondCardImages[casinoCards[4]],
      width / 2 - 200 + 100 * 4,
      height / 2,
      80,
      120,
    );
  } else if (casinoSuits[4] === 4) {
    print("Club");
    image(
      cloverCardImages[casinoCards[4]],
      width / 2 - 200 + 100 * 4,
      height / 2,
      80,
      120,
    );
  }
}

function drawHoldEmCards() {
  for (var i = 0; i < 2; i++) {
    fill(textColor);
    textSize(48);
    textAlign(CENTER);
    imageMode(CENTER);

    // Roll player card and suit
    playerCard[i] = Math.floor(Math.random() * 13) + 1;
    suit[i] = Math.floor(Math.random() * 4) + 1;

    // Determine card value for face cards
    if (playerCard[i] < 11) {
      cardValue[i] = playerCard[i];
    } else if (playerCard[i] === 11) {
      cardValue[i] = 10;
    } else if (playerCard[i] === 12) {
      cardValue[i] = 10;
    } else if (playerCard[i] === 13) {
      cardValue[i] = 10;
    }

    // Actually display the cards
    imageMode(CENTER);
    if (suit[i] === 1) {
      image(spadeCardImages[playerCard[i]], 100 + 100 * i, 380, 80, 120);
    } else if (suit[i] === 2) {
      image(heartCardImages[playerCard[i]], 100 + 100 * i, 380, 80, 120);
    } else if (suit[i] === 3) {
      image(diamondCardImages[playerCard[i]], 100 + 100 * i, 380, 80, 120);
    } else if (suit[i] === 4) {
      image(cloverCardImages[playerCard[i]], 100 + 100 * i, 380, 80, 120);
    }
  }
}

function casinoDrawHoldEmCards() {
  for (var i = 0; i < 2; i++) {
    fill(textColor);
    textSize(48);
    textAlign(CENTER);
    imageMode(CENTER);

    // Roll casino card and suit
    casinoCard[i] = Math.floor(Math.random() * 13) + 1;
    casinoSuit[i] = Math.floor(Math.random() * 4) + 1;

    // Determine card value for face cards
    if (casinoCard[i] < 11) {
      casinoCardValue[i] = casinoCard[i];
    } else if (casinoCard[i] === 11) {
      casinoCardValue[i] = 10;
    } else if (casinoCard[i] === 12) {
      casinoCardValue[i] = 10;
    } else if (casinoCard[i] === 13) {
      casinoCardValue[i] = 10;
    }

    image(backCardImage, width - 100 - 100 * i, 380, 80, 120);
  }
}

function showCasinoCards() {
  // Shows the cards at the end of the game for casino
  imageMode(CENTER);
  for (var i = 0; i < casinoCard.length; i++) {
    if (casinoSuit[i] === 1) {
      image(
        spadeCardImages[casinoCard[i]],
        width - 100 - 100 * i,
        380,
        80,
        120,
      );
    } else if (casinoSuit[i] === 2) {
      image(
        heartCardImages[casinoCard[i]],
        width - 100 - 100 * i,
        380,
        80,
        120,
      );
    } else if (casinoSuit[i] === 3) {
      image(
        diamondCardImages[casinoCard[i]],
        width - 100 - 100 * i,
        380,
        80,
        120,
      );
    } else if (casinoSuit[i] === 4) {
      image(
        cloverCardImages[casinoCard[i]],
        width - 100 - 100 * i,
        380,
        80,
        120,
      );
    }
  }
}

// Texas Hold'em functions for checking hands

function checkForPair(inputCard1, inputCard2) {
  if (inputCard1 === inputCard2) {
    print("Pair!");
    return true;
  } else {
    print("playerCards");
    for (var i = 0; i < casinoCards.length; i++) {
      if (casinoCards[i] === inputCard1 || casinoCards[i] === inputCard2) {
        print("Pair!");
        return true;
      }
    }
  }
  return false;
}

function checkForStraight(inputCard1, inputCard2) {
  // Still have to figure this out
  var allCards = [];
  allCards.push(inputCard1);
  allCards.push(inputCard2);
  for (var i = 0; i < casinoCards.length; i++) {
    allCards.push(casinoCards[i]);
  }
  // found out how to sort from https://www.w3schools.com/js/js_array_sort.asp
  allCards.sort(function (a, b) {
    return a - b;
  });

  for (var j = 0; j < allCards.length - 4; j++) {
    if (
      allCards[j] + 1 === allCards[j + 1] &&
      allCards[j] + 2 === allCards[j + 2] &&
      allCards[j] + 3 === allCards[j + 3] &&
      allCards[j] + 4 === allCards[j + 4]
    ) {
      print("Straight!");
      return true;
    }
  }
  return false;
}

//Three of a kind
function newThree(inputCard1, inputCard2) {
  var allCards = [];
  allCards.push(inputCard1);
  allCards.push(inputCard2);
  for (var i = 0; i < casinoCards.length; i++) {
    allCards.push(casinoCards[i]);
  }
  // found out how to sort from https://www.w3schools.com/js/js_array_sort.asp
  allCards.sort(function (a, b) {
    return a - b;
  });

  for (var j = 0; j < allCards.length - 2; j++) {
    if (allCards[j] === allCards[j + 1] && allCards[j] === allCards[j + 2]) {
      print("Three of a Kind!");
      return true;
    }
  }
  return false;
}

function checkForFlush(inputSuit1, inputSuit2) {
  var allSuits = [];

  // Count suits for player card 1
  if (inputSuit1 === 1) {
    allSuits[1] += 1;
  } else if (inputSuit1 === 2) {
    allSuits[2] += 1;
  } else if (inputSuit1 === 3) {
    allSuits[3] += 1;
  } else if (inputSuit1 === 4) {
    allSuits[4] += 1;
  }

  // Count suits for player card 2
  if (inputSuit2 === 1) {
    allSuits[1] += 1;
  } else if (inputSuit2 === 2) {
    allSuits[2] += 1;
  } else if (inputSuit2 === 3) {
    allSuits[3] += 1;
  } else if (inputSuit2 === 4) {
    allSuits[4] += 1;
  }

  // Count suits for community cards
  for (var i = 0; i < casinoSuits.length; i++) {
    if (casinoSuits[i] === 1) {
      allSuits[1] += 1;
    } else if (casinoSuits[i] === 2) {
      allSuits[2] += 1;
    } else if (casinoSuits[i] === 3) {
      allSuits[3] += 1;
    } else if (casinoSuits[i] === 4) {
      allSuits[4] += 1;
    }
  }

  // Check for flush
  for (var j = 1; j <= 4; j++) {
    if (allSuits[j] >= 5) {
      print("Flush!");
      return true;
    }
  }
  return false;
}

function checkForRoyalFlush(inputCard1, inputCard2, inputSuit1, inputSuit2) {
  var allSuits = [];
  var allCards = [];

  if (inputSuit1 === 1) {
    allSuits[1] += 1;
  } else if (inputSuit1 === 2) {
    allSuits[2] += 1;
  } else if (inputSuit1 === 3) {
    allSuits[3] += 1;
  } else if (inputSuit1 === 4) {
    allSuits[4] += 1;
  }

  if (inputSuit2 === 1) {
    allSuits[1] += 1;
  } else if (inputSuit2 === 2) {
    allSuits[2] += 1;
  } else if (inputSuit2 === 3) {
    allSuits[3] += 1;
  } else if (inputSuit2 === 4) {
    allSuits[4] += 1;
  }

  allCards.push(inputCard1);
  allCards.push(inputCard2);

  // Count suits for community cards
  for (var i = 0; i < casinoSuits.length; i++) {
    if (casinoSuits[i] === 1) {
      allSuits[1] += 1;
    } else if (casinoSuits[i] === 2) {
      allSuits[2] += 1;
    } else if (casinoSuits[i] === 3) {
      allSuits[3] += 1;
    } else if (casinoSuits[i] === 4) {
      allSuits[4] += 1;
    }
    allCards.push(casinoCards[i]);
  }

  for (var i = 0; i <= 4; i++) {
    if (
      allCards[i] != 10 &&
      allCards[i + 1] != 11 &&
      allCards[i + 2] != 12 &&
      allCards[i + 3] != 13 &&
      allCards[i + 4] != 1
    ) {
      print("No Royal Flush");
      return false;
    } else {
      for (var i = 1; i <= 4; i++) {
        if (allSuits[i] >= 5) {
          print("Royal Flush!");
          return true;
        }
      }
    }
    return false;
  }
}

function checkForStraightFlush(inputSuit1, inputSuit2, inputCard1, inputCard2) {
  var allSuits = [];
  var allCards = [];

  allCards.push(inputCard1);
  allCards.push(inputCard2);
  for (var i = 0; i < casinoCards.length; i++) {
    allCards.push(casinoCards[i]);
  }
  // found out how to sort from https://www.w3schools.com/js/js_array_sort.asp
  allCards.sort(function (a, b) {
    return a - b;
  });

  if (inputSuit1 === 1) {
    allSuits[1] += 1;
  } else if (inputSuit1 === 2) {
    allSuits[2] += 1;
  } else if (inputSuit1 === 3) {
    allSuits[3] += 1;
  } else if (inputSuit1 === 4) {
    allSuits[4] += 1;
  }

  if (inputSuit2 === 1) {
    allSuits[1] += 1;
  } else if (inputSuit2 === 2) {
    allSuits[2] += 1;
  } else if (inputSuit2 === 3) {
    allSuits[3] += 1;
  } else if (inputSuit2 === 4) {
    allSuits[4] += 1;
  }

  // Count suits for community cards
  for (var i = 0; i < casinoSuits.length; i++) {
    if (casinoSuits[i] === 1) {
      allSuits[1] += 1;
    } else if (casinoSuits[i] === 2) {
      allSuits[2] += 1;
    } else if (casinoSuits[i] === 3) {
      allSuits[3] += 1;
    } else if (casinoSuits[i] === 4) {
      allSuits[4] += 1;
    }
  }

  for (var j = 0; j <= 4; j++) {
    // Check for flush first
    if (allSuits[j] >= 5) {
      for (var d = 0; j < allCards.length - 4; d++) {
        // Then check for straight
        if (
          allCards[d] + 1 === allCards[d + 1] &&
          allCards[d] + 2 === allCards[d + 2] &&
          allCards[d] + 3 === allCards[d + 3] &&
          allCards[d] + 4 === allCards[d + 4]
        ) {
          print("Fake Straight Flush!");
          return true;
        }
      }
    }
  }
  return false;
}

function checkFor2Pair(inputCard1, inputCard2) {
  var allCards = [];
  allCards.push(inputCard1);
  allCards.push(inputCard2);
  for (var i = 0; i < casinoCards.length; i++) {
    allCards.push(casinoCards[i]);
  }
  // found out how to sort from https://www.w3schools.com/js/js_array_sort.asp
  allCards.sort(function (a, b) {
    return a - b;
  });

  var pairCount = 0;

  for (var j = 0; j < allCards.length - 1; j++) {
    if (allCards[j] === allCards[j + 1]) {
      pairCount++;
      j++;
    }
  }

  if (pairCount >= 2) {
    print("Two Pair!");
    return true;
  }
  return false;
}

function checkFor4Kind(inputCard1, inputCard2) {
  var allCards = [];
  allCards.push(inputCard1);
  allCards.push(inputCard2);
  for (var i = 0; i < casinoCards.length; i++) {
    allCards.push(casinoCards[i]);
  }
  // found out how to sort from https://www.w3schools.com/js/js_array_sort.asp
  allCards.sort(function (a, b) {
    return a - b;
  });

  for (var j = 0; j < allCards.length - 3; j++) {
    if (
      allCards[j] === allCards[j + 1] &&
      allCards[j] === allCards[j + 2] &&
      allCards[j] === allCards[j + 3]
    ) {
      print("Four of a Kind!");
      return true;
    }
  }
  return false;
}

function checkForFullHouse(inputCard1, inputCard2) {
  var allCards = [];

  allCards.push(inputCard2);
  allCards.push(inputCard1);

  for (var i = 0; i < casinoCards.length; i++) {
    allCards.push(casinoCards[i]);
  }

  allCards.sort(function (a, b) {
    return a - b;
  });

  for (var j = 0; j < allCards.length - 2; j++) {
    if (allCards[j] === allCards[j + 1] && allCards[j] === allCards[j + 2]) {
      var usedPair = allCards[j];
      for (var i = 0; i <= allCards.length - 1; i++) {
        if (usedPair != allCards[i] && allCards[i] === allCards[i + 1]) {
          return true;
        }
      }
    }
  }
  return false;
}

// Fake functions for testing

function fakeCheckForFullHouse() {
  var fakeAllCards = [2, 4, 2, 4, 4, 8, 6];
  var fakeUsedPair;

  fakeAllCards.sort(function (a, b) {
    return a - b;
  });

  for (var j = 0; j < fakeAllCards.length - 2; j++) {
    if (
      fakeAllCards[j] === fakeAllCards[j + 1] &&
      fakeAllCards[j] === fakeAllCards[j + 2]
    ) {
      var fakeUsedPair = fakeAllCards[j];
      for (var i = 0; i <= fakeAllCards.length - 1; i++) {
        if (
          fakeUsedPair != fakeAllCards[i] &&
          fakeAllCards[i] === fakeAllCards[i + 1]
        ) {
          print("Fake Full House!");
        }
      }
    }
  }
}

function fakeCheckForRoyalFlush() {
  var fakeallSuits = [5, 0, 0, 0];
  var fakeAllCards = [10, 11, 12, 13, 1];
  for (var i = 0; i <= 4; i++) {
    if (
      fakeAllCards[i] != 10 &&
      fakeAllCards[i + 1] != 11 &&
      fakeAllCards[i + 2] != 12 &&
      fakeAllCards[i + 3] != 13 &&
      fakeAllCards[i + 4] != 1
    ) {
      return false;
    } else {
      for (var i = 0; i <= 4; i++) {
        if (fakeallSuits[i] >= 5) {
          print("Fake Royal Flush!");
          return true;
        }
      }
    }
    return false;
  }
}

function fakeCheckForStraightFlush() {
  var fakeallSuits = [5, 0, 0, 0];
  var fakeallCards = [6, 4, 5, 3, 2];

  // Sort the cards
  fakeallCards.sort(function (a, b) {
    return a - b;
  });

  // Check for straight flush

  for (var j = 0; j <= 4; j++) {
    // Check for flush first
    if (fakeallSuits[j] >= 5) {
      for (var d = 0; j < fakeallCards.length - 4; d++) {
        // Then check for straight
        if (
          fakeallCards[d] + 1 === fakeallCards[d + 1] &&
          fakeallCards[d] + 2 === fakeallCards[d + 2] &&
          fakeallCards[d] + 3 === fakeallCards[d + 3] &&
          fakeallCards[d] + 4 === fakeallCards[d + 4]
        ) {
          print("Fake Straight Flush!");
          return true;
        }
      }
    }
  }
  return false;
}

function fakeCheckFor4Kind() {
  var fakeAllCards = [9, 3, 9, 9, 2, 9, 5];
  // found out how to sort from https://www.w3schools.com/js/js_array_sort.asp
  fakeAllCards.sort(function (a, b) {
    return a - b;
  });

  for (var j = 0; j < fakeAllCards.length - 3; j++) {
    if (
      fakeAllCards[j] === fakeAllCards[j + 1] &&
      fakeAllCards[j] === fakeAllCards[j + 2] &&
      fakeAllCards[j] === fakeAllCards[j + 3]
    ) {
      print("Four of a Kind!");
      return true;
    }
  }
  return false;
}

function fakeCheckForFlush() {
  var fakeallSuits = [5, 0, 0, 0, 0];
  // Check for flush
  for (var j = 0; j <= 4; j++) {
    if (fakeallSuits[j] >= 5) {
      print("Fake Flush!");
      return true;
    }
  }
  return false;
}

function fakeCheckForStraight() {
  // Still have to figure this out
  var fakeallCards = [2, 1, 6, 5, 4, 3];
  // found out how to sort from https://www.w3schools.com/js/js_array_sort.asp
  fakeallCards.sort(function (a, b) {
    return a - b;
  });

  for (var j = 0; j < fakeallCards.length - 4; j++) {
    if (
      fakeallCards[j] + 1 === fakeallCards[j + 1] &&
      fakeallCards[j] + 2 === fakeallCards[j + 2] &&
      fakeallCards[j] + 3 === fakeallCards[j + 3] &&
      fakeallCards[j] + 4 === fakeallCards[j + 4]
    ) {
      print("Fake Straight!");
      return true;
    }
  }
  return false;
}

function fakeCheckForThree() {
  var fakeAllCards = [1, 2, 2, 4, 5, 2, 6];
  // found out how to sort from https://www.w3schools.com/js/js_array_sort.asp
  fakeAllCards.sort(function (a, b) {
    return a - b;
  });

  for (var j = 0; j < fakeAllCards.length - 2; j++) {
    if (
      fakeAllCards[j] === fakeAllCards[j + 1] &&
      fakeAllCards[j] === fakeAllCards[j + 2]
    ) {
      print("Fake Three of a Kind!");
      return true;
    }
  }
}

function fakeCheckFor2Pair() {
  allCards = [2, 3, 4, 2, 5, 3, 6];

  allCards.sort(function (a, b) {
    return a - b;
  });

  var pairCount = 0;

  for (var j = 0; j < allCards.length - 1; j++) {
    if (allCards[j] === allCards[j + 1]) {
      pairCount++;
      j++;
    }
  }

  if (pairCount >= 2) {
    print("Fake Two Pair!");
    return true;
  }
  return false;
}

function fakeCheckForPair() {
  var fakePlayerCard = [1, 2];
  var fakeCasinoCard = [2, 4, 5, 6, 7];

  if (fakePlayerCard[0] === fakePlayerCard[1]) {
    print("Fake Pair!");
    return true;
  } else {
    for (var i = 0; i < fakeCasinoCard.length; i++) {
      if (
        fakeCasinoCard[i] === fakePlayerCard[0] ||
        fakeCasinoCard[i] === fakePlayerCard[1]
      ) {
        print("Fake Pair!");
        return true;
      }
    }
  }
  return false;
}

function checkPlayerWinningNumber() {
  // Do all the checks
  if (checkForPair(playerCard[0], playerCard[1])) {
    playerWinningNumber = 1;
    print("pair");
  } else {
    playerWinningNumber = 0;
  }
  if (checkFor2Pair(playerCard[0], playerCard[1])) {
    playerWinningNumber = 2;
    print("2pair");
  }
  if (newThree(playerCard[0], playerCard[1])) {
    playerWinningNumber = 3;
    print("3pair");
  }
  if (checkForStraight(playerCard[0], playerCard[1])) {
    playerWinningNumber = 4;
    print("straight");
  }
  if (checkForFlush(suit[0], suit[1])) {
    playerWinningNumber = 5;
    print("flush");
  }
  if (checkForFullHouse(playerCard[0], playerCard[1])) {
    playerWinningNumber = 6;
    print("full house");
  }
  if (checkFor4Kind(playerCard[0], playerCard[1])) {
    playerWinningNumber = 7;
    print("4kind");
  }
  if (checkForStraightFlush(suit[0], suit[1], playerCard[0], playerCard[1])) {
    playerWinningNumber = 8;
    print("straightFlush");
  }
  if (checkForRoyalFlush(suit[0], suit[1], playerCard[0], playerCard[1])) {
    playerWinningNumber = 9;
    print("royalFlush");
  }
}

function checkCasinoWinningNumber() {
  // Do all the checks
  if (checkForPair(casinoCard[0], casinoCard[1])) {
    casinoWinningNumber = 1;
    print("pair");
  } else {
    casinoWinningNumber = 0;
  }
  if (checkFor2Pair(casinoCard[0], casinoCard[1])) {
    casinoWinningNumber = 2;
    print("2pair");
  }
  if (newThree(casinoCard[0], casinoCard[1])) {
    casinoWinningNumber = 3;
    print("3pair");
  }
  if (checkForStraight(casinoCard[0], casinoCard[1])) {
    casinoWinningNumber = 4;
    print("straight");
  }
  if (checkForFlush(casinoSuit[0], casinoSuit[1])) {
    casinoWinningNumber = 5;
    print("flush");
  }
  if (checkForFullHouse(casinoCard[0], casinoCard[1])) {
    casinoWinningNumber = 6;
    print("full house");
  }
  if (checkFor4Kind(casinoCard[0], casinoCard[1])) {
    casinoWinningNumber = 7;
    print("4kind");
  }
  if (
    checkForStraightFlush(
      casinoSuit[0],
      casinoSuit[1],
      casinoCard[0],
      casinoCard[1],
    )
  ) {
    casinoWinningNumber = 8;
    print("straightFlush");
  }
  if (
    checkForRoyalFlush(
      casinoSuit[0],
      casinoSuit[1],
      casinoCard[0],
      casinoCard[1],
    )
  ) {
    casinoWinningNumber = 9;
    print("royalFlush");
  }
}

//

function saveMoneyToCookies() {
  //Save to cookie
  document.cookie = playerMoney;
}

function loadMoneyFromCookies() {
  //Load from cookie
  playerMoney = document.cookie;
}

function resetToBlackjack() {
  setup();
  if (start === false) {
    return;
  }
  // Start blackjack from start screen
  start = false;
  background(backgroundColor);
  game = "blackjack";
}

function resetToHoldEm() {
  // Start texas hold em from start screen
  setup();
  start = false;
  background(backgroundColor);
  game = "texasHoldEm";
  for (let i = 0; i < 5; i++) {
    imageMode(CENTER);
    image(backCardImage, width / 2 - 200 + 100 * i, height / 2, 80, 120);
  }
  drawHoldEmCards();
  casinoDrawHoldEmCards();
}

function changeTheme() {
  if (theme === "dark") {
    theme = "light";
    loadTheme();
  } else {
    theme = "dark";
    loadTheme();
  }
}

function loadTheme() {
  //Basic CSS manipulation
  if (theme === "dark") {
    console.log("dark");
    document.getElementById("main").style.backgroundColor = "rgb(30, 30, 46)";
  } else {
    console.log("light");
    document.getElementById("main").style.backgroundColor =
      "rgb(255, 255, 255)";
  }
}
