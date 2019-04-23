import {
  FETCH_POSTS,
  NEW_POST,
  FINAL_TRANSCRIPT,
  INTERIM_TRANSCRIPT,
  LISTENING_TRANSCRIPT
} from '../actions/types';

const initialState = {
  finalTranscript: '',
  interimTranscript: '',
  listening: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FINAL_TRANSCRIPT:
      return {
        ...state,
        finalTranscript: action.finalTranscript
      };
    case INTERIM_TRANSCRIPT:
      return {
        ...state,
        interimTranscript: action.interimTranscript
      };
    case LISTENING_TRANSCRIPT:
      return {
        ...state,
        listening: action.listening
      };
    default:
      return state;
  }
}
