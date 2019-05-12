import {
  calculateTotalWordCount,
  calculateReadingSpeed,
  calculateRecognisedWords,
  calculateNotRecognisedWords
} from '../common';

describe.each([[[], 0], [[{}], 1]])('', (words, wordCount) => {
  test(`Calculate Total Word Count, words: ${JSON.stringify(
    words
  )}, totalLength: ${wordCount}`, () => {
    const calculatedTotalWordCount = calculateTotalWordCount(words);

    expect(calculatedTotalWordCount).toEqual(wordCount);
  });
});

describe.each([
  [[{ time: 1 }], 0],
  [[{ time: 1 }, { time: 3 }], 1],
  [[{ time: 1 }, { time: 2 }, { time: 4 }], 1]
])('', (words, wordCount) => {
  test(`calculate Reading Speed, words: ${JSON.stringify(
    words
  )}, totalLength: ${wordCount}`, () => {
    const calculatedReadingSpeed = calculateReadingSpeed(words);

    expect(calculatedReadingSpeed).toEqual(wordCount);
  });
});

describe.each([
  [[], []],
  [[{ word: 'a' }], [{ word: 'a' }]],
  [[{ word: 'a', isNotRecognisedCount: 1 }], []]
])('', (words, recognisedWords) => {
  test(`calculate Recognised Words, words: ${JSON.stringify(words)}`, () => {
    const calculatedRecognisedWords = calculateRecognisedWords(words);

    expect(calculatedRecognisedWords).toEqual(recognisedWords);
  });
});

describe.each([
  [[], []],
  [[{ word: 'a' }], []],
  [[{ isNotRecognisedCount: 1 }], [{ isNotRecognisedCount: 1 }]]
])('', (words, notRecognisedWoeds) => {
  test(`calculate Recognised Words, words: ${JSON.stringify(words)}`, () => {
    const calculatedNotRecognisedWords = calculateNotRecognisedWords(words);

    expect(calculatedNotRecognisedWords).toEqual(notRecognisedWoeds);
  });
});
