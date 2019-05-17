export const key = 'readingMessage';

const TO_DEFAULT = `[${key}] TO_DEFAULT`;
const CREATE = `[${key}] CREATE`;
const LOAD = `[${key}] LOAD`;
const LOADED = `[${key}] LOADED`;
const UPDATED = `[${key}] UPDATED`;
const PUBLISH = `[${key}] PUBLISH`;
const PUBLISHED = `[${key}] PUBLISHED`;
const ERROR = `[${key}] ERROR`;

export const actionTypes = {
  TO_DEFAULT,
  CREATE,
  LOAD,
  LOADED,
  UPDATED,
  PUBLISH,
  PUBLISHED,
  ERROR
};

const DEFAULT_STATE = 'DEFAULT_STATE';
const LOADING_STATE = 'LOADING_STATE';
const LOADED_STATE = 'LOADED_STATE';
const PUBLISHING_STATE = 'PUBLISHING_STATE';
const PUBLISHED_STATE = 'PUBLISHED_STATE';
const ERROR_STATE = 'ERROR_STATE';

export const formStates = {
  DEFAULT_STATE,
  LOADING_STATE,
  LOADED_STATE,
  PUBLISHING_STATE,
  PUBLISHED_STATE,
  ERROR_STATE
};

const toDefault = () => ({
  type: LOAD,
  payload: {}
});

const load = id => ({
  type: LOAD,
  payload: {
    id
  }
});

const loaded = () => ({
  type: LOADED,
  payload: {}
});

const create = () => ({
  type: CREATE,
  payload: {}
});

const updated = readingMessage => ({
  type: UPDATED,
  payload: {
    readingMessage
  }
});

const publish = readingMessage => ({
  type: PUBLISH,
  payload: {
    readingMessage
  }
});

const published = readingMessage => ({
  type: PUBLISHED,
  payload: {
    readingMessage
  }
});

const error = error => ({
  type: ERROR,
  payload: {
    error
  }
});

export const actions = {
  toDefault,
  create,
  load,
  loaded,
  updated,
  publish,
  published,
  error
};
