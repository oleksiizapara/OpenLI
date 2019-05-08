import React, { Component } from 'react';
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
  Badge,
  Grid
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import SearchIcon from '@material-ui/icons/Search';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ReadingSearchItem from './ReadingSearchItem';
import ReadingSearchBar from './ReadingSearchBar';

const styles = theme => ({
  root: {},
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: 'auto'
  },

  button: {
    margin: theme.spacing.unit
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {},

  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    paddingTop: 2 * theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    width: '100%'
  }
});

class ReadingSearch extends Component {
  render() {
    const { classes, history } = this.props;

    return (
      <Grid
        className='root'
        container
        direction='column'
        justify='flex-start'
        alignItems='stretch'
        spacing={16}
      >
        <Grid item>
          <ReadingSearchBar
            onRequestAdd={() => {
              history.push('/reading_add');
            }}
          />
        </Grid>
        <Grid item>
          <ReadingSearchItem />
        </Grid>
        <Grid item>
          <ReadingSearchItem />
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(ReadingSearch));
