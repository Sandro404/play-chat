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
  }

};
