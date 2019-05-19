// eslint-disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    name
    familyName
    readingMessages {
      items {
        id
        authorId
        title
        content
        createdAt
        updatedAt
        access
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
      name
      familyName
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
      name
      familyName
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
    access
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
        name
        familyName
        createdAt
        updatedAt
      }
      authorId
      title
      content
      createdAt
      updatedAt
      access
    }
    nextToken
  }
}
`;
