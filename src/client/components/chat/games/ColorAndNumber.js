import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import React, { PureComponent } from "react";
import {
  CardDeck,
  CardStack,
  DrawCard,
  GameNotification,
  OpponentCardDeck,
} from "./ColorAndNumber/index.js";

class ColorAndNumber extends PureComponent {
  state = { game: undefined };

  componentDidMount() {
    const { gameOptions, registerGameEventListener } = this.props;
    const { onOpponentCardsCountChange, onPlayedCard } = this;

    [
      {
        key: "opponentCardsCountChange",
        callback: (data) => onOpponentCardsCountChange(data),
      },
      {
        key: "playedCard",
        callback: (data) => onPlayedCard(data),
      },
      {
        key: "opponentWins",
        callback: () => this.setState({ showLoseScreen: true }),
      },
      {
        key: "playerWins",
        callback: () => this.setState({ showWinScreen: true }),
      },
    ].forEach(({ key, callback }) => registerGameEventListener(key, callback));

    this.setState({ game: { ...gameOptions, cardStack: [] } });
  }

  onOpponentCardsCountChange = ({ opponentCardsCount }) => {
    const { game } = this.state;

    this.setState({ game: { ...game, opponentCardsCount } });
  };

  onPlayedCard = ({ card, newOpponentCardsCount }, hasPlayedCard) => {
    const { game } = this.state;
    const { cardStack, deck, opponentCardsCount } = game;

    this.setState({
      showWinScreen: false,
      showLoseScreen: false,
      game: {
        ...game,
        opponentCardsCount: newOpponentCardsCount || opponentCardsCount,
        cardStack: [...cardStack, card],
        isPlayingSocket: !hasPlayedCard,
        deck: hasPlayedCard ? deck.filter(({ id }) => id !== card.id) : deck,
      },
    });
  };

  render() {
    const { game, showWinScreen, showLoseScreen } = this.state;
    const { playCard, drawCard } = this;
    const {
      showFullscreenChat,
      startRematch,
      exitGame,
      classes: { gameContainer, reduceOpacity, upperGameArea },
    } = this.props;
    const {
      deck,
      isPlayingSocket,
      startingCard,
      cardStack = [],
      opponentCardsCount,
    } = game;

    return (
      <div classname={gameContainer}>
        {(showWinScreen || showLoseScreen) && (
          <GameNotification
            text={showWinScreen ? "You win!" : "You lose!"}
            okButton={{ text: "Rematch", onClick: startRematch }}
            cancelButton={{ text: "Exit game", onClick: exitGame }}
          />
        )}
        <div
          className={classNames({
            [upperGameArea]: true,
            [reduceOpacity]: showWinScreen || showLoseScreen,
          })}
        >
          <OpponentCardDeck
            opponentCardsCount={opponentCardsCount}
            isPlayingSocket={isPlayingSocket}
          />
          <CardStack cards={[startingCard, ...cardStack]} />
          <DrawCard drawCard={drawCard} />
        </div>
        <CardDeck
          showFullscreenChat={showFullscreenChat}
          deck={deck}
          playCard={playCard}
          opacity={showWinScreen || showLoseScreen ? 0.3 : 1}
          isPlayingSocket={isPlayingSocket}
        />
      </div>
    );
  }

  playCard = (card) => () => {
    const { triggerGameEvent } = this.props;
    const { onPlayedCard } = this;

    triggerGameEvent("playCard", card, () => onPlayedCard({ card }, true));
  };

  drawCard = () => {
    const { game } = this.state;
    const { triggerGameEvent } = this.props;
    const { deck } = game;

    triggerGameEvent("drawCard", {}, (card) => {
      this.setState({ game: { ...game, deck: [...deck, card] } });
    });
  };
}

const customStyles = () => ({
  gameContainer: { position: "relative" },
  upperGameArea: { height: 130, paddingTop: 16 },
  reduceOpacity: { opacity: 0.3 },
});

export default withStyles(customStyles)(ColorAndNumber);
