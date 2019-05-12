import { createMockStore } from 'redux-logic-test';

import { key, actions, formStates } from '../actions';
import { selectors } from '../reducer';
import logic from '../logic';

import reducer from 'rootReducer';
import * as queryHelper from 'common/queryHelper';
import * as mutationHelper from 'common/mutationHelper';
import { errorMessages } from 'common/errorMessages';

describe.each([
  [
    {
      identifier: 'uniqueId',
      id: '',
      readingMessage: { id: '', title: '', content: '' },
      formState: formStates.DEFAULT_STATE,
      error: ''
    },
    {
      identifier: 'uniqueId',
      id: 'notNull',
      readingMessage: { id: 'notNull', title: 'notNull', content: 'notNull' },
      formState: formStates.DEFAULT_STATE,
      error: 'not null'
    }
  ]
])('[redux-logic] create readingMessage', initialKeyState => {
  test(`[redux-logic]  create readingMessage ${JSON.stringify(
    initialKeyState
  )}`, async () => {
    const initialState = {
      [key]: initialKeyState
    };

    const store = createMockStore({
      initialState,
      reducer,
      logic
    });

    const testIdentifier = 'testIdentifier';
    store.dispatch(actions.create(testIdentifier));

    await store.whenComplete(() => {
      const readingMessage = selectors.readingMessage(store.getState());
      expect(readingMessage).toEqual({
        id: '',
        title: '',
        content: ''
      });

      const formState = selectors.formState(store.getState());
      expect(formState).toEqual(formStates.LOADED_STATE);

      const identifier = selectors.identifier(store.getState());
      expect(identifier).toEqual('testIdentifier');
    });
  });
});

describe.each([
  [
    {
      identifier: 'uniqueId',
      id: '',
      readingMessage: { id: '', title: '', content: '' },
      formState: formStates.DEFAULT_STATE,
      error: ''
    },
    {
      identifier: 'uniqueId',
      id: 'notNull',
      readingMessage: { id: 'notNull', title: 'notNull', content: 'notNull' },
      formState: formStates.PUBLISHED_STATE,
      error: 'not null'
    }
  ]
])('[redux-logic] load edit readingMessage', initialKeyState => {
  test(`[redux-logic] load edit readingMessage ${JSON.stringify(
    initialKeyState
  )}`, async () => {
    const initialState = {
      [key]: initialKeyState
    };

    const store = createMockStore({
      initialState,
      reducer,
      logic
    });

    queryHelper.getReadingMessage = jest.fn().mockResolvedValue({
      id: '1',
      title: 'testTitle',
      content: 'testContent'
    });

    const testIdentifier = 'testIdentifier';
    store.dispatch(actions.load(testIdentifier, '1'));

    await store.whenComplete(() => {
      const readingMessage = selectors.readingMessage(store.getState());
      expect(readingMessage).toEqual({
        id: '1',
        title: 'testTitle',
        content: 'testContent'
      });

      const formState = selectors.formState(store.getState());
      expect(formState).toEqual(formStates.LOADED_STATE);
    });
  });
});

test(`[redux-logic] load edit readingMessage does not exist`, async () => {
  const initialState = {
    [key]: {
      identifier: 'uniqueId',
      id: '',
      readingMessage: { id: '', title: '', content: '' },
      formState: formStates.DEFAULT_STATE
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  queryHelper.getReadingMessage = jest.fn().mockResolvedValue(undefined);

  const testIdentifier = 'testIdentifier';
  store.dispatch(actions.load(testIdentifier, '1'));

  await store.whenComplete(() => {
    const identifier = selectors.identifier(store.getState());
    expect(identifier).toEqual('testIdentifier');

    const formState = selectors.formState(store.getState());
    expect(formState).toEqual(formStates.ERROR_STATE);

    const error = selectors.error(store.getState());
    expect(error).toEqual(errorMessages.READING_MESSAGE_WAS_NOT_FOUND);
  });
});

test(`[redux-logic] publish created readingMessage`, async () => {
  const initialState = {
    [key]: {
      identifier: 'testIdentifier',
      id: '',
      readingMessage: { id: '', title: '', content: '' },
      formState: formStates.LOADED_STATE
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  mutationHelper.createReadingMessage = jest.fn().mockResolvedValue({
    id: 'testId',
    title: 'demoTitle',
    content: 'demoContent'
  });

  store.dispatch(
    actions.publish({ id: '', title: 'demoTitle', content: 'demoContent' })
  );

  await store.whenComplete(() => {
    const readingMessage = selectors.readingMessage(store.getState());
    expect(readingMessage).toEqual({
      id: 'testId',
      title: 'demoTitle',
      content: 'demoContent'
    });

    const id = selectors.id(store.getState());
    expect(id).toEqual('testId');

    const formState = selectors.formState(store.getState());
    expect(formState).toEqual(formStates.PUBLISHED_STATE);
  });
});

test(`[redux-logic] publish created readingMessage error API`, async () => {
  const initialState = {
    [key]: {
      identifier: 'testIdentifier',
      id: '',
      readingMessage: { id: '', title: '', content: '' },
      formState: formStates.LOADED_STATE
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  mutationHelper.createReadingMessage = jest.fn().mockResolvedValue(undefined);

  store.dispatch(
    actions.publish({ id: '', title: 'demoTitle', content: 'demoContent' })
  );

  await store.whenComplete(() => {
    const readingMessage = selectors.readingMessage(store.getState());
    expect(readingMessage).toEqual({
      id: '',
      title: '',
      content: ''
    });

    const id = selectors.id(store.getState());
    expect(id).toEqual('');

    const formState = selectors.formState(store.getState());
    expect(formState).toEqual(formStates.ERROR_STATE);

    const error = selectors.error(store.getState());
    expect(error).toEqual(errorMessages.READING_MESSAGE_WAS_NOT_UPDATED);
  });
});

test(`[redux-logic] publish edited readingMessage`, async () => {
  const initialState = {
    [key]: {
      identifier: 'testIdentifier',
      id: 'testId',
      readingMessage: { id: '', title: '', content: '' },
      formState: formStates.LOADED_STATE
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  mutationHelper.updateReadingMessage = jest.fn().mockResolvedValue({
    id: 'testId',
    title: 'demoTitle',
    content: 'demoContent'
  });

  store.dispatch(
    actions.publish({
      id: 'testId',
      title: 'updatedDemoTitle',
      content: 'updatedDemoContent'
    })
  );

  await store.whenComplete(() => {
    const readingMessage = selectors.readingMessage(store.getState());
    expect(readingMessage).toEqual({
      id: 'testId',
      title: 'demoTitle',
      content: 'demoContent'
    });

    const id = selectors.id(store.getState());
    expect(id).toEqual('testId');

    const formState = selectors.formState(store.getState());
    expect(formState).toEqual(formStates.PUBLISHED_STATE);
  });
});

test(`[redux-logic] publish updated readingMessage error API`, async () => {
  const initialState = {
    [key]: {
      identifier: 'testIdentifier',
      id: 'testId',
      readingMessage: {
        id: 'testId',
        title: 'demoTitle',
        content: 'demoContent'
      },
      formState: formStates.LOADED_STATE
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  mutationHelper.updateReadingMessage = jest.fn().mockResolvedValue(undefined);

  store.dispatch(
    actions.publish({
      id: 'testId',
      title: 'UpdatedDemoTitle',
      content: 'UpdatedDemoContent'
    })
  );

  await store.whenComplete(() => {
    const readingMessage = selectors.readingMessage(store.getState());
    expect(readingMessage).toEqual({
      id: 'testId',
      title: 'demoTitle',
      content: 'demoContent'
    });

    const id = selectors.id(store.getState());
    expect(id).toEqual('testId');

    const formState = selectors.formState(store.getState());
    expect(formState).toEqual(formStates.ERROR_STATE);

    const error = selectors.error(store.getState());
    expect(error).toEqual(errorMessages.READING_MESSAGE_WAS_NOT_UPDATED);
  });
});
