// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'reading';

// action type constants
export const ACTIVE_STEP_UPDATED = '[reading] ACTIVE_STEP_UPDATED';
export const NEXT_STEP = '[reading] NEXT_STEP';
export const PREVIOUS_STEP = '[reading] PREVIOUS_STEP';

export const TEXT_UPDATED = '[reading] TEXT_UPDATED';
export const WORDS_UPDATED = '[reading] WORDS_UPDATED';
export const WORDS_UPDATE_STARTED = '[reading] WORDS_UPDATE_STARTED';
export const WORDS_UPDATE_FINISHED = '[reading] WORDS_UPDATE_FINISHED';

// wizard form state
export const TEXT_LOADING_STATE = 'TEXT_LOADING_STATE';
export const READING_STATE = 'READING_STATE';
export const REVIEW_STATE = 'REVIEW_STATE';

export const actionTypes = {
  ACTIVE_STEP_UPDATED,
  NEXT_STEP,
  PREVIOUS_STEP,
  TEXT_UPDATED,
  WORDS_UPDATED,
  WORDS_UPDATE_STARTED,
  WORDS_UPDATE_FINISHED
};

// action creators
export const textUpdated = text => ({
  type: TEXT_UPDATED,
  payload: {
    text
  }
});

export const activeStepUpdated = activeStep => ({
  type: ACTIVE_STEP_UPDATED,
  payload: {
    activeStep
  }
});

export const nextStep = () => ({
  type: NEXT_STEP,
  payload: {}
});

export const previousStep = () => ({
  type: PREVIOUS_STEP,
  payload: {}
});

export const wordsUpdated = words => ({
  type: WORDS_UPDATED,
  payload: {
    words
  }
});

export const statusUpdated = type => ({
  type: type,
  payload: {}
});

export const actions = {
  textUpdated,
  activeStepUpdated,
  nextStep,
  previousStep,
  wordsUpdated,
  statusUpdated
};
