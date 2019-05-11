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
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: 'auto'
  },

  button: {
    margin: theme.spacing(1)
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {},

  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
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
        spacing={1}
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
