import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';

import { Paper, Button, Grid } from '@material-ui/core';

import { formStates } from '../actions';
import { selectors } from '../reducer';

export default function Review() {
  const dispatch = useDispatch();
  const { match } = useReactRouter();

  const formState = useSelector(state => selectors.formState(state));
  const totalWords = useSelector(state => selectors.totalWords(state));
  const readingSpeed = useSelector(state => selectors.readingSpeed(state));
  const recognisedWords = useSelector(state =>
    selectors.recognisedWords(state)
  );
  const notRecognisedWords = useSelector(state =>
    selectors.notRecognisedWords(state)
  );
  const error = useSelector(state => selectors.error(state));

  switch (formState) {
    case formStates.LOADING_STATE:
      return <div>Loading ...</div>;
    case formStates.LOADED_STATE:
      return (
        <Paper>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {totalWords}
            </Grid>
          </Grid>
        </Paper>
      );
    case formStates.DEFAULT_STATE:
      return <div />;
    default:
      return <div>error</div>;
  }
}
