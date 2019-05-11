// eslint-disable

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
    authorId
    title
    content
    createdAt
    updatedAt
  }
}
`;
