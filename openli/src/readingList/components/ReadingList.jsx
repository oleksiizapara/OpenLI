import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Header,
  Loader,
  Message,
  Pagination,
  Segment
} from 'semantic-ui-react';

import ReadingListItem from './ReadingListItem';
import { selectors } from 'readingList/reducer';
import { selectors as settingsSelectors } from 'settings/reducer';
import { formStates, actions } from 'readingList/actions';

const ReadingHeader = () => <Header as='h2'>Reading List</Header>;

const ReadingList = () => {
  const dispatch = useDispatch();
  const formState = useSelector(state => selectors.formState(state));
  const messages = useSelector(state => selectors.messages(state));
  const error = useSelector(state => selectors.error(state));
  const activePage = useSelector(state => selectors.activePage(state));
  const totalPages = useSelector(state => selectors.totalPages(state));

  const isLoaded = useSelector(state => settingsSelectors.isLoaded(state));
  useEffect(() => {
    dispatch(actions.load(1));
    return () => dispatch(actions.toDefault());
  }, [dispatch, isLoaded]);

  switch (formState) {
    case formStates.DEFAULT_STATE:
    case formStates.LOADING_STATE:
      return <Loader />;
    case formStates.ERROR_STATE:
      return <Message>{error}</Message>;
    default:
      return (
        <>
          <ReadingHeader />
          {messages.map(message => (
            <ReadingListItem key={message.id} message={message} />
          ))}

          <Segment basic textAlign='center'>
            <Pagination
              activePage={activePage}
              totalPages={totalPages}
              onPageChange={(_, { activePage }) =>
                dispatch(actions.load(activePage))
              }
            />
          </Segment>
        </>
      );
  }
};

export default ReadingList;
