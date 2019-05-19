import { createLogic } from 'redux-logic';

import { actionTypes, actions } from './actions';

import { actionTypes as readingActionTypes } from 'reading/actions';
import { selectors as readingSelectors } from 'reading/reducer';
import {
  calculateTotalWordCount,
  calculateReadingSpeed,
  calculateRecognisedWords,
  calculateNotRecognisedWords
} from './common';

export const calculate = createLogic({
  type: actionTypes.LOAD,

  processOptions: {
    dispatchReturn: true
  },

  async process({ action }, dispatch, done) {
    const { words } = action.payload;

    const totalWords = calculateTotalWordCount(words);
    const readingSpeed = calculateReadingSpeed(words);
    const recognisedWords = calculateRecognisedWords(words);
    const notRecognisedWords = calculateNotRecognisedWords(words);

    dispatch(
      actions.calculated({
        totalWords,
        readingSpeed,
        recognisedWords,
        notRecognisedWords
      })
    );

    dispatch(actions.loaded());
    done();
  }
});

export const onReadingFinished = createLogic({
  type: readingActionTypes.READ_FINISHED,

  processOptions: {
    dispatchReturn: true
  },

  async process({ getState }, dispatch, done) {
    const words = readingSelectors.words(getState());
    const readingMessage = readingSelectors.readingMessage(getState());

    dispatch(actions.load({ words, readingMessage }));

    done();
  }
});

export default [calculate, onReadingFinished];
