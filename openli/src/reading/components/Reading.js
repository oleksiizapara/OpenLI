import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';

import { actions } from '../actions';
import { selectors } from '../reducer';
import { selectors as speechRecognitionSelectors } from '../../speechRecognition/reducer';

import Word from './Word';
import { formStates } from '../../readingMessage/actions';

export default function Reading() {
  const dispatch = useDispatch();
  const { match } = useReactRouter();

  useEffect(() => {
    dispatch(actions.load(match.params.id));
  }, [dispatch, match.params.id]);

  const formState = useSelector(state => selectors.formState(state));

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
      return <div>error</div>;
  }
}
