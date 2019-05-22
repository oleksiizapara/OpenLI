import React from 'react';
import Layout from 'layout/Layout';
import ReadingList from './ReadingList';
import { Header } from 'semantic-ui-react';

const ReadingHeader = () => <Header as='h2'>Reading List</Header>;

const ReadingListPage = () => (
  <Layout>
    <ReadingHeader />
    <ReadingList />
  </Layout>
);

export default ReadingListPage;
