import {
  key,
  TEXT_LOADING_STATE,
  TEXT_UPDATED,
  ACTIVE_STEP_UPDATED,
  WORDS_UPDATED
} from './actions';

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
  switch (action.type) {
    case TEXT_UPDATED:
      return {
        ...state,
        text: action.payload.text
      };
    case ACTIVE_STEP_UPDATED:
      return {
        ...state,
        activeStep: action.payload.activeStep
      };
    case WORDS_UPDATED:
      return {
        ...state,
        words: action.payload.words
      };
    default:
      return state;
  }
}
