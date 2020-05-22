import { IconButton, Menu, MenuItem } from "@material-ui/core";
import ExtensionIcon from "@material-ui/icons/Extension";
import React, { Component, Fragment } from "react";

export default class GameSelection extends Component {
  state = { popOverOpen: false, menuAnchorEl: null };

  render() {
    const { resetPopupMenu } = this;
    const { popOverOpen, menuAnchorEl } = this.state;
    const { initializeGame } = this.props;

    return (
      <Fragment>
        <IconButton
          aria-controls={"game-selection-popup-button"}
          aria-haspopup="true"
          onClick={(e) =>
            this.setState({
              popOverOpen: !popOverOpen,
              menuAnchorEl: e.currentTarget,
            })
          }
        >
          <ExtensionIcon />
        </IconButton>
        <Menu
          id={"game-selection-popup-button"}
          open={popOverOpen}
          anchorEl={menuAnchorEl}
          keepMounted
          onClose={resetPopupMenu}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          transformOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          {[
            {
              gameKey: "COLOR_AND_NUMBER",
              text: "Colored Numbers",
            },
          ].map(({ gameKey, text }) => (
            <MenuItem
              key={gameKey}
              onClick={() => {
                resetPopupMenu();
                initializeGame(gameKey);
              }}
            >
              {text}
            </MenuItem>
          ))}
        </Menu>
      </Fragment>
    );
  }

  resetPopupMenu = () =>
    this.setState({ popOverOpen: false, menuAnchorEl: null });
}
