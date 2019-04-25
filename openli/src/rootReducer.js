import { combineReducers } from 'redux';

import {
  key as speechRecognitionKey,
  reducer as speechRecognitionReducer
} from './speechRecognition/index';

import { key as readingKey, reducer as readingReducer } from './reading/index';

export default combineReducers({
  [speechRecognitionKey]: speechRecognitionReducer,
  [readingKey]: readingReducer
});
