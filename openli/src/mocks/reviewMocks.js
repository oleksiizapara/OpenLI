import { formStates } from 'review/actions';

export const reviewLoadedMock = {
  formState: formStates.DEFAULT_STATE,
  error: '',

  words: [],
  readingMessageId: 'uniqueId',
  totalWords: 100,
  readingSpeed: 90,
  recognisedWords: ['apple', 'home'],
  notRecognisedWords: ['building', 'maps']
};
