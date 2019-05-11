// eslint-disable

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    username
    createdAt
    updatedAt
  }
}
`;

export const createReadingMessage = `mutation CreateReadingMessage($input: CreateReadingMessageInput!) {
  createReadingMessage(input: $input) {
    id
    title
    content
    createdAt
    updatedAt
  }
}
`;

export const updateReadingMessage = `mutation UpdateReadingMessage($input: UpdateReadingMessageInput!) {
  updateReadingMessage(input: $input) {
    id
    title
    content
    createdAt
    updatedAt
  }
}
`;

export const deleteReadingMessage = `mutation DeleteReadingMessage($input: DeleteReadingMessageInput!) {
  deleteReadingMessage(input: $input) {
    id
  }
}
`;
