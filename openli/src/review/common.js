import Enumerable from 'linq';

export const calculateTotalWordCount = words => words.length;

export const calculateReadingSpeed = words => {
  if (words.length <= 1) {
    return 0;
  }

  const firstWordTime = words[0].time;
  const lastWordTime = words[words.length - 1].time;

  return (lastWordTime - firstWordTime) / calculateTotalWordCount(words);
};

export const calculateRecognisedWords = words => {
  return Enumerable.from(words)
    .where(x => !('isNotRecognisedCount' in x))
    .toArray();
};

export const calculateNotRecognisedWords = words => {
  return Enumerable.from(words)
    .where(x => x.isNotRecognisedCount > 0)
    .toArray();
};
