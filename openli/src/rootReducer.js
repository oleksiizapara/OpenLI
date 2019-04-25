import { combineReducers } from 'redux';

import {
  key as speechRecognitionKey,
  reducer as speechRecognitionReducer
} from './speechRecognition/index';

export default combineReducers({
  [speechRecognitionKey]: speechRecognitionReducer
});
