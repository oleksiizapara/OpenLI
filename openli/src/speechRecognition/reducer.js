import {
  key,
  FINAL_UPDATED,
  INTERIM_UPDATED,
  LISTENING_UPDATED
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
  switch (action.type) {
    case FINAL_UPDATED:
      return {
        ...state,
        finalTranscript: action.payload.finalTranscript
      };
    case INTERIM_UPDATED:
      return {
        ...state,
        interimTranscript: action.payload.interimTranscript
      };
    case LISTENING_UPDATED:
      return {
        ...state,
        listening: action.payload.listening
      };
    default:
      return state;
  }
}
