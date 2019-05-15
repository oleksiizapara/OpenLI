import { combineReducers } from 'redux';

import {
  key as speechRecognitionKey,
  reducer as speechRecognitionReducer
} from './speechRecognition/index';

import { key as readingKey, reducer as readingReducer } from './reading/index';

import { key as reviewKey, reducer as reviewReducer } from './review/index';
import {
  key as settingsKey,
  reducer as settingsReducer
} from './settings/index';

import { key as controlKey, reducer as controlReducer } from './control/index';

import {
  key as readingMessageKey,
  reducer as readingMessageReducer
} from './readingMessage/index';

export default combineReducers({
  [speechRecognitionKey]: speechRecognitionReducer,
  [readingKey]: readingReducer,
  [readingMessageKey]: readingMessageReducer,
  [reviewKey]: reviewReducer,
  [settingsKey]: settingsReducer,
  [controlKey]: controlReducer
});
