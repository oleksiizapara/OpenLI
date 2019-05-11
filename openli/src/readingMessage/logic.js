import { key, actionTypes, actions } from './actions';

import { createLogic } from 'redux-logic';

import * as queryHelper from '../queryHelper';
import * as mutationHelper from '../mutationHelper';

export const loadingReadingMessage = createLogic({
  type: actionTypes.LOAD,
  latest: true,

  processOptions: {
    dispatchReturn: true
  },

  async process({ getState, action }, dispatch, done) {
    const { id } = action.payload;

    const readingMessage = await queryHelper.getReadingMessage(id);
    dispatch(actions.updated(readingMessage));
    dispatch(actions.loaded());
    done();
  }
});

export const publishReadingMessage = createLogic({
  type: actionTypes.PUBLISH,
  latest: true,

  processOptions: {
    dispatchReturn: true
  },

  async process({ getState, action }, dispatch, done) {
    try {
      const { readingMessage } = action.payload;

      if ('id' in readingMessage) {
        const readingMessage = await mutationHelper.updateReadingMessage(
          readingMessage
        );

        dispatch(actions.published(readingMessage));
      } else {
        const newReadingMessage = await mutationHelper.createReadingMessage(
          readingMessage
        );

        dispatch(actions.published(newReadingMessage));
      }
      done();
    } catch (e) {
      console.log(e);
    }
  }
});

export default [loadingReadingMessage, publishReadingMessage];
