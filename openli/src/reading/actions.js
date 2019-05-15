export const key = 'reading';

export const LOAD = `[${key}] LOAD`;
export const LOADED = `[${key}] LOADED`;
export const READ_STARTED = `[${key}] READ_STARTED`;
export const READ_FINISHED = `[${key}] READ_FINISHED`;
export const ERROR = `[${key}] ERROR`;
export const UPDATE_READING_MESSAGE = `[${key}] UPDATE_READING_MESSAGE`;
export const UPDATE_WORDS = `[${key}] UPDATE_WORDS`;
export const UPDATE_TRANSCRIPT = `[${key}] UPDATE_TRANSCRIPT`;

export const actionTypes = {
  LOAD,
  LOADED,
  READ_STARTED,
  READ_FINISHED,
  ERROR,
  UPDATE_READING_MESSAGE,
  UPDATE_WORDS,
  UPDATE_TRANSCRIPT
};

export const DEFAULT_STATE = 'DEFAULT_STATE';
export const LOADING_STATE = 'LOADING_STATE';
export const LOADED_STATE = 'LOADED_STATE';
export const READING_STATE = 'READING_STATE';
export const REVIEW_STATE = 'REVIEW_STATE';
export const ERROR_STATE = 'ERROR_STATE';

export const formStates = {
  DEFAULT_STATE,
  LOADING_STATE,
  LOADED_STATE,
  READING_STATE,
  REVIEW_STATE,
  ERROR_STATE
};

export const load = id => ({
  type: actionTypes.LOAD,
  payload: {
    id
  }
});

export const loaded = () => ({
  type: actionTypes.LOADED,
  payload: {}
});

export const startReading = () => ({
  type: actionTypes.READ_STARTED,
  payload: {}
});

export const finishReading = () => ({
  type: actionTypes.READ_FINISHED,
  payload: {}
});

export const error = error => ({
  type: actionTypes.ERROR,
  payload: {
    error
  }
});

export const updateReadingMessage = readingMessage => ({
  type: actionTypes.UPDATE_READING_MESSAGE,
  payload: {
    readingMessage
  }
});

export const updateWords = words => ({
  type: actionTypes.UPDATE_WORDS,
  payload: {
    words
  }
});

export const updateTranscript = transcript => ({
  type: actionTypes.UPDATE_TRANSCRIPT,
  payload: {
    transcript
  }
});

export const actions = {
  load,
  loaded,
  startReading,
  finishReading,
  updateTranscript,
  error,
  updateReadingMessage,
  updateWords
};
