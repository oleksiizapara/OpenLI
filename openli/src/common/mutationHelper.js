import * as mutations from 'graphql_custom/mutations';
import { graphqlOperation, Analytics, API } from 'aws-amplify';

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
    console.log(e);
  }
};

export const createReadingMessage = async message => {
  try {
    console.log(message);
    const response = await API.graphql(
      graphqlOperation(mutations.createReadingMessage, { input: message })
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
    console.log(e);
  }
};

export const updateReadingMessage = async message => {
  try {
    const response = await API.graphql(
      graphqlOperation(mutations.updateReadingMessage, { input: message })
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
    console.log(e);
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
    console.log(e);
  }
};
