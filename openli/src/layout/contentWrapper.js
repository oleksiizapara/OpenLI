import React, { Component } from 'react';
import { withStyles, Grid } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex'
  }
});

export const contentWrapper = WrappedComponent => {
  class Wrapper extends React.PureComponent {
    render() {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          <Grid
            container
            direction='row'
            justify='center'
            alignItems='stretch'
            spacing={16}
          >
            <Grid item md={12} lg={8}>
              <WrappedComponent {...this.props} />
            </Grid>
          </Grid>
        </div>
      );
    }
  }

  return withStyles(styles)(Wrapper);
};
