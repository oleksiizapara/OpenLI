import { createMockStore } from 'redux-logic-test';

import {
  key,
  TEXT_LOADING_STATE,
  READING_STATE,
  REVIEW_STATE,
  previousStep
} from '../actions';

import { finalUpdated, interimUpdated } from '../../speechRecognition/actions';
import { nextStep, activeStepUpdated } from '../actions';
import reducer from '../../rootReducer';
import logic from '../logic';
import { selectors } from '../reducer';
import { selectors as speechRecognitionSelector } from '../../speechRecognition/reducer';
import { getTooltipWordIndex } from '../common';

describe.each([
  [TEXT_LOADING_STATE, READING_STATE],
  [READING_STATE, REVIEW_STATE],
  ['INVALID_STATE', TEXT_LOADING_STATE]
])('.next(%i, %i)', (initialActiveState, expectedActiveState) => {
  test(`[redux-logic] nextStep switch from ${initialActiveState} to ${expectedActiveState}`, () => {
    const initialState = {
      [key]: {
        activeStep: initialActiveState
      }
    };

    const store = createMockStore({
      initialState,
      reducer,
      logic
    });

    store.dispatch(nextStep());

    store.whenComplete(() => {
      expect(selectors.activeStep(store.getState())).toEqual(
        expectedActiveState
      );
    });
  });
});

describe.each([
  [TEXT_LOADING_STATE, TEXT_LOADING_STATE],
  [READING_STATE, TEXT_LOADING_STATE],
  [REVIEW_STATE, READING_STATE],
  ['INVALID_STATE', TEXT_LOADING_STATE]
])('.previous(%i, %i)', (initialActiveState, expectedActiveState) => {
  test(`[redux-logic] previousStep switch from ${initialActiveState} to ${expectedActiveState}`, () => {
    const initialState = {
      [key]: {
        activeStep: initialActiveState
      }
    };

    const store = createMockStore({
      initialState,
      reducer,
      logic
    });

    store.dispatch(previousStep());

    store.whenComplete(() => {
      expect(selectors.activeStep(store.getState())).toEqual(
        expectedActiveState
      );
    });
  });
});

test(`[redux-logic] updateWords split text`, () => {
  const initialState = {
    [key]: {
      text: 'a b'
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  store.dispatch(activeStepUpdated(READING_STATE));

  store.whenComplete(() => {
    const words = selectors.words(store.getState());
    expect(words[0]).toEqual({
      index: 0,
      word: 'a',
      viewWord: 'a ',
      afterWord: ' ',
      preWord: ''
    });
    expect(words[1]).toEqual({
      index: 1,
      word: 'b',
      viewWord: 'b',
      afterWord: '',
      preWord: ''
    });
  });
});

describe.each([
  [
    [{ index: 0, word: 'Another' }],
    'Another',
    [
      {
        index: 0,
        word: 'Another',
        isFinalRecognised: true
      }
    ]
  ],
  [
    [{ index: 0, word: 'a' }],
    'a',
    [
      {
        index: 0,
        word: 'a',
        isFinalRecognised: true
      }
    ]
  ],
  [
    [
      { index: 0, word: 'a' },
      { index: 1, word: 'a', isFinalRecognised: true },
      { index: 2, word: 'a' }
    ],
    'a',
    [
      { index: 0, word: 'a' },
      { index: 1, word: 'a', isFinalRecognised: true },
      {
        index: 2,
        word: 'a',
        isFinalRecognised: true
      }
    ]
  ],
  [
    [
      { index: 0, word: 'direct' },
      { index: 1, word: 'neural' },
      { index: 2, word: 'pathways' },
      { index: 3, word: 'have' }
    ],
    'direct neural pathways',
    [
      { index: 0, word: 'direct', isFinalRecognised: true },
      { index: 1, word: 'neural', isFinalRecognised: true },
      { index: 2, word: 'pathways', isFinalRecognised: true },
      { index: 3, word: 'have' }
    ]
  ],
  [
    [
      { index: 0, word: 'direct' },
      { index: 1, word: 'neural' },
      { index: 2, word: 'pathways' },
      { index: 3, word: 'have' },
      { index: 4, word: 'been' },
      { index: 5, word: 'perfected' }
    ],
    'neural pathways have been perfected',
    [
      { index: 0, word: 'direct' },
      { index: 1, word: 'neural', isFinalRecognised: true },
      { index: 2, word: 'pathways', isFinalRecognised: true },
      { index: 3, word: 'have', isFinalRecognised: true },
      { index: 4, word: 'been', isFinalRecognised: true },
      { index: 5, word: 'perfected', isFinalRecognised: true }
    ]
  ],
  [
    [
      { index: 0, word: 'direct', isFinalRecognised: true },
      { index: 1, word: 'neural', isFinalRecognised: true },
      { index: 2, word: 'pathways', isFinalRecognised: true },
      { index: 3, word: 'have', isFinalRecognised: true },
      { index: 4, word: 'been', isFinalRecognised: true },
      { index: 5, word: 'a' },
      { index: 6, word: 'range' },
      { index: 7, word: 'of' },
      { index: 8, word: 'neural' },
      { index: 9, word: 'implants' }
    ],
    'our range of neural implants',
    [
      { index: 0, word: 'direct', isFinalRecognised: true },
      { index: 1, word: 'neural', isFinalRecognised: true },
      { index: 2, word: 'pathways', isFinalRecognised: true },
      { index: 3, word: 'have', isFinalRecognised: true },
      { index: 4, word: 'been', isFinalRecognised: true },
      { index: 5, word: 'a' },
      { index: 6, word: 'range', isFinalRecognised: true },
      { index: 7, word: 'of', isFinalRecognised: true },
      { index: 8, word: 'neural', isFinalRecognised: true },
      { index: 9, word: 'implants', isFinalRecognised: true }
    ]
  ]
])(
  '[redux-logic] recognitionFinalWords',
  (baseWords, finalText, expectedWords) => {
    test(`[redux-logic] recognitionFinalWords `, () => {
      const initialState = {
        [key]: {
          words: baseWords
        }
      };

      const store = createMockStore({
        initialState,
        reducer,
        logic
      });

      store.dispatch(finalUpdated(finalText));

      store.whenComplete(() => {
        const words = selectors.words(store.getState());
        expect(words).toEqual(expectedWords);
      });
    });
  }
);

describe.each([
  [
    [{ index: 0, word: 'a' }],
    'a',
    [
      {
        index: 0,
        word: 'a',
        isInterimRecognised: true
      }
    ]
  ],
  [
    [{ index: 0, word: 'a', isFinalRecognised: true }, { index: 1, word: 'b' }],
    'b',
    [
      { index: 0, word: 'a', isFinalRecognised: true },
      { index: 1, word: 'b', isInterimRecognised: true }
    ]
  ]
])(
  '[redux-logic] recognitionInterimWords',
  (baseWords, interimText, expectedWords) => {
    test(`[redux-logic] recognitionInterimWords `, () => {
      const initialState = {
        [key]: {
          words: baseWords
        }
      };

      const store = createMockStore({
        initialState,
        reducer,
        logic
      });

      store.dispatch(interimUpdated(interimText));

      store.whenComplete(() => {
        const words = selectors.words(store.getState());
        expect(words).toEqual(expectedWords);
      });
    });
  }
);

describe.each([
  [
    [
      { index: 0, word: 'e' },
      { index: 1, word: 'e' },
      { index: 2, word: 'e' },
      { index: 3, word: 'e' },
      { index: 4, word: 'e' },
      { index: 5, word: 'e' }
    ],
    'a b c d l k'
  ]
])('[redux-logic] resetRecording', (baseWords, interimText, expectedWords) => {
  test(`[redux-logic] resetRecording `, () => {
    const initialState = {
      [key]: {
        words: baseWords
      }
    };

    const store = createMockStore({
      initialState,
      reducer,
      logic
    });

    store.dispatch(interimUpdated(interimText));

    store.whenComplete(() => {
      const interimText = speechRecognitionSelector.interimTranscript(
        store.getState()
      );
      expect(interimText).toEqual('');
    });
  });
});
