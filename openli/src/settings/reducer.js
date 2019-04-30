import produce from 'immer';

import { key } from './actions';

export const selectors = {};

const initialState = {};

export default function(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
    }
  });
}
