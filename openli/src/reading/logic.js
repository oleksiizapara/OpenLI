import { map } from 'rxjs/operators';
import { createLogic } from 'redux-logic';
import {
  key,
  TEXT_UPDATED,
  ACTIVE_STEP_UPDATED,
  NEXT_STEP,
  PREVIOUS_STEP,
  WORDS_UPDATE_STARTED,
  WORDS_UPDATE_FINISHED,
  activeStepUpdated,
  wordsUpdated,
  statusUpdated
} from './actions';

import { TEXT_LOADING_STATE, READING_STATE, REVIEW_STATE } from './actions';

export const nextStep = createLogic({
  type: NEXT_STEP,
  latest: true, // take latest only

  processOptions: {
    dispatchReturn: true
  },

  process({ getState }, dispatch, done) {
    const currentActiveStep = getState()[key].activeStep;

    switch (currentActiveStep) {
      case TEXT_LOADING_STATE:
        dispatch(activeStepUpdated(READING_STATE));
        break;
      case READING_STATE:
        dispatch(activeStepUpdated(REVIEW_STATE));
        break;
      default:
        dispatch(activeStepUpdated(TEXT_LOADING_STATE));
    }

    done();
  }
});

export const previousStep = createLogic({
  type: PREVIOUS_STEP,
  latest: true, // take latest only

  processOptions: {
    dispatchReturn: true
  },

  process({ getState }, dispatch, done) {
    const currentActiveStep = getState()[key].activeStep;

    switch (currentActiveStep) {
      case READING_STATE:
        dispatch(activeStepUpdated(TEXT_LOADING_STATE));
        break;
      case REVIEW_STATE:
        dispatch(activeStepUpdated(READING_STATE));
        break;
      default:
        dispatch(activeStepUpdated(TEXT_LOADING_STATE));
    }
  }
});

export const updateWords = createLogic({
  type: ACTIVE_STEP_UPDATED,
  latest: true, // take latest only

  processOptions: {
    dispatchReturn: true
  },

  process({ getState }, dispatch, done) {
    dispatch(statusUpdated(WORDS_UPDATE_STARTED));
    const text = getState()[key].text;

    if (text) {
      var viewWords = text.match(/[^ \n\t]+[ \n\t]*/g);
      var words = viewWords.map((viewWord, index) => {
        const word = viewWord.match(/[^ \n\t]+/g)[0];
        return {
          index: index,
          word: word,
          viewWord: viewWord,
          afterWord: viewWord.substring(word.length, viewWord.length)
        };
      });

      dispatch(wordsUpdated(words));
      dispatch(statusUpdated(WORDS_UPDATE_FINISHED));
      done();
    }
  }
});

export default [nextStep, previousStep, updateWords];
