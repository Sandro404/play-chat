import React, { PureComponent } from "react";
import ColorAndNumber from "./ColorAndNumber";

class Game extends PureComponent {
  gameListenerList = [];

  render() {
    const { socket, gameKey, showFullscreenChat, gameOptions } = this.props;
    const {
      registerGameEventListener,
      triggerGameEvent,
      startRematch,
      exitGame,
    } = this;

    const GameComponent = { COLOR_AND_NUMBER: ColorAndNumber }[gameKey];
    return (
      <GameComponent
        gameOptions={gameOptions}
        socket={socket}
        registerGameEventListener={registerGameEventListener}
        triggerGameEvent={triggerGameEvent}
        startRematch={startRematch}
        exitGame={exitGame}
        showFullscreenChat={showFullscreenChat}
      />
    );
  }

  startRematch = () => {
    const { exitGame } = this;
    const { socket, gameKey } = this.props;

    exitGame();
    socket.emit("initializeGame", gameKey);
  };

  exitGame = () => {
    const { socket } = this.props;
    const { gameListenerList } = this;

    gameListenerList.forEach(({ event, callback }) =>
      socket.removeListener(event, callback)
    );
    this.gameListenerList = [];
    socket.emit("stopGame");
  };

  registerGameEventListener = (key, callback) => {
    const { socket, gameKey } = this.props;
    const { gameListenerList } = this;

    let event = gameKey + "_" + key;
    socket.on(gameKey + "_" + key, callback);
    this.gameListenerList = [...gameListenerList, { event, callback }];
  };

  triggerGameEvent = (key, data, callback) => {
    const { socket, gameKey } = this.props;

    socket.emit(gameKey + "_" + key, data, callback);
  };
}
export default Game;
