import produce from 'immer';

export const readingMessagePrepareToSave = readingMessage => {
  return produce(readingMessage, draft => {
    delete draft.author;
  });
};

export const calculateTotalPages = page => {
  return page.nextToken ? page.pageId + 1 : page.pageId;
};
