import React from 'react';
import { useSelector } from 'react-redux';
import { Header } from 'semantic-ui-react';

import { selectors } from '../reducer';

const ReadingHistoryHeader = () => <Header as='h4'>Reading History</Header>;

const ReadingHistory = () => {
  const transcripts = useSelector(state => selectors.transcript(state));

  return (
    <>
      <ReadingHistoryHeader />
    </>
  );
};

export default ReadingHistory;
