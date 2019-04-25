import { createMockStore } from 'redux-logic-test';

import {
  key,
  TEXT_LOADING_STATE,
  READING_STATE,
  REVIEW_STATE,
  previousStep
} from '../actions';
import { nextStep } from '../actions';
import reducer from '../../rootReducer';
import logic from '../logic';
import { selectors } from '../reducer';

describe.each([
  [TEXT_LOADING_STATE, READING_STATE],
  [READING_STATE, REVIEW_STATE],
  ['INVALID_STATE', TEXT_LOADING_STATE]
])('.next(%i, %i)', (initialActiveState, expectedActiveState) => {
  test(`[redux-logic] nextStep switch from ${initialActiveState} to ${expectedActiveState}`, () => {
    const initialState = {
      [key]: {
        activeStep: initialActiveState
      }
    };

    const store = createMockStore({
      initialState,
      reducer,
      logic
    });

    store.dispatch(nextStep());

    store.whenComplete(() => {
      expect(selectors.activeStep(store.getState())).toEqual(
        expectedActiveState
      );
    });
  });
});

describe.each([
  [TEXT_LOADING_STATE, TEXT_LOADING_STATE],
  [READING_STATE, TEXT_LOADING_STATE],
  [REVIEW_STATE, READING_STATE],
  ['INVALID_STATE', TEXT_LOADING_STATE]
])('.next(%i, %i)', (initialActiveState, expectedActiveState) => {
  test(`[redux-logic] previousStep switch from ${initialActiveState} to ${expectedActiveState}`, () => {
    const initialState = {
      [key]: {
        activeStep: initialActiveState
      }
    };

    const store = createMockStore({
      initialState,
      reducer,
      logic
    });

    store.dispatch(previousStep());

    store.whenComplete(() => {
      expect(selectors.activeStep(store.getState())).toEqual(
        expectedActiveState
      );
    });
  });
});
