export const key = 'readingMessage';

const CREATE = `[${key}] CREATE`;
const LOAD = `[${key}] LOAD`;
const LOADED = `[${key}] LOADED`;
const UPDATED = `[${key}] UPDATED`;
const PUBLISH = `[${key}] PUBLISH`;
const PUBLISHED = `[${key}] PUBLISHED`;
const ERROR = `[${key}] ERROR`;

export const actionTypes = {
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

export const load = (identifier, id) => ({
  type: LOAD,
  payload: {
    identifier,
    id
  }
});

export const loaded = () => ({
  type: LOADED,
  payload: {}
});

export const create = identifier => ({
  type: CREATE,
  payload: {
    identifier
  }
});

export const updated = readingMessage => ({
  type: UPDATED,
  payload: {
    readingMessage
  }
});

export const publish = readingMessage => ({
  type: PUBLISH,
  payload: {
    readingMessage
  }
});

export const published = readingMessage => ({
  type: PUBLISHED,
  payload: {
    readingMessage
  }
});

export const error = () => ({
  type: ERROR,
  payload: {}
});

export const actions = {
  create,
  load,
  loaded,
  updated,
  publish,
  published,
  error
};
