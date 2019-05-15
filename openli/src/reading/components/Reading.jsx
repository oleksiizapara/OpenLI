import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';

import { Message, Divider } from 'semantic-ui-react';

import { actions } from '../actions';
import { selectors } from '../reducer';
import { formStates } from 'readingMessage/actions';
import { selectors as speechRecognitionSelectors } from 'speechRecognition/reducer';

import Word from './Word';
import Review from 'review/components/Review';
import { Layout } from 'layout/Layout';

const Reading = () => {
  const dispatch = useDispatch();
  const { match } = useReactRouter();

  useEffect(() => {
    dispatch(actions.load(match.params.id));
  }, [dispatch, match.params.id]);

  const formState = useSelector(state => selectors.formState(state));
  const error = useSelector(state => selectors.error(state));

  const words = useSelector(state => selectors.words(state));
  const interimTranscript = useSelector(state =>
    speechRecognitionSelectors.interimTranscript(state)
  );
  const finalTranscript = useSelector(state =>
    speechRecognitionSelectors.finalTranscript(state)
  );

  switch (formState) {
    case formStates.LOADING_STATE:
      return <div>Loading ...</div>;
    case formStates.LOADED_STATE:
      return (
        <>
          {words.map(word => (
            <Word
              key={word.index}
              word={word}
              interimTranscript={interimTranscript}
              finalTranscript={finalTranscript}
            />
          ))}

          <br />
          <br />
          <p>Final Transcript : {finalTranscript}</p>
          <br />
          <p>Interim Transcript : {interimTranscript}</p>
        </>
      );
    default:
      return <Message>{error}</Message>;
  }
};

export default function ReadingLayout() {
  return (
    <Layout>
      <Reading />
      <Divider />
      <Review />
    </Layout>
  );
}
