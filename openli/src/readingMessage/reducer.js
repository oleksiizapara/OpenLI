import produce from 'immer';
import uuid from 'uuid/v4';

import { key, actionTypes, formStates } from './actions';

export const selectors = {
  identifier: state => state[key].identifier,
  id: state => state[key].id,
  readingMessage: state => state[key].readingMessage,
  formState: state => state[key].formState
};

const initialReadingMessage = () => {
  return {
    title: '',
    content: ''
    // tags: ''
  };
};

const initialState = {
  identifier: uuid(),
  id: '',
  readingMessage: initialReadingMessage(),
  formState: formStates.DEFAULT_STATE
};

export default function(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.UPDATED:
        draft.readingMessage = action.payload.readingMessage;
        break;
      case actionTypes.LOAD:
        draft.identifier = action.payload.identifier;
        draft.id = action.payload.id;
        draft.formState = formStates.LOADING_STATE;
        break;
      case actionTypes.CREATE:
        draft.identifier = action.payload.identifier;
        draft.id = '';
        draft.readingMessage = initialReadingMessage();
        draft.formState = formStates.LOADED_STATE;
        break;
      case actionTypes.LOADED:
        draft.formState = formStates.LOADED_STATE;
        break;
      case actionTypes.PUBLISH:
        draft.formState = formStates.PUBLISHING_STATE;
        break;
      case actionTypes.PUBLISHED:
        draft.id = action.payload.readingMessage.id;
        draft.readingMessage = action.payload.readingMessage;
        draft.formState = formStates.PUBLISHED_STATE;
        break;
      case actionTypes.ERROR:
        draft.formState = formStates.ERROR_STATE;
        break;
    }
  });
}
