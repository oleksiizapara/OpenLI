import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button
} from '@material-ui/core';

import ReadingForm from './readingForm';
import TextLoadingForm from './textLoadingForm';
import Review from './review';

import { selectors as readingSelector } from './reducer';
import { nextStep, previousStep } from './actions';

const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
});

const steps = ['Text Loading', 'Reading', 'Review'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <TextLoadingForm />;
    case 1:
      return <ReadingForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

class Reading extends Component {
  handleNext = () => {
    this.props.dispatch(nextStep());
  };

  handleBack = () => {
    this.props.dispatch(previousStep());
  };

  render() {
    const { activeStep, classes } = this.props;

    return (
      <React.Fragment>
        <Paper className={classes.paper}>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant='h5' gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant='subtitle1'>
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button
                      onClick={this.handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
    activeStep: readingSelector.activeStep(state)
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Reading));
