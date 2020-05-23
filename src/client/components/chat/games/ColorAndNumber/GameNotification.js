import { Button, Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { PureComponent } from "react";

class GameNotification extends PureComponent {
  render() {
    const {
      classes: {
        notificationWrapper,
        marginLeft,
        marginRight,
        margin,
        padding,
      },
      text,
      okButton,
      cancelButton,
    } = this.props;

    return (
      <div className={notificationWrapper}>
        <Paper className={padding} elevation={3}>
          <Typography variant="h4">{text}</Typography>
          <div className={margin}>
            {okButton && (
              <Button
                className={marginRight}
                variant="contained"
                color="primary"
                onClick={okButton.onClick}
              >
                {okButton.text}
              </Button>
            )}
            {cancelButton && (
              <Button
                className={marginLeft}
                variant="outlined"
                color="secondary"
                onClick={cancelButton.onClick}
              >
                {cancelButton.text}
              </Button>
            )}
          </div>
        </Paper>
      </div>
    );
  }
}

const customStyles = (theme) => ({
  notificationWrapper: {
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 9,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  marginLeft: { marginLeft: 4 },
  marginRight: { marginRight: 4 },
  margin: { margin: 4 },
  padding: { padding: 6 },
});

export default withStyles(customStyles)(GameNotification);
