import Enumerable from 'linq';

export const splitTextOnWords = text => {
  if (text) {
    var viewWords = text.match(/[\w]+[^\w]*/g);
    const words = viewWords.map((rawViewWord, index) => {
      const word = rawViewWord.match(/[\w]+/g)[0];
      const preWord = index === 0 ? text.substring(0, text.indexOf(word)) : '';
      const afterWord = rawViewWord.substring(word.length, rawViewWord.length);
      const viewWord = preWord + rawViewWord;
      return {
        index: index,
        viewWord: viewWord,
        preWord: preWord,
        word: word,
        afterWord: afterWord
      };
    });

    return words;
  }

  return [];
};

export const recogniseWords = (words, possibleRecognisedWords, settings) => {
  const possibleRecognisedWordDictionary = Enumerable.from(
    possibleRecognisedWords
  )
    .groupBy('$.word', '$', (key, group) => {
      return {
        recognisedWord: key.toLowerCase(),
        words: group.orderByDescending('$.index').toArray()
      };
    })
    .toDictionary('$.recognisedWord', '$.words');

  const tempList = Enumerable.from(words).select(x => {
    const recognisedWords = possibleRecognisedWordDictionary.get(
      x.word.toLowerCase()
    );
    const recognisedWord = recognisedWords ? recognisedWords.pop() : '';
    return {
      word: x,
      recognisedWords: recognisedWords,
      recognisedWord: recognisedWord
    };
  });

  var recWords = [];
  Enumerable.from(tempList).forEach(x => {
    if (x.recognisedWord) {
      recWords = [...recWords, x.recognisedWord.index];
    } else {
      recWords = [...recWords, -1];
    }
  });

  return recWords;
};

export const validateRecognizedWords = recognisedWords => {
  const unrecognizedWordsCount = Enumerable.from(recognisedWords)
    .where(x => x === -1)
    .count();

  const allUnrecognizedWords = Enumerable.from(recognisedWords)
    .select(x => -1)
    .toArray();

  const allRecognizedWords = Enumerable.from(recognisedWords)
    .where(x => x !== -1)
    .toArray();

  if (
    recognisedWords.length > 0 &&
    (unrecognizedWordsCount === 0 ||
      recognisedWords.length / unrecognizedWordsCount >= 3)
  ) {
    var previousIndex = 0;
    for (var wordIndex in allRecognizedWords) {
      if (allRecognizedWords[wordIndex] > previousIndex + 1) {
        return allUnrecognizedWords;
      }
      previousIndex = allRecognizedWords[wordIndex];
    }

    return recognisedWords;
  }

  return allUnrecognizedWords;
};

export const getTooltipWordIndex = words => {
  var index = words.length > 0 ? 0 : -1;

  for (var i = 0; i < words.length; i++) {
    if (
      'isFinalRecognised' in words[i] &&
      words[i].isFinalRecognised === true
    ) {
      index = i;
    }
  }

  return index;
};
