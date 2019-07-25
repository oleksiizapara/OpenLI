import { createLogic } from 'redux-logic';
import produce from 'immer';
import Enumerable from 'linq';

import { actionTypes, actions } from './actions';

import { selectors } from './reducer';

import * as queryHelper from 'common/queryHelper';
import { errorMessages } from 'common/errorMessages';
import { calculateTotalPages } from 'common/common';

// const search = createLogic({
//   type: actionTypes.SEARCH,

//   processOptions: {
//     dispatchReturn: true
//   },

//   latest: true,

//   async process({ getState, action }, dispatch, done) {
//     const { searchText } = action.payload;

//     const pageSize = selectors.pageSize(getState());

//     const response = await queryHelper.getSearchMessages({
//       searchText: searchText,
//       pageSize: pageSize,
//       nextToken: null
//     });

//     if (!response) {
//       dispatch(actions.error(errorMessages.readingMessagesSearchIsNotWorking));
//       done();
//       return;
//     }

//     const page = {
//       pageId: 1,
//       messages: response.messages,
//       nextToken: response.nextToken,
//       searchText: searchText
//     };

//     dispatch(
//       actions.pagesUpdated({
//         pages: [page],
//         messages: page.messages,
//         activePage: page.pageId,
//         totalPages: calculateTotalPages(page)
//       })
//     );
//     done();
//   }
// });

export default [];
