import Enumerable from 'linq';
import produce from 'immer';

import { actionTypes as speechRecognitionActionTypes } from 'speechRecognition/actions';

import { formStates } from './actions';

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

export const recogniseWords = (words, possibleRecognisedWords) => {
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
    // eslint-disable-next-line no-unused-vars
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

export const calculateNotRecognisedWords = (words, recognisedWordIndexes) => {
  return words.length > 0 &&
    recognisedWordIndexes.length > 0 &&
    recognisedWordIndexes[0] === -1
    ? [words[0].index]
    : [];
};

export const updateTranscript = (
  action,
  transcript,
  lastRecognisedWord,
  recognisedWords
) => {
  var newTranscript = undefined;
  if (action.type === speechRecognitionActionTypes.FINAL_UPDATED) {
    newTranscript = {
      transcriptType: 'final',
      content: action.payload.finalTranscript,
      lastRecognisedWord,
      recognisedWords
    };
  }
  if (action.type === speechRecognitionActionTypes.INTERIM_UPDATED) {
    newTranscript = {
      transcriptType: 'interim',
      content: action.payload.interimTranscript,
      lastRecognisedWord,
      recognisedWords
    };
  }
  if (newTranscript) {
    if (!transcript) {
      return {
        transcripts: [newTranscript],
        transcriptIndex: 0,
        transcript: newTranscript
      };
    } else {
      const updatedTranscript = produce(transcript, draft => {
        draft.transcripts.push(newTranscript);
        draft.transcriptIndex = draft.transcripts.length - 1;
        draft.transcript = newTranscript;
      });
      return updatedTranscript;
    }
  }

  return undefined;
};
