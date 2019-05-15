export const key = 'settings';

export const USER_UPDATED = `${key} USER_UPDATED`;
export const USER_UNREGISTERED = `${key} USER_UNREGISTERED`;

export const actionTypes = {
  USER_UPDATED
};

const userUpdated = user => ({
  type: USER_UPDATED,
  payload: { user }
});

const userUnregistered = () => ({
  type: USER_UNREGISTERED,
  payload: {}
});

export const actions = { userUpdated, userUnregistered };
