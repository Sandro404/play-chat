import { Button, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import React, { Component } from "react";

class Message extends Component {
  render() {
    const {
      alignLeft,
      classes,
      latestMessage,
      firstMessage,
      text,
      isSystemMessage,
      isButton,
      button,
    } = this.props;

    return isButton ? (
      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        onClick={button.onClick}
      >
        {button.text}
      </Button>
    ) : (
      <div
        className={classNames({
          [classes.userMessage]: true,
          [classes.marginTop]: firstMessage,
          [classes.marginBottom]: latestMessage,
          [classes.alignLeft]: alignLeft,
          [classes.systemMessage]: isSystemMessage,
        })}
      >
        <Typography variant="body1">{text}</Typography>
      </div>
    );
  }
}

const customStyles = () => ({
  button: { marginBottom: 16 },
  systemMessage: {
    float: "none !IMPORTANT",
    textAlign: "center !IMPORTANT",
    backgroundColor: "white !IMPORTANT",
    maxWidth: "100% !IMPORTANT",
    border: "0 !IMPORTANT",
    color: "#556677",
    letterSpacing: "0.08em",
    "& p": { fontWeight: 300 },
  },
  userMessage: {
    position: "relative",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    maxWidth: "65%",
    float: "right",
    padding: 8,
    marginTop: 4,
    marginBottom: 4,
    borderRadius: 4,
    backgroundColor: "#e8ebfa",
    textAlign: "left",
  },
  alignLeft: { float: "left", backgroundColor: "white" },
  marginTop: { marginTop: 8 },
  marginBottom: { marginBottom: 8 },
});

export default withStyles(customStyles)(Message);
