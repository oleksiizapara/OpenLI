// eslint-disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    readingMessages {
      items {
        id
        authorId
        title
        content
        createdAt
        updatedAt
      }
      nextToken
    }
    createdAt
    updatedAt
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      username
      readingMessages {
        nextToken
      }
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const getReadingMessage = `query GetReadingMessage($id: ID!) {
  getReadingMessage(id: $id) {
    id
    author {
      id
      username
      readingMessages {
        nextToken
      }
      createdAt
      updatedAt
    }
    authorId
    title
    content
    createdAt
    updatedAt
  }
}
`;
export const listReadingMessages = `query ListReadingMessages(
  $filter: ModelReadingMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listReadingMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      author {
        id
        username
        createdAt
        updatedAt
      }
      authorId
      title
      content
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
