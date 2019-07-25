import produce from 'immer';

export const readingMessagePrepareToSave = readingMessage => {
  return produce(readingMessage, draft => {
    delete draft.author;
  });
};

export const readingMessageHistoryPrepareToSave = history => {
  return produce(history, draft => {
    draft.words.forEach(word => {
      delete word.viewWord;
      delete word.preWord;
      delete word.afterWord;
      delete word.isInterimRecognised;
      delete word.isFinalRecognised;
    });
  });
};

export const calculateTotalPages = page => {
  return page.nextToken ? page.pageId + 1 : page.pageId;
};
