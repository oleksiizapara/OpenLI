// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreateReadingMessage = `subscription OnCreateReadingMessage {
  onCreateReadingMessage {
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
export const onUpdateReadingMessage = `subscription OnUpdateReadingMessage {
  onUpdateReadingMessage {
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
export const onDeleteReadingMessage = `subscription OnDeleteReadingMessage {
  onDeleteReadingMessage {
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
export const onCreateProgress = `subscription OnCreateProgress {
  onCreateProgress {
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
export const onUpdateProgress = `subscription OnUpdateProgress {
  onUpdateProgress {
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
export const onDeleteProgress = `subscription OnDeleteProgress {
  onDeleteProgress {
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
