import { Button, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import React, { Component, Fragment } from "react";

class Login extends Component {
  render() {
    const {
      classes: { smallMarginTop, smallMarginBottom, defaultMargin },
      joinChat,
      name,
      updateName,
    } = this.props;

    return (
      <Fragment>
        <TextField
          className={classNames(smallMarginBottom, defaultMargin)}
          variant="outlined"
          label="Your name"
          value={name}
          onChange={updateName}
        />
        <br />
        <Button
          className={classNames(smallMarginTop, defaultMargin)}
          variant="contained"
          color="primary"
          onClick={joinChat}
        >
          Let's talk
        </Button>
      </Fragment>
    );
  }
}

const customStyles = () => ({
  defaultMargin: { margin: 8 },
  smallMarginTop: { marginTop: 4 },
  smallMarginBottom: { marginBottom: 4 },
});

export default withStyles(customStyles)(Login);
