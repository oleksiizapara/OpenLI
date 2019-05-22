export const key = 'readingSearch';

const SEARCH = `[${key}] SEARCH`;
const ERROR = `[${key}] ERROR`;
const TO_DEFAULT = `[${key}] TO_DEFAULT`;
const PAGE_UPDATED = `[${key}] PAGE_UPDATED`;

export const actionTypes = {
  SEARCH,
  ERROR,
  TO_DEFAULT,
  PAGE_UPDATED
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

const search = ({ searchText, pageId }) => ({
  type: actionTypes.SEARCH,
  payload: {
    pageId,
    searchText
  }
});

const error = error => ({
  type: actionTypes.ERROR,
  payload: {
    error
  }
});

const pagesUpdated = ({ pages, messages, activePage, totalPages }) => ({
  type: actionTypes.PAGE_UPDATED,
  payload: {
    pages,
    messages,
    activePage,
    totalPages
  }
});

const toDefault = () => ({
  type: actionTypes.TO_DEFAULT,
  payload: {}
});

export const actions = {
  search,
  error,
  pagesUpdated,
  toDefault
};
