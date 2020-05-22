import React, { Component } from "react";
class App extends Component {
  state = {
    screen: "LOGIN",
    otherMemberName: "",
  };

  componentDidMount() {
    const { socket } = this.props;
    socket.on("startChat", (otherMemberName) =>
      this.setState({ screen: "CHAT", otherMemberName })
    );
  }
  render() {
    return ""
  }
}

export default App;
