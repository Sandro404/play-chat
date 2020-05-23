import React, { PureComponent } from "react";
import { Card } from "./Card.js";

class CardStack extends PureComponent {
  render() {
    const { cards } = this.props;

    return cards.map((card) => (
      <Card
        key={card.id}
        card={card}
        isStacked={true}
        extraCardStyles={{
          transform: card.transform,
          position: "absolute",
          marginLeft: -28,
        }}
      />
    ));
  }
}

export default CardStack;
