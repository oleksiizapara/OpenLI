import produce from 'immer';

export const readingMessagePrepareToSave = readingMessage => {
  return produce(readingMessage, draft => {
    delete draft.author;
  });
};
