import { Button, InputAdornment, OutlinedInput } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import React, { Component } from "react";

class MessageInput extends Component {
  state = { inputValue: "" };

  _handleKeyDown = (e) => {
    if (e.key === "Enter") this.onSend();
  };

  render() {
    const { onSend, _handleKeyDown } = this;
    const { inputValue } = this.state;
    const {
      children,
      classes: { buttonStyle, fullWidth, inputWidth },
    } = this.props;

    return (
      <div classname={fullWidth}>
        <OutlinedInput
          classname={inputWidth}
          color="primary"
          placeholder="Type a message"
          className="TextField-without-border-radius"
          value={inputValue}
          onChange={(e) => this.setState({ inputValue: e.target.value })}
          endAdornment={
            <InputAdornment position="end">{children}</InputAdornment>
          }
          onKeyDown={_handleKeyDown}
        />
        <Button
          classname={buttonStyle}
          disableElevation
          variant="contained"
          color="primary"
          onClick={onSend}
        >
          <SendIcon />
        </Button>
      </div>
    );
  }

  onSend = () => {
    const { onSend } = this.props;
    const { inputValue } = this.state;

    this.setState({ inputValue: "" });
    onSend(inputValue);
  };
}

const customStyles = (theme) => ({
  buttonStyle: {
    width: "64px",
    height: "56px",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginTop: -5,
  },
  fullWidth: { width: "100%" },
  inputWidth: { width: "calc(100% - 64px)" },
});

export default withStyles(customStyles)(MessageInput);
