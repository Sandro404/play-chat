import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import React, { PureComponent } from "react";

class OpponentCardDeck extends PureComponent {
  render() {
    const {
      classes: { opponentCard, opponentCardOpacity, opponentCardDeck },
      opponentCardsCount,
      isPlayingSocket,
    } = this.props;

    return (
      <div className={opponentCardDeck}>
        {Array(opponentCardsCount)
          .fill(1)
          .map((x, i) => (
            <div
              key={`opponent_card_deck_card_${i}`}
              className={classNames({
                [opponentCard]: true,
                [opponentCardOpacity]: isPlayingSocket,
              })}
            ></div>
          ))}
      </div>
    );
  }
}

const customStyles = (theme) => ({
  opponentCard: {
    position: "relative",
    float: "left",
    display: "inline-block",
    backgroundColor: "grey",
    height: 25,
    width: 17.5,
    margin: 3,
    borderRadius: "1px 5px",
    fontSize: "2.5em",
    fontFamily: "Roboto",
    fontWeight: "bold",
    transition: "all .2s ease-in-out",
  },
  opponentCardDeck: {
    width: 175,
    height: 100,
    marginLeft: 20,
    position: "absolute",
  },
  opponentCardOpacity: { opacity: 0.6 },
});

export default withStyles(customStyles)(OpponentCardDeck);
