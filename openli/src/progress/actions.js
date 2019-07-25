export const key = 'progress';

const ERROR = `[${key}] ERROR`;
const TO_DEFAULT = `[${key}] TO_DEFAULT`;
const LOAD = `[${key}] LOAD`;
const LOADED = `[${key}] LOADED`;

export const actionTypes = {
  LOAD,
  LOADED,
  ERROR,
  TO_DEFAULT
};

export const DEFAULT_STATE = 'DEFAULT_STATE';
export const LOADED_STATE = 'LOADED_STATE';
export const LOADING_STATE = 'LOADING_STATE';
export const ERROR_STATE = 'ERROR_STATE';

export const formStates = {
  DEFAULT_STATE,
  LOADING_STATE,
  LOADED_STATE,
  ERROR_STATE
};

const load = () => ({
  type: actionTypes.LOAD,
  payload: {}
});

const loaded = messageProgresses => ({
  type: actionTypes.LOADED,
  payload: {
    messageProgresses
  }
});

const error = error => ({
  type: actionTypes.ERROR,
  payload: {
    error
  }
});

const toDefault = () => ({
  type: actionTypes.TO_DEFAULT,
  payload: {}
});

export const actions = {
  load,
  loaded,
  error,
  toDefault
};
