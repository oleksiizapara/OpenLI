// eslint-disable

export const getReadingMessage = `query GetReadingMessage($id: ID!) {
  getReadingMessage(id: $id) {
    id
    title
    content
  }
}
`;