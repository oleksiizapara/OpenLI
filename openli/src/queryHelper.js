import * as queries from './graphql/queries';
import { graphqlOperation, Analytics, API } from 'aws-amplify';

const assertErrors = response => {
  if (response && response.errors && response.errors.length > 0) {
    throw new Error(response.errors.join('\n'));
  }
};

export const getUser = async username => {
  try {
    const response = await API.graphql(
      graphqlOperation(queries.getUser, { id: username })
    );
    assertErrors(response);
    return response.data.getUser;
  } catch (e) {
    Analytics.record({
      name: 'GetUserError',
      attributes: {
        error: e.message
      }
    });
    console.log(e);
  }
};

export const getReadingMessage = async id => {
  try {
    const response = await API.graphql(
      graphqlOperation(queries.getReadingMessage, { id: id })
    );
    assertErrors(response);
    return response.data.getReadingMessage;
  } catch (e) {
    Analytics.record({
      name: 'getReadingMessageError',
      attributes: {
        error: e.message
      }
    });
    console.log(e);
  }
};
