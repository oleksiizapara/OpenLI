import React from 'react';

import { Header } from 'semantic-ui-react';

import Layout from 'layout/Layout';
import ReadingSearch from './ReadingSearch';

const ReadingSearchHeader = () => <Header as='h2'>Reading Search</Header>;

export default function ReadingSearchPage() {
  return (
    <Layout>
      <ReadingSearchHeader />
      <ReadingSearch />
    </Layout>
  );
}
