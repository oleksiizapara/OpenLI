import { createMockStore } from 'redux-logic-test';

import { key, actions, formStates } from '../actions';
import { selectors } from '../reducer';
import logic from '../logic/algorithm';

import { actions as speechRecognitionActions } from 'speechRecognition/actions';
import reducer from 'rootReducer';

import * as queryHelper from 'common/queryHelper';
import { errorMessages } from 'common/errorMessages';
import { date } from 'common/date';

test(`[redux-logic] load words`, async () => {
  queryHelper.getReadingMessage = jest.fn().mockResolvedValue({
    content: 'a b'
  });

  const initialState = {
    [key]: {
      readingMessage: {},
      formState: formStates.DEFAULT_STATE
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  const testId = 1;
  store.dispatch(actions.load(testId));

  await store.whenComplete(() => {
    const words = selectors.words(store.getState());
    expect(words[0]).toMatchObject({
      index: 0,
      word: 'a',
      viewWord: 'a ',
      afterWord: ' ',
      preWord: ''
    });
    expect(words[1]).toMatchObject({
      index: 1,
      word: 'b',
      viewWord: 'b',
      afterWord: '',
      preWord: ''
    });

    const formState = selectors.formState(store.getState());
    expect(formState).toEqual(formStates.LOADED_STATE);
  });
});

test(`[redux-logic] api return exception`, async () => {
  queryHelper.getReadingMessage = jest.fn().mockResolvedValue(undefined);

  const initialState = {
    [key]: {
      readingMessage: {},
      formState: formStates.DEFAULT_STATE
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  const testId = 1;
  store.dispatch(actions.load(testId));

  await store.whenComplete(() => {
    const formState = selectors.formState(store.getState());
    expect(formState).toEqual(formStates.ERROR_STATE);

    const error = selectors.error(store.getState());
    expect(error).toEqual(errorMessages.readingMessageWasNotFound);
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
    test(`[redux-logic] recognitionFinalWords `, async () => {
      const initialState = {
        [key]: {
          words: baseWords,
          formState: formStates.READING_STATE
        }
      };

      const store = createMockStore({
        initialState,
        reducer,
        logic
      });

      store.dispatch(speechRecognitionActions.finalUpdated(finalText));

      await store.whenComplete(() => {
        const words = selectors.words(store.getState());
        expect(words).toMatchObject(expectedWords);
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
    test(`[redux-logic] recognitionInterimWords ${interimText}`, async () => {
      const initialState = {
        [key]: {
          words: baseWords,
          formState: formStates.READING_STATE
        }
      };

      const store = createMockStore({
        initialState,
        reducer,
        logic
      });

      store.dispatch(speechRecognitionActions.interimUpdated(interimText));

      await store.whenComplete(() => {
        const words = selectors.words(store.getState());
        expect(words).toMatchObject(expectedWords);
      });
    });
  }
);

test(`[redux-logic] UTCTime added on final recognised words `, async () => {
  const initialState = {
    [key]: {
      words: [{ index: 0, word: 'a' }],
      formState: formStates.READING_STATE
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  date.getUTCtime = jest.fn(() => 1);

  store.dispatch(speechRecognitionActions.finalUpdated('a'));

  await store.whenComplete(() => {
    const words = selectors.words(store.getState());
    expect(words[0]).toMatchObject({ index: 0, word: 'a', time: 1 });
  });
});

test(`[redux-logic] UTCTime will not updated on final recognised words`, async () => {
  const initialState = {
    [key]: {
      words: [{ index: 0, word: 'a', time: 1 }]
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  date.getUTCtime = jest.fn(() => 2);

  store.dispatch(speechRecognitionActions.finalUpdated('a'));

  await store.whenComplete(() => {
    const words = selectors.words(store.getState());
    expect(words[0]).toMatchObject({ index: 0, word: 'a', time: 1 });
  });
});

test(`[redux-logic] UTCTime added on interim recognised words `, async () => {
  const initialState = {
    [key]: {
      words: [{ index: 0, word: 'a' }],
      formState: formStates.READING_STATE
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  date.getUTCtime = jest.fn(() => 1);

  store.dispatch(speechRecognitionActions.interimUpdated('a'));

  await store.whenComplete(() => {
    const words = selectors.words(store.getState());
    expect(words[0]).toMatchObject({ index: 0, word: 'a', time: 1 });
  });
});

test(`[redux-logic] UTCTime will not updated on interim recognised words `, async () => {
  const initialState = {
    [key]: {
      words: [{ index: 0, word: 'a', time: 1 }],
      formState: formStates.READING_STATE
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  date.getUTCtime = jest.fn(() => 2);

  store.dispatch(speechRecognitionActions.interimUpdated('a'));

  await store.whenComplete(() => {
    const words = selectors.words(store.getState());
    expect(words[0]).toMatchObject({ index: 0, word: 'a', time: 1 });
  });
});

describe.each([
  [
    [{ index: 0, word: 'a' }],
    'b',
    [
      {
        index: 0,
        word: 'a',
        isNotRecognisedCount: 1
      }
    ]
  ],
  [
    [{ index: 0, word: 'a', isNotRecognisedCount: 1 }],
    'b',
    [
      {
        index: 0,
        word: 'a',
        isNotRecognisedCount: 2
      }
    ]
  ],
  [
    [{ index: 0, word: 'a', isFinalRecognised: true }, { index: 1, word: 'c' }],
    'b',
    [
      {
        index: 0,
        word: 'a'
      },
      {
        index: 1,
        word: 'c',
        isNotRecognisedCount: 1
      }
    ]
  ]
])(
  '[redux-logic] isNotRecognisedCount will be updated',
  (baseWords, finalText, expectedWords) => {
    test(`[redux-logic] isNotRecognisedCount will be updated on final recognised words`, async () => {
      const initialState = {
        [key]: {
          words: baseWords,
          formState: formStates.READING_STATE
        }
      };

      const store = createMockStore({
        initialState,
        reducer,
        logic
      });

      store.dispatch(speechRecognitionActions.finalUpdated(finalText));

      await store.whenComplete(() => {
        const words = selectors.words(store.getState());
        expect(words).toMatchObject(expectedWords);
      });
    });
  }
);

describe.each([
  [
    {
      transcript: undefined,
      formState: formStates.READING_STATE
    },
    'a',
    {
      transcripts: [{ transcriptType: 'final', content: 'a' }],
      transcriptIndex: 0,
      transcript: { transcriptType: 'final', content: 'a' }
    }
  ],
  [
    {
      transcript: {
        transcripts: [{ transcriptType: 'final', content: 'a' }],
        transcriptIndex: 0,
        transcript: { transcriptType: 'final', content: 'a' }
      },
      formState: formStates.READING_STATE
    },
    'b',
    {
      transcripts: [
        { transcriptType: 'final', content: 'a' },
        { transcriptType: 'final', content: 'b' }
      ],
      transcriptIndex: 1,
      transcript: { transcriptType: 'final', content: 'b' }
    }
  ]
])(
  '[redux-logic] final transcript will be updated test cases',
  (initialStateKey, finalText, expectedTranscript) => {
    test(`[redux-logic] final transcript will be added during reading to empty transcript redux`, async () => {
      const initialState = {
        [key]: initialStateKey
      };

      const store = createMockStore({
        initialState,
        reducer,
        logic
      });

      store.dispatch(speechRecognitionActions.finalUpdated(finalText));

      await store.whenComplete(() => {
        const transcript = selectors.transcript(store.getState());
        expect(transcript).toMatchObject(expectedTranscript);
      });
    });
  }
);

describe.each([
  [
    {
      transcript: undefined,
      formState: formStates.READING_STATE
    },
    'a',
    {
      transcripts: [{ transcriptType: 'interim', content: 'a' }],
      transcriptIndex: 0,
      transcript: { transcriptType: 'interim', content: 'a' }
    }
  ],
  [
    {
      transcript: {
        transcripts: [{ transcriptType: 'interim', content: 'a' }],
        transcriptIndex: 0,
        transcript: { transcriptType: 'interim', content: 'a' }
      },
      formState: formStates.READING_STATE
    },
    'b',
    {
      transcripts: [
        { transcriptType: 'interim', content: 'a' },
        { transcriptType: 'interim', content: 'b' }
      ],
      transcriptIndex: 1,
      transcript: { transcriptType: 'interim', content: 'b' }
    }
  ]
])(
  '[redux-logic] interim transcript will be updated test cases',
  (initialStateKey, interimText, expectedTranscript) => {
    test(`[redux-logic] interim transcript will be added during reading to empty transcript redux`, async () => {
      const initialState = {
        [key]: initialStateKey
      };

      const store = createMockStore({
        initialState,
        reducer,
        logic
      });

      store.dispatch(speechRecognitionActions.interimUpdated(interimText));

      await store.whenComplete(() => {
        const transcript = selectors.transcript(store.getState());
        expect(transcript).toMatchObject(expectedTranscript);
      });
    });
  }
);

test(`[redux-logic] final transcript lastRecognisedWordIndex will be updated during reading`, async () => {
  const initialState = {
    [key]: {
      words: [
        { index: 0, word: 'a', isFinalRecognised: true },
        { index: 1, word: 'b' }
      ],
      transcript: {
        content: 'a',
        lastRecognisedWord: undefined,
        recognisedWords: [{ index: 0, word: 'a' }],
        transcriptType: 'final',
        transcripts: [{ transcriptType: 'final', content: 'a' }]
      },
      formState: formStates.READING_STATE
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  store.dispatch(speechRecognitionActions.finalUpdated('b'));

  await store.whenComplete(() => {
    const transcript = selectors.transcript(store.getState());
    expect(transcript).toMatchObject({
      content: 'a',
      lastRecognisedWord: undefined,
      recognisedWords: [{ index: 0, word: 'a' }],
      transcript: {
        content: 'b',
        lastRecognisedWord: { index: 0, isFinalRecognised: true, word: 'a' },
        recognisedWords: [{ index: 1, word: 'b' }],
        transcriptType: 'final'
      },
      transcriptIndex: 1,
      transcriptType: 'final',
      transcripts: [
        { content: 'a', transcriptType: 'final' },
        {
          content: 'b',
          lastRecognisedWord: { index: 0, isFinalRecognised: true, word: 'a' },
          recognisedWords: [{ index: 1, word: 'b' }],
          transcriptType: 'final'
        }
      ]
    });
  });
});
