import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import React, { Component } from "react";
import { Chat, Login, WaitingRoom } from "./components";

class App extends Component {
  state = {
    screen: "LOGIN",
    showFullscreenChat: false,
    otherMemberName: "",
    name: undefined,
  };

  componentDidMount() {
    const { socket } = this.props;
    const { updateWidth } = this;

    socket.on("startChat", (otherMemberName) =>
      this.setState({ screen: "CHAT", otherMemberName })
    );
    window.addEventListener("resize", updateWidth);
    this.setState({ showFullscreenChat: window.innerWidth < 480 });
  }

  updateWidth = () => {
    clearTimeout(this.updateWidthTimeout);
    this.updateWidthTimeout = setTimeout(() => {
      this.setState({ showFullscreenChat: window.innerWidth < 480 });
    }, 200);
  };

  updateName = (e) => this.setState({ name: e.target.value });

  render() {
    const { joinChat, exitChat, updateName } = this;
    const { screen, showFullscreenChat, otherMemberName, name } = this.state;
    const { classes, socket } = this.props;

    const chat = (
      <Chat
        joinChat={joinChat}
        exitChat={exitChat}
        socket={socket}
        showFullscreenChat={showFullscreenChat}
        otherMemberName={otherMemberName}
      />
    );

    return (
      <div className={classes.appContainer}>
        {showFullscreenChat && screen === "CHAT" ? (
          chat
        ) : (
          <Paper
            elevation={3}
            className={classNames({
              [classes.mainPaperStyle]: true,
              [classes.mainPaperCenterVertically]: screen !== "CHAT",
            })}
          >
            {
              {
                LOGIN: (
                  <Login
                    joinChat={joinChat}
                    updateName={updateName}
                    name={name}
                  />
                ),
                WAITING_ROOM: <WaitingRoom />,
                CHAT: chat,
              }[screen]
            }
          </Paper>
        )}
      </div>
    );
  }

  joinChat = () => {
    const { socket } = this.props;
    const { name } = this.state;

    this.setState({ screen: "WAITING_ROOM" });
    socket.emit("joinChat", name);
  };
}

const customStyles = (theme) => ({
  appContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  mainPaperStyle: {
    position: "fixed",
    zIndex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 4,
    top: 16,
  },
  mainPaperCenterVertically: {
    top: "30%",
  },
});

export default withStyles(customStyles)(App);
