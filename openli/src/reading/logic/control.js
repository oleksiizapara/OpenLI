import { createLogic } from 'redux-logic';

import { actionTypes as controlActionTypes } from 'control/actions';

import { actions as readingActions, formStates } from 'reading/actions';

import {
  actions as speechRecognitionActions,
  commands as speechRecognitionCommands
} from 'speechRecognition/actions';

import { selectors } from 'reading/reducer';

const start = createLogic({
  type: controlActionTypes.START,

  processOptions: {
    dispatchReturn: true
  },

  async process({ getState }, dispatch, done) {
    const formState = selectors.formState(getState());
    const isReading = selectors.isReading(getState());
    if (
      formState !== formStates.LOADED_STATE ||
      (formState === formStates.READING_STATE && isReading)
    ) {
      done();
      return;
    }

    dispatch(readingActions.startReading());

    dispatch(
      speechRecognitionActions.commandUpdated(speechRecognitionCommands.START)
    );

    done();
  }
});

const stop = createLogic({
  type: controlActionTypes.STOP,

  processOptions: {
    dispatchReturn: true
  },

  async process({ getState }, dispatch, done) {
    const formState = selectors.formState(getState());
    const isReading = selectors.isReading(getState());
    if (
      formState !== formStates.READING_STATE ||
      (formState === formStates.READING_STATE && !isReading)
    ) {
      done();
      return;
    }

    dispatch(readingActions.stopReading());

    dispatch(
      speechRecognitionActions.commandUpdated(speechRecognitionCommands.STOP)
    );

    done();
  }
});

const reset = createLogic({
  type: controlActionTypes.RESET,

  processOptions: {
    dispatchReturn: true
  },

  async process({ getState }, dispatch, done) {
    const formState = selectors.formState(getState());
    const isReading = selectors.isReading(getState());
    if (
      formState !== formStates.READING_STATE ||
      (formState === formStates.READING_STATE && !isReading)
    ) {
      done();
      return;
    }

    dispatch(
      speechRecognitionActions.commandUpdated(speechRecognitionCommands.RESET)
    );

    done();
  }
});

export default [start, stop, reset];
