import {
  key,
  TEXT_LOADING_STATE,
  TEXT_UPDATED,
  ACTIVE_STEP_UPDATED,
  WORDS_UPDATED
} from './actions';

import produce from 'immer';
import { readlink } from 'fs';

export const selectors = {
  text: state => state[key].text,
  activeStep: state => state[key].activeStep,
  words: state => state[key].words
};

const initialState = {
  text: '',
  activeStep: TEXT_LOADING_STATE,
  words: []
};

export default function(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case TEXT_UPDATED:
        draft.text = action.payload.text;
        break;
      case ACTIVE_STEP_UPDATED:
        draft.activeStep = action.payload.activeStep;
        break;
      case WORDS_UPDATED:
        draft.words = action.payload.words;
        break;
    }
  });
}
