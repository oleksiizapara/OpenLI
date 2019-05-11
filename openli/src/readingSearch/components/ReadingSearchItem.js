import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const styles = theme => ({
  root: {
    padding: theme.spacing(2),
    margin: 'auto'
  }
});

class ReadingSearchItem extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Grid container spacing={1}>
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
            spacing={1}
            direction='row'
            justify='space-between'
            alignItems='flex-start'
          >
            <Grid item xs container direction='column' spacing={1}>
              <Grid item xs />
            </Grid>
            <Grid item>
              <Typography variant='subtitle1'>Ivan Brovkin </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(ReadingSearchItem);
