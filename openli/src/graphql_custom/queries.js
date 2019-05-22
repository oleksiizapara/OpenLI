// eslint-disable

export const getReadingMessage = `query GetReadingMessage($id: ID!) {
  getReadingMessage(id: $id) {
    id
    title
    content
    authorId
  	author {
      name
      familyName
    }
    access
    createdAt
  }
}
`;

export const getReadingMessagesByAuthor = `
query GetReadingMessageByAuthor(
  $authorId: String!, 
  $pageSize: Int!
  $nextToken: String
) {
  listReadingMessages(
    nextToken:$nextToken
    limit: $pageSize
    filter: { authorId: {eq:  $authorId} }
  ) {
    nextToken
    items {
      id
      authorId
      author {
        name
        familyName
      }
      title
      content
      createdAt
      access
      updatedAt
    }
  }
}
`;
