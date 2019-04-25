import { map } from 'rxjs/operators';
import { createLogic } from 'redux-logic';
import {
  key,
  TEXT_UPDATED,
  ACTIVE_STEP_UPDATED,
  NEXT_STEP,
  PREVIOUS_STEP,
  activeStepUpdated
} from './actions';

export const nextStep = createLogic({
  type: NEXT_STEP,
  latest: true, // take latest only

  processOptions: {
    dispatchReturn: true
  },

  process({ getState, action }, dispatch, done) {
    const currentActiveStep = getState()[key].activeStep;
    dispatch(activeStepUpdated(currentActiveStep + 1));
    done();
  }
});

export const previousStep = createLogic({
  type: PREVIOUS_STEP,
  latest: true, // take latest only

  processOptions: {
    dispatchReturn: true
  },

  process({ getState, action }, dispatch, done) {
    const currentActiveStep = getState()[key].activeStep;
    dispatch(activeStepUpdated(currentActiveStep - 1));
    done();
  }
});

export default [nextStep, previousStep];
