import React from 'react';
import { Header } from 'semantic-ui-react';

// import ReadingSearchItem from './ReadingSearchItem';
import Layout from 'layout/Layout';

const ReadingSearchHeader = () => <Header as='h2'>Reading Search</Header>;

const ReadingSearch = () => {
  return (
    <>
      {/* <Grid
        className='root'
        container
        direction='column'
        justify='flex-start'
        alignItems='stretch'
        spacing={1}
      >
        <Grid item>
          <ReadingSearchBar
            onRequestAdd={() => {
              history.push('/reading_add');
            }}
          />
        </Grid>
        <Grid item>
          <ReadingSearchItem />
        </Grid>
        <Grid item>
          <ReadingSearchItem />
        </Grid>
      </Grid> */}
    </>
  );
};

export default function ReadingSearchLayout() {
  return (
    <Layout>
      <ReadingSearchHeader />
      <ReadingSearch />
    </Layout>
  );
}
