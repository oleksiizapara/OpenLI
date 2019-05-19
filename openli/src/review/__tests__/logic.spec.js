import { createMockStore } from 'redux-logic-test';

import { key, actions, formStates } from '../actions';
import { key as readingKey, actions as readingActions } from 'reading/actions';

import { selectors } from '../reducer';
import logic from '../logic';

import reducer from 'rootReducer';

test(`[redux-logic] calculate`, async () => {
  const initialState = {
    [key]: {
      words: [],
      totalWords: 0,
      readingSpeed: 0,
      recognisedWords: [],
      notRecognisedWords: []
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  store.dispatch(
    actions.load({
      words: [
        { word: 'a', time: 1 },
        { word: 'b', time: 3, isNotRecognisedCount: 1 }
      ],
      readingMessage: { content: 'a' }
    })
  );

  await store.whenComplete(() => {
    const totalWords = selectors.totalWords(store.getState());
    expect(totalWords).toEqual(2);

    const readingSpeed = selectors.readingSpeed(store.getState());
    expect(readingSpeed).toEqual(1);

    const recognisedWords = selectors.recognisedWords(store.getState());
    expect(recognisedWords).toEqual(['a']);

    const notRecognisedWords = selectors.notRecognisedWords(store.getState());
    expect(notRecognisedWords).toEqual(['b']);

    const formState = selectors.formState(store.getState());
    expect(formState).toEqual(formStates.LOADED_STATE);
  });
});

test(`[redux-logic] onReadingFinished`, async () => {
  const initialState = {
    [key]: {
      words: [],
      totalWords: 0,
      readingSpeed: 0,
      recognisedWords: [],
      notRecognisedWords: []
    },
    [readingKey]: {
      words: [{ index: 0, word: 'a', isFinalRecognised: true }],
      readingMessage: undefined
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  store.dispatch(readingActions.finishReading());

  await store.whenComplete(() => {
    const formState = selectors.formState(store.getState());
    expect(formState).toEqual(formStates.LOADED_STATE);
  });
});
