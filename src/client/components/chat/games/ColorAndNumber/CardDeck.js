import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import React, { PureComponent } from "react";
import { Card } from "./Card";

class CardDeck extends PureComponent {
  render() {
    const {
      classes: { cardDeck, miniVersion },
      deck,
      playCard,
      opacity,
      isPlayingSocket,
      showFullscreenChat,
    } = this.props;

    return (
      <div
        style={{ opacity }}
        className={classNames({
          [cardDeck]: true,
          [miniVersion]: showFullscreenChat,
        })}
      >
        {deck.map((card) => (
          <Card
            key={card.id}
            card={card}
            isPlayingSocket={isPlayingSocket}
            playCard={playCard(card)}
            showFullscreenChat={showFullscreenChat}
          />
        ))}
      </div>
    );
  }
}

const customStyles = (theme) => ({
  cardDeck: {
    width: "100%",
    maxHeight: 270,
    overflow: "auto",
    paddingTop: 12,
    paddingBottom: 12,
  },
  miniVersion: {
    maxHeight: "180 !IMPORTANT",
  },
});

export default withStyles(customStyles)(CardDeck);
