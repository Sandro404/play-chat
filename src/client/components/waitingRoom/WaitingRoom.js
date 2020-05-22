import { CircularProgress, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import React, { Component, Fragment } from "react";

class WaitingRoom extends Component {
  render() {
    const {
      classes: { smallMarginTop, smallMarginBottom, defaultMargin },
    } = this.props;

    return (
      <Fragment>
        <CircularProgress
          className={classNames(smallMarginBottom, defaultMargin)}
        />
        <Typography
          className={classNames(smallMarginTop, defaultMargin)}
          variant="body1"
        >
          Waiting for match...
        </Typography>
      </Fragment>
    );
  }
}

const customStyles = () => ({
  defaultMargin: { margin: 8 },
  smallMarginTop: { marginTop: 4 },
  smallMarginBottom: { marginBottom: 4 },
});

export default withStyles(customStyles)(WaitingRoom);
