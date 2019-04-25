// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'speechRecognition';

// action type constants
export const FINAL_UPDATED = '[speechRecognition] FINAL_UPDATED';
export const INTERIM_UPDATED = '[speechRecognition] INTERIM_UPDATED';
export const LISTENING_UPDATED = '[speechRecognition] LISTENING_UPDATED';

export const actionTypes = {
  FINAL_UPDATED,
  INTERIM_UPDATED,
  LISTENING_UPDATED
};

// action creators
export const finalUpdated = final => ({
  type: FINAL_UPDATED,
  payload: {
    final
  }
});

export const interimUpdated = interim => ({
  type: INTERIM_UPDATED,
  payload: {
    interim
  }
});

export const listeningUpdated = listening => ({
  type: LISTENING_UPDATED,
  payload: {
    listening
  }
});

export const actions = {
  finalUpdated: finalUpdated,
  interimUpdated: interimUpdated,
  listeningUpdated: listeningUpdated
};
