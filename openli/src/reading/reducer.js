import {
  key,
  TEXT_UPDATED,
  ACTIVE_STEP_UPDATED,
  NEXT_STEP,
  PREVIOUS_STEP
} from './actions';

export const selectors = {
  text: state => state[key].text,
  activeStep: state => state[key].activeStep
};

const initialState = {
  text: '',
  activeStep: 0
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
    default:
      return state;
  }
}
