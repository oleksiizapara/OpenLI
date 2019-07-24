// eslint-disable
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
    preogresses {
      items {
        id
        authorId
        isCalculated
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
    preogresses {
      items {
        id
        authorId
        isCalculated
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
    preogresses {
      items {
        id
        authorId
        isCalculated
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
      name
      familyName
      readingMessages {
        nextToken
      }
      preogresses {
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
export const updateReadingMessage = `mutation UpdateReadingMessage($input: UpdateReadingMessageInput!) {
  updateReadingMessage(input: $input) {
    id
    author {
      id
      username
      name
      familyName
      readingMessages {
        nextToken
      }
      preogresses {
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
export const deleteReadingMessage = `mutation DeleteReadingMessage($input: DeleteReadingMessageInput!) {
  deleteReadingMessage(input: $input) {
    id
    author {
      id
      username
      name
      familyName
      readingMessages {
        nextToken
      }
      preogresses {
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
export const createProgress = `mutation CreateProgress($input: CreateProgressInput!) {
  createProgress(input: $input) {
    id
    author {
      id
      username
      name
      familyName
      readingMessages {
        nextToken
      }
      preogresses {
        nextToken
      }
      createdAt
      updatedAt
    }
    authorId
    readingMessageHistories {
      id
      ReadingMessage {
        id
        authorId
        title
        content
        createdAt
        updatedAt
        access
      }
      words {
        index
        word
        time
        isRegognised
      }
      readingSpeed
      totalWords
      uniqueWords
      recognisedWords
      unRecognisedWords
      recognisedWordsPercent
      time
    }
    readingMessageProgresses {
      id
      orderId
      readingMessageId
      readingMessageTitle
      readingMessageProgressUnits {
        id
        readingMessageId
        time
        recognisedWordsPercent
      }
      time
    }
    isCalculated
    createdAt
    updatedAt
  }
}
`;
export const updateProgress = `mutation UpdateProgress($input: UpdateProgressInput!) {
  updateProgress(input: $input) {
    id
    author {
      id
      username
      name
      familyName
      readingMessages {
        nextToken
      }
      preogresses {
        nextToken
      }
      createdAt
      updatedAt
    }
    authorId
    readingMessageHistories {
      id
      ReadingMessage {
        id
        authorId
        title
        content
        createdAt
        updatedAt
        access
      }
      words {
        index
        word
        time
        isRegognised
      }
      readingSpeed
      totalWords
      uniqueWords
      recognisedWords
      unRecognisedWords
      recognisedWordsPercent
      time
    }
    readingMessageProgresses {
      id
      orderId
      readingMessageId
      readingMessageTitle
      readingMessageProgressUnits {
        id
        readingMessageId
        time
        recognisedWordsPercent
      }
      time
    }
    isCalculated
    createdAt
    updatedAt
  }
}
`;
export const deleteProgress = `mutation DeleteProgress($input: DeleteProgressInput!) {
  deleteProgress(input: $input) {
    id
    author {
      id
      username
      name
      familyName
      readingMessages {
        nextToken
      }
      preogresses {
        nextToken
      }
      createdAt
      updatedAt
    }
    authorId
    readingMessageHistories {
      id
      ReadingMessage {
        id
        authorId
        title
        content
        createdAt
        updatedAt
        access
      }
      words {
        index
        word
        time
        isRegognised
      }
      readingSpeed
      totalWords
      uniqueWords
      recognisedWords
      unRecognisedWords
      recognisedWordsPercent
      time
    }
    readingMessageProgresses {
      id
      orderId
      readingMessageId
      readingMessageTitle
      readingMessageProgressUnits {
        id
        readingMessageId
        time
        recognisedWordsPercent
      }
      time
    }
    isCalculated
    createdAt
    updatedAt
  }
}
`;
