import React, { Component } from 'react';
import { Icon, IconButton, Menu, MenuItem } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';

class UserProfile extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { history } = this.props;

    return (
      <React.Fragment>
        <IconButton
          color='inherit'
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup='true'
          onClick={this.handleClick}
        >
          <Icon>perm_identity</Icon>
        </IconButton>
        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem
            onClick={() => {
              this.handleClose();
              history.push('/profile');
            }}
          >
            Your Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.handleClose();
              history.push('/list');
            }}
          >
            Your list
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.handleClose();
              Auth.signOut();
            }}
          >
            Sign Out
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

export default withRouter(UserProfile);
