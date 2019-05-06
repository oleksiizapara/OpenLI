// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreateReadingMessage = `subscription OnCreateReadingMessage {
  onCreateReadingMessage {
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
export const onUpdateReadingMessage = `subscription OnUpdateReadingMessage {
  onUpdateReadingMessage {
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
export const onDeleteReadingMessage = `subscription OnDeleteReadingMessage {
  onDeleteReadingMessage {
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
