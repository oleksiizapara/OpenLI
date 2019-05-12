import { actionTypes, actions } from './actions';

import { createLogic } from 'redux-logic';

import * as queryHelper from 'common/queryHelper';
import * as mutationHelper from 'common/mutationHelper';

import { errorMessages } from 'common/errorMessages';

export const loadingReadingMessage = createLogic({
  type: actionTypes.LOAD,
  latest: true,

  processOptions: {
    dispatchReturn: true
  },

  async process({ action }, dispatch, done) {
    const { id } = action.payload;

    const readingMessage = await queryHelper.getReadingMessage(id);

    if (!readingMessage) {
      dispatch(actions.error(errorMessages.READING_MESSAGE_WAS_NOT_FOUND));
      done();
      return;
    }

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

  async process({ action }, dispatch, done) {
    const { readingMessage } = action.payload;

    if (readingMessage.id !== '') {
      const newReadingMessage = await mutationHelper.updateReadingMessage(
        readingMessage
      );

      if (!newReadingMessage) {
        dispatch(actions.error(errorMessages.READING_MESSAGE_WAS_NOT_UPDATED));
        done();
        return;
      }

      dispatch(actions.published(newReadingMessage));
      done();
    } else {
      const newReadingMessage = await mutationHelper.createReadingMessage(
        readingMessage
      );

      if (!newReadingMessage) {
        dispatch(actions.error(errorMessages.READING_MESSAGE_WAS_NOT_UPDATED));
        done();
        return;
      }

      dispatch(actions.published(newReadingMessage));
      done();
    }
  }
});

export default [loadingReadingMessage, publishReadingMessage];
