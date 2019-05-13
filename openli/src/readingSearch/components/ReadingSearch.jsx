import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import ReadingSearchItem from './ReadingSearchItem';

class ReadingSearch extends Component {
  render() {
    const { history } = this.props;

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
  }
}

export default withRouter(ReadingSearch);
