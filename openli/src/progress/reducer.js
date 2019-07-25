import { key, actionTypes, formStates } from './actions';

import produce from 'immer';

export const selectors = {
  formState: state => state[key].formState,
  error: state => state[key].error,
  readingMessageProgresses: state => state[key].readingMessageProgresses,
  isCalculated: state => state[key].isCalculated,
  createdAt: state => state[key].createdAt,
  updatedAt: state => state[key].updatedAt
};

const initialState = {
  formState: formStates.DEFAULT_STATE,
  error: '',
  messageProgresses: []
};

export default function(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.LOAD:
        draft.formState = formStates.LOADING_STATE;
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
