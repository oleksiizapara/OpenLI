// eslint-disable
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    username
    readingMessages {
      items {
        id
        authorId
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    username
    readingMessages {
      items {
        id
        authorId
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
    username
    readingMessages {
      items {
        id
        authorId
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
export const createReadingMessage = `mutation CreateReadingMessage($input: CreateReadingMessageInput!) {
  createReadingMessage(input: $input) {
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
    content
    createdAt
    updatedAt
  }
}
`;
export const updateReadingMessage = `mutation UpdateReadingMessage($input: UpdateReadingMessageInput!) {
  updateReadingMessage(input: $input) {
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
    content
    createdAt
    updatedAt
  }
}
`;
export const deleteReadingMessage = `mutation DeleteReadingMessage($input: DeleteReadingMessageInput!) {
  deleteReadingMessage(input: $input) {
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
    content
    createdAt
    updatedAt
  }
}
`;
