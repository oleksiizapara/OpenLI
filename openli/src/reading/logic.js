import { map } from 'rxjs/operators';
import { createLogic } from 'redux-logic';
import produce from 'immer';
import Enumerable from 'linq';

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

import {
  selectors as speechRecognitionSelectors,
  FINAL_UPDATED,
  INTERIM_UPDATED,
  LISTENING_UPDATED,
  resetRecording
} from '../speechRecognition/actions';

import { selectors } from './reducer';

import {
  splitTextOnWords,
  recogniseWords,
  validateRecognizedWords
} from './common';

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
      const words = splitTextOnWords(text);

      dispatch(wordsUpdated(words));

      dispatch(statusUpdated(WORDS_UPDATE_FINISHED));
      done();
    }
  }
});

export const recognitionFinalWords = createLogic({
  type: FINAL_UPDATED,
  latest: true, // take latest only

  processOptions: {
    dispatchReturn: true
  },

  process({ getState, action }, dispatch, done) {
    const finalTranscript = action.payload.finalTranscript;
    const finalTranscriptWords = splitTextOnWords(finalTranscript);
    const words = selectors.words(getState());

    const lastRecognisedWord = Enumerable.from(words).lastOrDefault(
      x => x.isFinalRecognised
    );
    const testedWords = Enumerable.from(words)
      .skip(lastRecognisedWord ? lastRecognisedWord.index : 0)
      .where(x => !x.isFinalRecognised)
      .take(Math.max(finalTranscriptWords.length + 1, 3))
      .toArray();

    const rawRecogniseWordIndexes = recogniseWords(
      testedWords,
      finalTranscriptWords
    );

    const recognisedWordIndexes = validateRecognizedWords(
      rawRecogniseWordIndexes
    );

    const normalizedRecognisedWordIndexes = Enumerable.from(
      recognisedWordIndexes
    )
      .select((x, index) => {
        if (x === -1) {
          return x;
        }
        return index + (lastRecognisedWord ? lastRecognisedWord.index + 1 : 0);
      })
      .where(x => x !== -1)
      .toArray();

    const updatedWords = produce(words, draft => {
      normalizedRecognisedWordIndexes.forEach(x => {
        draft[x].isFinalRecognised = true;
      });
    });

    if (normalizedRecognisedWordIndexes.length > 0) {
      dispatch(wordsUpdated(updatedWords));
    }

    done();
  }
});

export const recognitionInterimWords = createLogic({
  type: INTERIM_UPDATED,
  latest: true, // take latest only

  processOptions: {
    dispatchReturn: true
  },

  process({ getState, action }, dispatch, done) {
    const interimTranscript = action.payload.interimTranscript;
    const interimTranscriptWords = splitTextOnWords(interimTranscript);
    const words = selectors.words(getState());

    const lastRecognisedWord = Enumerable.from(words).lastOrDefault(
      x => x.isFinalRecognised
    );
    const testedWords = Enumerable.from(words)
      .skip(lastRecognisedWord ? lastRecognisedWord.index : 0)
      .where(x => !x.isFinalRecognised)
      .take(Math.max(interimTranscriptWords.length + 1, 3))
      .toArray();

    const rawRecognisedWordIndexes = recogniseWords(
      testedWords,
      interimTranscriptWords
    );

    const recognisedWordIndexes = validateRecognizedWords(
      rawRecognisedWordIndexes
    );

    if (
      recognisedWordIndexes.length > 5 &&
      Enumerable.from(recognisedWordIndexes).all(x => x == -1)
    ) {
      dispatch(resetRecording());
    }

    const normalizedRecognisedWordIndexes = Enumerable.from(
      recognisedWordIndexes
    )
      .select((x, index) => {
        if (x === -1) {
          return x;
        }
        return index + (lastRecognisedWord ? lastRecognisedWord.index + 1 : 0);
      })
      .where(x => x !== -1)
      .toArray();

    var isWordsChanged = false;

    const updatedWords = produce(words, draft => {
      normalizedRecognisedWordIndexes.forEach(x => {
        if (!draft[x].isInterimRecognised) {
          draft[x].isInterimRecognised = true;
          isWordsChanged = true;
        }
      });
    });

    if (isWordsChanged) {
      dispatch(wordsUpdated(updatedWords));
    }
    done();
  }
});

export default [
  nextStep,
  previousStep,
  updateWords,
  recognitionFinalWords,
  recognitionInterimWords
];
