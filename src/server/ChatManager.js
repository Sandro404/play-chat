let ColorAndNumbers = require("./games/ColorAndNumber");

module.exports = class ChatManager {
  waitingClient = null;
  chats = [];

  addClient(socket, name) {
    const { closeChat, chats } = this;

    const onWaitingClientDisconnect = () => (this.waitingClient = null);
    socket.name = name;
    if (!this.waitingClient) {
      socket.on("disconnect", onWaitingClientDisconnect);
      this.waitingClient = socket;
    } else {
      this.waitingClient.removeListener(
        "disconnect",
        onWaitingClientDisconnect
      );
      this.chats = [
        ...chats,
        new Chat([this.waitingClient, socket], closeChat),
      ];
      this.waitingClient = null;
    }
  }

  closeChat = (chat, member) => {
    const { chats } = this;

    member.emit("stopChat");
    this.chats = chats.filter((chatElement) => chatElement.id !== chat.id);
  };
};

class Chat {
  constructor(members, closeChat) {
    const { generateId } = this;

    this.members = members;
    this.closeChat = closeChat;
    this.gameListenerList = [];
    this.id = generateId();
    this.start();
  }

  start() {
    const { id, members, closeChat, initializeGame, stopGame } = this;

    members.forEach((member, playerNumber) => {
      let otherMember = members[playerNumber === 0 ? 1 : 0];
      member.on("disconnect", () => closeChat(id, otherMember));
      member.emit("startChat", otherMember.name);
      member.on("chatResponse", (text) =>
        otherMember.emit("chatResponse", text)
      );
      member.on("initializeGame", initializeGame);
      member.on("stopGame", stopGame);
    });
  }

  initializeGame = (gameKey) => {
    const { game } = this;

    if (!game) {
      this.gameKey = gameKey;
      let Game = { COLOR_AND_NUMBER: ColorAndNumbers }[gameKey];
      this.game = new Game(
        this.members[0],
        this.members[1],
        this.startGame,
        this.triggerGameEvent,
        this.registerGameEventListener
      );
    }
  };

  stopGame = () => {
    const { members, game, gameListenerList } = this;

    members.forEach((member) => member.emit("gameClosed"));
    game.resetPlayers();
    this.game = undefined;
    gameListenerList.forEach(({ event, callback }) =>
      members.forEach((member) => {
        member.removeListener(event, callback);
        this.gameListenerList = this.gameListenerList.filter(
          (listener) => listener.event !== event
        );
      })
    );
  };

  startGame = (gameOptionsPlayer0, gameOptionsPlayer1) => {
    const { gameKey, members } = this;

    members.forEach((member, playerNumber) =>
      member.emit(
        "startGame",
        playerNumber == 0 ? gameOptionsPlayer0 : gameOptionsPlayer1,
        gameKey
      )
    );
  };

  triggerGameEvent = (player, key, data) => {
    const { gameKey } = this;

    player.emit(gameKey + "_" + key, data);
  };

  registerGameEventListener = (player, key, callback) => {
    const { gameKey, gameListenerList } = this;

    let event = gameKey + "_" + key;
    player.on(event, callback);
    this.gameListenerList = [...gameListenerList, { event, callback }];
  };

  generateId = () => Math.random().toString(36).substring(7);
}
