module.exports = class ColorAndNumber {
  constructor(
    player1,
    player2,
    startGame,
    triggerGameEvent,
    registerGameEventListener
  ) {
    this.player1 = player1;
    this.player2 = player2;
    this.startGame = startGame;
    this.triggerGameEvent = triggerGameEvent;
    this.registerGameEventListener = registerGameEventListener;
    this.initializeGame();
  }

  getGameOptions = (playerNumber) => {
    const { currentPlayerNumber, startingCard, player1, player2 } = this;

    return {
      deck: playerNumber == 0 ? player1.deck : player2.deck,
      isPlayingSocket: currentPlayerNumber == playerNumber,
      startingCard,
      opponentCardsCount: 8,
    };
  };

  resetPlayers = () => {
    this.player1.deck = undefined;
    this.player2.deck = undefined;
  };

  initializeGame() {
    let {
      player1,
      player2,
      startGame,
      getGameOptions,
      generateStarterDeck,
      generateCard,
      registerGameEventListener,
      triggerGameEvent,
    } = this;

    // initialize parameters
    player1.deck = generateStarterDeck();
    player2.deck = generateStarterDeck();
    this.startingCard = generateCard();
    this.playedCards = [this.startingCard];
    this.currentPlayerNumber = Math.random() < 0.5 ? 0 : 1;

    // create events
    [player1, player2].forEach((player, playerNumber) => {
      let opponent = playerNumber == 0 ? player2 : player1;

      // request to draw card
      registerGameEventListener(player, "drawCard", (data, onNewCard) => {
        const card = generateCard();
        player.deck = [...player.deck, card];
        triggerGameEvent(opponent, "opponentCardsCountChange", {
          opponentCardsCount: player.deck.length,
        });
        onNewCard(card);
      });

      // request to play card
      registerGameEventListener(player, "playCard", (card, onPlayedCard) => {
        const { color, text } = card;
        const { playedCards, currentPlayerNumber } = this;

        // if it's this player's turn
        if (currentPlayerNumber == playerNumber) {
          // check if card can be played on latest card
          const lastPlayedCard = playedCards[playedCards.length - 1];
          let cardAllowed =
            lastPlayedCard.color === color ||
            lastPlayedCard.text === text ||
            text === "+4";

          // check if user has card in deck
          let checkId = (obj) => obj.id === card.id;
          let cardInDeck = player.deck.some(checkId);

          if (cardAllowed && cardInDeck) {
            // play card
            this.playedCards.push(card);
            this.currentPlayerNumber = playerNumber === 1 ? 0 : 1;
            player.deck = player.deck.filter(({ id }) => id !== card.id);
            triggerGameEvent(opponent, "playedCard", {
              card,
              newOpponentCardsCount: player.deck.length,
            });
            onPlayedCard(card);
            if (player.deck.length === 0) {
              // player wins
              triggerGameEvent(player, "playerWins");
              triggerGameEvent(opponent, "opponentWins");
            }
          }
        }
      });
    });

    // start game
    startGame(getGameOptions(0), getGameOptions(1));
  }

  generateStarterDeck = () => new Array(8).fill(1).map(this.generateCard);

  generateCard = () => {
    const { generateId, getRandomCardTransformation } = this;

    return {
      id: generateId(),
      transform: getRandomCardTransformation(),
      color: ["RED", "BLUE", "GREEN", "YELLOW"][Math.round(Math.random() * 3)],
      text: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "+2", "+4"][
        Math.round(Math.random() * 10)
      ],
    };
  };

  getRandomCardTransformation = () =>
    "rotate(" +
    (140 - Math.random() * 140) +
    "deg) translate(" +
    (20 - Math.random() * 20) +
    "px, " +
    (20 - Math.random() * 20) +
    "px)";

  generateId = () => Math.random().toString(36).substring(7);
};
