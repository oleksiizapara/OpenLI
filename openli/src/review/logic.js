import { createLogic } from 'redux-logic';

import { actionTypes, actions } from './actions';

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

export default [calculate];
