import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import {
  withStyles,
  Paper,
  IconButton,
  Icon,
  Input,
  Button,
  InputBase,
  AppBar,
  Toolbar,
  Typography,
  Badge
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ReadingSearchItem from './ReadingSearchItem';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  button: {
    margin: theme.spacing.unit
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12
  },
  search: {
    flexGrow: 1
  },

  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    transition: theme.transitions.create('width'),
    width: '100%'
  }
});

class ReadingSearch extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid
          container
          justify='center'
          alignItems='center'
          alignItems='stretch'
          spacing={16}
        >
          <Grid item xs={12} md={8}>
            <AppBar position='static'>
              <Toolbar>
                <IconButton
                  className={classes.menuButton}
                  color='inherit'
                  aria-label='Add new reading message'
                >
                  <AddCircleOutlineIcon />
                </IconButton>
                <div className={classes.search}>
                  <InputBase
                    fullWidth
                    placeholder='Search…'
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                  />
                </div>

                <IconButton
                  className={classes.menuButton}
                  color='inherit'
                  aria-label='Search ...'
                >
                  <SearchIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid item xs={12} md={8}>
            <ReadingSearchItem />
          </Grid>
          <Grid item xs={12} md={8}>
            <ReadingSearchItem />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(ReadingSearch);
