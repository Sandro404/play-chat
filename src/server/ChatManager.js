module.exports = class ChatManager {
  waitingClient = null;
  chats = [];

  addClient(socket) {
    const { waitingClient, closeChat, chats } = this;

    if (!waitingClient) this.waitingClient = socket;
    else {
      this.chats = [...chats, new Chat([waitingClient, socket], closeChat)];
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
    this.members = members;
    this.closeChat = closeChat;
    this.id = Math.random().toString(36).substring(7);
    this.start();
  }

  start() {
    const { id, members, closeChat, initializeGame, stopGame } = this;

    members.forEach((member, playerNumber) => {
      let otherMember = members[playerNumber === 0 ? 1 : 0];
      member.on("disconnect", () => closeChat(id, otherMember));
      member.emit("startChat");
      member.on("chatResponse", (text) =>
        otherMember.emit("chatResponse", text)
      );
      member.on("initializeGame", initializeGame);
      member.on("stopGame", stopGame);
    });
  }

}
