import { Divider, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import React, { Component, Fragment } from "react";
import Game from "./games/Game";
import { GameSelection, Message, MessageInput } from "./messenger/index";

class Chat extends Component {
  initialState = { chat: [], game: undefined, gameOptions: undefined };
  state = this.initialState;

  componentDidMount() {
    const { exit } = this;
    const { socket, otherMemberName } = this.props;
    const { chat } = this.state;

    socket.on("stopChat", () =>
      this.setState({
        chat: [
          ...chat,
          { isSystemMessage: true, text: `${otherMemberName} left.` },
          { isButton: true, button: { text: "Join new chat", onClick: exit } },
        ],
      })
    );
    socket.on("chatResponse", (text) =>
      this.setState({ chat: [...this.state.chat, { isResponse: true, text }] })
    );
    socket.on("startGame", (gameOptions, game) =>
      this.setState({ game, gameOptions }, () =>
        this.setState({
          chat: [
            ...this.state.chat,
            { isSystemMessage: true, text: `Game '${game}' has started.` },
          ],
        })
      )
    );
    socket.on("gameClosed", () =>
      this.setState({ game: undefined, gameOptions: undefined })
    );
  }

  scrollToNewestMessage = () => {
    let element = document.getElementById("chat-container");
    element.scrollTop = element.scrollHeight - element.clientHeight;
  };

  initializeGame = (gameKey) => {
    const { socket } = this.props;

    socket.emit("initializeGame", gameKey);
  };

  render() {
    const { initializeGame, onSend, scrollToNewestMessage } = this;
    const { chat, game, gameOptions } = this.state;
    const {
      showFullscreenChat,
      otherMemberName,
      socket,
      classes: { messagesContainer, fullWidth, partialWidth, margin },
    } = this.props;

    const titlebar = (
      <Fragment>
        <Typography variant="h6">{otherMemberName}</Typography>
        <Divider />
      </Fragment>
    );

    const messages = (
      <Grid container>
        {chat.map(
          (
            { isResponse, text, isSystemMessage, button, isButton },
            counter
          ) => (
            <Grid item key={`CHAT_${counter}`} xs={12}>
              <Message
                firstMessage={counter === 0}
                latestMessage={counter === chat.length - 1}
                alignLeft={isResponse}
                isSystemMessage={isSystemMessage}
                text={text}
                button={button}
                isButton={isButton}
              />
            </Grid>
          )
        )}
        {game && gameOptions && (
          <Grid item xs={12}>
            <Divider />
            <Game
              gameKey={game}
              gameOptions={gameOptions}
              socket={socket}
              showFullscreenChat={showFullscreenChat}
            />
          </Grid>
        )}
      </Grid>
    );

    const messageInput = (
      <MessageInput onSend={onSend} showFullscreenChat={showFullscreenChat}>
        <GameSelection
          initializeGame={initializeGame}
          scrollToNewestMessage={scrollToNewestMessage}
        />
      </MessageInput>
    );

    return (
      <div
        className={classNames({
          [fullWidth]: showFullscreenChat,
          [partialWidth]: !showFullscreenChat,
          [margin]: true,
        })}
      >
        <div>{titlebar}</div>
        <div id="chat-container" className={messagesContainer}>
          {messages}
        </div>
        <div>{messageInput}</div>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { chat: prevChat, game: prevGame } = prevState;
    const { chat, game } = this.state;
    const { scrollToNewestMessage } = this;

    if (prevChat.length !== chat.length || prevGame !== game)
      scrollToNewestMessage();
  }

  onSend = (text) => {
    const { chat } = this.state;
    const { socket } = this.props;

    this.setState({ chat: [...chat, { text }] });
    socket.emit("chatResponse", text);
  };

  exit = () => {
    const { joinChat } = this.props;
    const { initialState } = this;

    this.setState(initialState);
    joinChat();
  };
}

const customStyles = () => ({
  messagesContainer: {
    overflow: "auto",
    minHeight: 100,
    maxHeight: "calc(95vh - 132px)",
  },
  fullWidth: { width: "100%" },
  partialWidth: { width: 750 },
  margin: { margin: 8 },
});

export default withStyles(customStyles)(Chat);
