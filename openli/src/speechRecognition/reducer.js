import produce from 'immer';

import {
  key,
  FINAL_UPDATED,
  INTERIM_UPDATED,
  LISTENING_UPDATED,
  RESET_RECORDING
} from './actions';

export const selectors = {
  finalTranscript: state => state[key].finalTranscript,
  interimTranscript: state => state[key].interimTranscript,
  listening: state => state[key].listening
};

const initialState = {
  finalTranscript: '',
  interimTranscript: '',
  listening: false
};

export default function(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case FINAL_UPDATED:
        draft.finalTranscript = action.payload.finalTranscript;
        break;
      case INTERIM_UPDATED:
        draft.interimTranscript = action.payload.interimTranscript;
        break;
      case LISTENING_UPDATED:
        draft.listening = action.payload.listening;
        break;
      case RESET_RECORDING:
        draft.finalTranscript = '';
        draft.interimTranscript = '';
        break;
    }
  });
}
