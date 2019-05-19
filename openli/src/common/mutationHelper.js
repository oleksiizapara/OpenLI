import * as mutations from 'graphql_custom/mutations';
import { graphqlOperation, Analytics, API } from 'aws-amplify';
import logger from './logger';
import { readingMessagePrepareToSave } from './common';

const assertErrors = response => {
  if (response && response.errors && response.errors.length > 0) {
    throw new Error(response.errors.join('\n'));
  }
};

export const createUser = async user => {
  try {
    const response = await API.graphql(
      graphqlOperation(mutations.createUser, { input: user })
    );
    assertErrors(response);
    return response.data.createUser;
  } catch (e) {
    Analytics.record({
      name: 'CreateUserError',
      attributes: {
        error: e.message
      }
    });
    logger.debug('CreateUserError', e);
  }
};

export const createReadingMessage = async message => {
  try {
    const savingMessage = readingMessagePrepareToSave(message);

    const response = await API.graphql(
      graphqlOperation(mutations.createReadingMessage, { input: savingMessage })
    );
    assertErrors(response);
    return response.data.createReadingMessage;
  } catch (e) {
    Analytics.record({
      name: 'createReadingMessageError',
      attributes: {
        error: e.message
      }
    });
    logger.debug('createReadingMessageError', e);
  }
};

export const updateReadingMessage = async message => {
  try {
    const savingMessage = readingMessagePrepareToSave(message);

    const response = await API.graphql(
      graphqlOperation(mutations.updateReadingMessage, { input: savingMessage })
    );
    assertErrors(response);
    return response.data.updateReadingMessage;
  } catch (e) {
    Analytics.record({
      name: 'updateReadingMessageError',
      attributes: {
        error: e.message
      }
    });
    logger.debug('updateReadingMessageError', e);
  }
};

export const deleteReadingMessage = async id => {
  try {
    const response = await API.graphql(
      graphqlOperation(mutations.deleteReadingMessage, { input: id })
    );
    assertErrors(response);
    return response.data.deleteReadingMessage;
  } catch (e) {
    Analytics.record({
      name: 'deleteReadingMessageError',
      attributes: {
        error: e.message
      }
    });
    logger.debug('deleteReadingMessageError', e);
  }
};
