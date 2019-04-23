import {
  FETCH_POSTS,
  NEW_POST,
  FINAL_TRANSCRIPT,
  INTERIM_TRANSCRIPT,
  LISTENING_TRANSCRIPT
} from '../actions/types';

const initialState = {
  items: [],
  item: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        items: action.payload
      };
    case NEW_POST:
      return {
        ...state,
        item: action.payload
      };
    case FINAL_TRANSCRIPT:
      return {
        ...state,
        item: action.payload
      };
    case INTERIM_TRANSCRIPT:
      return {
        ...state,
        item: action.payload
      };
    case LISTENING_TRANSCRIPT:
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
}
