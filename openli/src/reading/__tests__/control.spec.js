import { createMockStore } from 'redux-logic-test';

import { key, actions, formStates } from '../actions';

import { logic } from '../index';

import {
  key as speechRecognitionKey,
  actionTypes as speechRecognitionActionTypes,
  commands as speechRecognitionCommands
} from 'speechRecognition/actions';
import reducer from 'rootReducer';

test(`[redux-logic] onReadingFinished   `, async () => {
  const initialState = {
    [key]: {
      words: [{ index: 0, word: 'a' }],
      formState: formStates.READING_STATE
    },
    [speechRecognitionKey]: {}
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  store.dispatch(actions.finishReading());

  await store.whenComplete(() => {
    expect(store.actions).toEqual(
      expect.arrayContaining([
        {
          payload: { command: speechRecognitionCommands.STOP },
          type: speechRecognitionActionTypes.COMMAND_UPDATED
        }
      ])
    );
  });
});
