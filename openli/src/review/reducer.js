import { key, actionTypes, formStates } from './actions';

import produce from 'immer';

export const selectors = {
  formState: state => state[key].formState,
  error: state => state[key].error,

  words: state => state[key].words,
  readingMessage: state => state[key].readingMessage,

  totalWords: state => state[key].totalWords,
  readingSpeed: state => state[key].readingSpeed,
  recognisedWords: state => state[key].recognisedWords,
  notRecognisedWords: state => state[key].notRecognisedWords
};

const initialState = {
  formState: formStates.DEFAULT_STATE,
  error: '',

  words: [],
  readingMessageId: '',
  totalWords: undefined,
  readingSpeed: undefined,
  recognisedWords: [],
  notRecognisedWords: []
};

export default function(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.LOAD:
        draft.formState = formStates.LOADING_STATE;
        draft.words = action.payload.words;
        draft.readingMessage = action.payload.readingMessage;
        break;
      case actionTypes.LOADED:
        draft.formState = formStates.LOADED_STATE;
        break;
      case actionTypes.CALCULATED:
        draft.totalWords = action.payload.totalWords;
        draft.readingSpeed = action.payload.readingSpeed;
        draft.recognisedWords = action.payload.recognisedWords;
        draft.notRecognisedWords = action.payload.notRecognisedWords;
        break;
      case actionTypes.ERROR:
        draft.error = action.payload.error;
        draft.formState = formStates.ERROR_STATE;
        break;
      default:
        break;
    }
  });
}
