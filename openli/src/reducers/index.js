import { combineReducers } from 'redux';
import postReducer from './postReducer';
import speechRecognitionReducer from './speechRecognitionReducer';

export default combineReducers({
  posts: postReducer,
  speechRecognition: speechRecognitionReducer
});
