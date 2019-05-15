export const key = 'settings';

export const USER_UPDATED = `${key} USER_UPDATED`;

export const actionTypes = {
  USER_UPDATED
};

const userUpdated = user => ({
  type: USER_UPDATED,
  payload: { user }
});

export const actions = { userUpdated };
