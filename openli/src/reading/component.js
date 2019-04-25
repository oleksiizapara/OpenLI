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
import { TEXT_LOADING_STATE, READING_STATE, REVIEW_STATE } from './actions';

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

const steps = {
  TEXT_LOADING_STATE: {
    index: 0,
    title: 'Text Loading',
    content: () => <TextLoadingForm />
  },
  READING_STATE: {
    index: 1,
    title: 'Reading',
    content: () => <ReadingForm />
  },
  REVIEW_STATE: {
    index: 2,
    title: 'Review',
    content: () => <Review />
  }
};

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
          <Stepper
            activeStep={steps[activeStep].index}
            className={classes.stepper}
          >
            {Object.keys(steps).map((key, index) => (
              <Step key={steps[key].index}>
                <StepLabel>{steps[key].title}</StepLabel>
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
                {steps[activeStep].content()}
                <div className={classes.buttons}>
                  {activeStep !== TEXT_LOADING_STATE && (
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
                    {activeStep === REVIEW_STATE ? 'Place order' : 'Next'}
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
