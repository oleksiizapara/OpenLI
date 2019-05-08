import * as mutations from './graphql/mutations';
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

// export const createConvo = async (user1, user2) => {
//     try {
//         const members = [user1, user2].sort()
//         const conversationName = members.join(' and ');
//         const conversationResponse = await API.graphql(
//             graphqlOperation(
//                 mutations.CreateConvo, {
//                     input: {
//                         name: conversationName,
//                         members
//                     }
//                 }
//             )
//         );
//         assertErrors(conversationResponse);
//         const userConversation1Response = await API.graphql(
//             graphqlOperation(
//                 mutations.CreateConvoLink, {
//                     input: {
//                         convoLinkUserId: user1,
//                         convoLinkConversationId: conversationResponse.data.createConvo.id
//                     }
//                 }
//             )
//         );
//         assertErrors(userConversation1Response);
//         const userConversation2Response = await API.graphql(
//             graphqlOperation(
//                 mutations.CreateConvoLink, {
//                     input: {
//                         convoLinkUserId: user2,
//                         convoLinkConversationId: conversationResponse.data.createConvo.id
//                     }
//                 }
//             )
//         );
//         assertErrors(userConversation2Response);
//     } catch (e) {
//         Analytics.record({
//             name: 'CreateConvoError',
//             attributes: {
//                 error: e.message
//             }
//         })
//     }
// }

// export const createMessage = async message => {
//   try {
//     const response = await API.graphql(
//       graphqlOperation(mutations.CreateMessage, { input: message })
//     );
//     assertErrors(response);
//     return response.data.createMessage;
//   } catch (e) {
//     Analytics.record({
//       name: 'CreateMessageError',
//       attributes: {
//         error: e.message
//       }
//     });
//   }
// };
