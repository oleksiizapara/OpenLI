import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto'
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  }
});

class ReadingSearchItem extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={16}>
            <Typography gutterBottom variant='h4'>
              Text Title 1
            </Typography>
            <Typography gutterBottom>
              For who thoroughly her boy estimating conviction. Removed demands
              expense account in outward tedious do. Particular way thoroughly
              unaffected projection favourable mrs can projecting own. Thirty it
              matter enable become admire in giving. See resolved goodness
              felicity shy civility domestic had but. Drawings offended yet
              answered jennings perceive laughing six did far. ...
            </Typography>
            <Typography gutterBottom variant='subtitle1'>
              IELTS, Easy level
            </Typography>

            <Grid
              container
              spacing={16}
              direction='row'
              justify='space-between'
              alignItems='flex-start'
            >
              <Grid item xs container direction='column' spacing={16}>
                <Grid item xs />
              </Grid>
              <Grid item>
                <Typography variant='subtitle1'>Ivan Brovkin </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(ReadingSearchItem);
