import Enumerable from 'linq';

export const calculateTotalWordCount = words => words.length;

export const calculateReadingSpeed = words => {
  if (words.length <= 1) {
    return 0;
  }

  const firstWordTime = words[0].time;
  const lastWordTime = words[words.length - 1].time;

  return Math.round(
    (calculateTotalWordCount(words) * 60 * 1000) /
      (lastWordTime - firstWordTime)
  );
};

const dirtyCalculateRecognisedWords = words => {
  return Enumerable.from(words)
    .where(x => !('isNotRecognisedCount' in x))
    .select(x => x.word)
    .distinct()
    .orderBy(x => x)
    .toArray();
};

export const calculateRecognisedWords = words => {
  return Enumerable.from(dirtyCalculateRecognisedWords(words))
    .except(dirtyCalculateNotRecognisedWords(words))
    .toArray();
};

const dirtyCalculateNotRecognisedWords = words => {
  return Enumerable.from(words)
    .where(x => x.isNotRecognisedCount > 0)
    .select(x => x.word)
    .distinct()
    .orderBy(x => x)
    .toArray();
};

export const calculateNotRecognisedWords = words => {
  return Enumerable.from(dirtyCalculateNotRecognisedWords(words)).toArray();
};
