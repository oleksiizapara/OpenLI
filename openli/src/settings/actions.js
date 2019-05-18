export const key = 'settings';

const USER_UPDATED = `[${key}] USER_UPDATED`;
const USER_UNREGISTERED = `[${key}] USER_UNREGISTERED`;
const USER_FETCH = `[${key}] USER_FETCH`;

export const actionTypes = {
  USER_UPDATED,
  USER_UNREGISTERED,
  USER_FETCH
};

const userUpdated = user => ({
  type: USER_UPDATED,
  payload: { user }
});

const userUnregistered = () => ({
  type: USER_UNREGISTERED,
  payload: {}
});

const userFetch = () => ({
  type: USER_FETCH,
  payload: {}
});

export const actions = { userUpdated, userUnregistered, userFetch };
