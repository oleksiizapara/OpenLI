import { createLogic } from 'redux-logic';
import produce from 'immer';
import Enumerable from 'linq';

import { actionTypes, actions } from './actions';

import { selectors } from './reducer';

import {
  actionTypes as speechRecognitionActionTypes,
  resetRecording
} from 'speechRecognition/actions';

import * as queryHelper from 'common/queryHelper';
import { errorMessages } from 'common/errorMessages';

import {
  splitTextOnWords,
  recogniseWords,
  validateRecognizedWords
} from './common';

export const loadWords = createLogic({
  type: actionTypes.LOAD,

  processOptions: {
    dispatchReturn: true
  },

  async process({ action }, dispatch, done) {
    const { id } = action.payload;
    const readingMessage = await queryHelper.getReadingMessage(id);

    if (!readingMessage) {
      dispatch(actions.error(errorMessages.READING_MESSAGE_WAS_NOT_FOUND));
      done();
      return;
    }

    dispatch(actions.updateReadingMessage(readingMessage));

    const words = splitTextOnWords(readingMessage.content);
    dispatch(actions.updateWords(words));
    dispatch(actions.loaded());
    done();
  }
});

export const recognitionFinalWords = createLogic({
  type: speechRecognitionActionTypes.FINAL_UPDATED,

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
      dispatch(actions.updateWords(updatedWords));
    }

    done();
  }
});

export const recognitionInterimWords = createLogic({
  type: speechRecognitionActionTypes.INTERIM_UPDATED,

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
      dispatch(actions.updateWords(updatedWords));
    }
    done();
  }
});

export default [loadWords, recognitionFinalWords, recognitionInterimWords];
