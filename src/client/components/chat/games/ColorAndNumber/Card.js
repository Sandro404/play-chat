import { withStyles } from "@material-ui/core/styles";
import React, { PureComponent } from "react";
var classNames = require("classnames");

class Card extends PureComponent {
  render() {
    const {
      isPlayingSocket,
      playCard,
      card: { id, text, color },
      classes,
      isStacked,
      extraCardStyles,
      showFullscreenChat,
    } = this.props;

    return (
      <div
        key={id}
        style={{ backgroundColor: color, ...extraCardStyles }}
        className={classNames({
          [classes.card]: true,
          [classes.cardHover]: !isStacked && isPlayingSocket,
          [classes.cardOpacity]: !isStacked && !isPlayingSocket,
          [classes.miniVersion]: showFullscreenChat,
        })}
        onClick={playCard}
      >
        {text}
      </div>
    );
  }
}

class DrawCard extends PureComponent {
  render() {
    const { classes, drawCard } = this.props;

    return (
      <div
        key={"draw_card"}
        className={classNames({
          [classes.card]: true,
          [classes.cardHover]: true,
          [classes.drawCard]: true,
        })}
        onClick={drawCard}
      >
        <span className={classes.drawCardText}>{"Draw card"}</span>
      </div>
    );
  }
}

const customStyles = (theme) => ({
  card: {
    lineHeight: "100px",
    display: "inline-block",
    margin: 4,
    border: "3px solid rgba(0, 0, 0, 0.6)",
    borderTopLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    width: 70,
    height: 100,
    fontSize: "2.5em",
    fontFamily: "Roboto",
    fontWeight: "bold",
    webkitTouchCallout: "none",
    webkitUserSelect: "none",
    khtmlUserSelect: "none",
    mozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
  },
  miniVersion: {
    lineHeight: "80px",
    width: 56,
    height: 80,
    borderTopLeftRadius: 3.2,
    borderBottomRightRadius: 3.2,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    fontSize: "2em",
  },
  cardHover: {
    transition: "all .2s ease-in-out",
    "&:hover": {
      transform: "translateY(-15px)",
      boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
      cursor: "pointer",
    },
  },
  cardOpacity: {
    opacity: 0.6,
  },
  drawCard: {
    fontSize: "2em",
    right: 0,
    position: "absolute",
    marginRight: 20,
    backgroundColor: "white",
    fontWeight: "normal",
  },
  drawCardText: {
    display: "inline-block",
    marginTop: 20,
    lineHeight: 1.3,
  },
});

DrawCard = withStyles(customStyles)(DrawCard);
Card = withStyles(customStyles)(Card);

export { Card, DrawCard };
