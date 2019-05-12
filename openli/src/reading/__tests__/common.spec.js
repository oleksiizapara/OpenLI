import {
  splitTextOnWords,
  recogniseWords,
  validateRecognizedWords,
  getTooltipWordIndex
} from '../common';

describe.each([
  ['', []],
  ['1', [{ index: 0, word: '1', viewWord: '1', afterWord: '', preWord: '' }]],
  ['a', [{ index: 0, word: 'a', viewWord: 'a', afterWord: '', preWord: '' }]],
  [
    'a ',
    [{ index: 0, word: 'a', viewWord: 'a ', afterWord: ' ', preWord: '' }]
  ],
  [
    'a. ',
    [{ index: 0, word: 'a', viewWord: 'a. ', afterWord: '. ', preWord: '' }]
  ],
  [
    'a.b',
    [
      { index: 0, word: 'a', viewWord: 'a.', afterWord: '.', preWord: '' },
      { index: 1, word: 'b', viewWord: 'b', afterWord: '', preWord: '' }
    ]
  ],
  [
    'a-b',
    [
      { index: 0, word: 'a', viewWord: 'a-', afterWord: '-', preWord: '' },
      { index: 1, word: 'b', viewWord: 'b', afterWord: '', preWord: '' }
    ]
  ],
  ['.a', [{ index: 0, word: 'a', viewWord: '.a', afterWord: '', preWord: '.' }]]
])('', (text, expectedWords) => {
  test(`[reading common.js].splitTextOnWords '${text}'`, () => {
    const words = splitTextOnWords(text);
    expect(words).toEqual(expectedWords);
  });
});

describe.each([
  [[{ index: 0, word: 'a' }], [{ index: 0, word: 'b' }], [-1]],
  [[{ index: 0, word: 'a' }], [{ index: 0, word: 'a' }], [0]],
  [[{ index: 0, word: 'a' }], [{ index: 0, word: 'A' }], [0]],
  [[{ index: 0, word: 'A' }], [{ index: 0, word: 'a' }], [0]],
  [
    [{ index: 0, word: 'a' }, { index: 1, word: 'a' }],
    [{ index: 0, word: 'a' }],
    [0, -1]
  ],
  [
    [{ index: 0, word: 'a' }, { index: 1, word: 'b' }],
    [{ index: 0, word: 'a' }],
    [0, -1]
  ],
  [
    [{ index: 0, word: 'b' }, { index: 1, word: 'a' }],
    [{ index: 0, word: 'a' }],
    [-1, 0]
  ],
  [
    [{ index: 0, word: 'a' }, { index: 1, word: 'b' }, { index: 2, word: 'c' }],
    [{ index: 0, word: 'b' }, { index: 1, word: 'c' }],
    [-1, 0, 1]
  ],
  [
    [{ index: 0, word: 'c' }, { index: 1, word: 'b' }, { index: 2, word: 'a' }],
    [{ index: 0, word: 'a' }, { index: 1, word: 'b' }],
    [-1, 1, 0]
  ]
])('', (words, possibleRecognisedWords, expectedRecognisedWordIndexes) => {
  test(`[reading common.js].recogniseWords '${words}'`, () => {
    const recognisedWordIndexes = recogniseWords(
      words,
      possibleRecognisedWords
    );
    expect(recognisedWordIndexes).toEqual(expectedRecognisedWordIndexes);
  });
});

describe.each([
  [[], []],
  [[0], [0]],
  [[-1], [-1]],
  [[1], [1]],
  [[2], [-1]],
  [[3], [-1]],
  [[0, 1], [0, 1]],
  [[0, -1], [-1, -1]],
  [[0, 1, -1], [0, 1, -1]],
  [[0, -1, 2], [-1, -1, -1]],
  [[0, -1, 1], [0, -1, 1]],
  [[-1, 0, 1], [-1, 0, 1]],
  [[-1, 1, 2], [-1, 1, 2]],
  [[-1, 1, 2, 3], [-1, 1, 2, 3]]
])('bla bla', (recognisedWords, expectedValidatedWords) => {
  test(`[reading common.js].validateRecognizedWords `, () => {
    const validatedWords = validateRecognizedWords(recognisedWords);
    expect(validatedWords).toEqual(expectedValidatedWords);
  });
});

describe.each([
  [[], -1],
  [[{ index: 0, word: 'e' }], 0],
  [[{ index: 0, word: 'e', isFinalRecognised: true }], 0],
  [
    [{ index: 0, word: 'e', isFinalRecognised: true }, { index: 1, word: 'e' }],
    0
  ],
  [
    [
      { index: 0, word: 'e', isFinalRecognised: true },
      { index: 1, word: 'e', isInterimRecognised: true }
    ],
    0
  ],
  [
    [
      { index: 0, word: 'e', isFinalRecognised: true },
      { index: 1, word: 'e', isInterimRecognised: true },
      { index: 2, word: 'e', isFinalRecognised: true },
      { index: 3, word: 'e' }
    ],
    2
  ],
  [
    [
      { index: 0, word: 'e', isFinalRecognised: true },
      { index: 1, word: 'e', isInterimRecognised: true },
      { index: 2, word: 'e', isFinalRecognised: true },
      { index: 3, word: 'e', isInterimRecognised: true }
    ],
    2
  ]
])(`[redux-logic] getTooltipWordIndex`, (words, expectedIndex) => {
  test(`[redux-logic] getTooltipWordIndex ${JSON.stringify(
    words
  )} expectedIndex = ${expectedIndex}`, () => {
    const index = getTooltipWordIndex(words);
    expect(index).toEqual(expectedIndex);
  });
});
