import { key, actionTypes, formStates } from './actions';

import produce from 'immer';

export const selectors = {
  readingMessage: state => state[key].readingMessage,
  formState: state => state[key].formState,
  words: state => state[key].words
};

const initialState = {
  readingMessage: undefined,
  words: [],
  formState: formStates.DEFAULT_STATE,
  error: ''
};

export default function(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.LOAD:
        draft.formState = formStates.LOADING_STATE;
        break;
      case actionTypes.UPDATE_READING_MESSAGE:
        draft.readingMessage = action.payload.readingMessage;
        break;
      case actionTypes.UPDATE_WORDS:
        draft.words = action.payload.words;
        break;
      case actionTypes.LOADED:
        draft.formState = formStates.LOADED_STATE;
        break;
      case actionTypes.ERROR:
        draft.error = action.payload.error;
        break;
    }
  });
}
