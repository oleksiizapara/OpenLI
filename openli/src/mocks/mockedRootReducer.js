import { combineReducers } from 'redux';

import { key as speechRecognitionKey } from 'speechRecognition/index';

import { key as readingKey } from 'reading/index';

import { key as reviewKey } from 'review/index';

import { key as readingMessageKey } from 'readingMessage/index';

import { key as settingsKey } from 'settings/index';

import { key as controlKey } from 'control/index';

import * as readingMessageMocks from 'mocks/readingMessageMocks';
import * as readingMocks from 'mocks/readingMocks';
import * as reviewMocks from 'mocks/reviewMocks';
import * as settingsMocks from 'mocks/settingsMocks';
import * as controlMocks from 'mocks/controlMocks';

const initialSpeechRecognitionState = {};
const initialReadingState = readingMocks.readingSample;
const initialReadingMessageState = readingMessageMocks.loadedSampleMessage;
const initialReviewState = reviewMocks.loadedMock;
const initialSettingsState = settingsMocks.authenticatedState;
const initialControlState = controlMocks.defaultMock;

const mockedReducer = initialState => (state = initialState) => {
  return state;
};

export default combineReducers({
  [speechRecognitionKey]: mockedReducer(initialSpeechRecognitionState),
  [readingKey]: mockedReducer(initialReadingState),
  [readingMessageKey]: mockedReducer(initialReadingMessageState),
  [reviewKey]: mockedReducer(initialReviewState),
  [settingsKey]: mockedReducer(initialSettingsState),
  [controlKey]: mockedReducer(initialControlState)
});