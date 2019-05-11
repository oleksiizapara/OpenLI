import React, { useState, useEffect } from 'react';
import useReactRouter from 'use-react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Form, { validate } from './Form';
import { Formik } from 'formik';

import uuid from 'uuid/v4';

import { selectors } from '../reducer';
import { actions, formStates } from '../actions';

// eslint-disable-next-line no-unused-vars
export default function Add(props) {
  const dispatch = useDispatch();

  const [localIdentifier] = useState(uuid());

  useEffect(() => {
    dispatch(actions.create(localIdentifier));
  }, [dispatch, localIdentifier]);

  const id = useSelector(state => selectors.id(state));

  const identifier = useSelector(state => selectors.identifier(state));
  const readingMessage = useSelector(state => selectors.readingMessage(state));
  const formState = useSelector(state => selectors.formState(state));

  switch (formState) {
    case formStates.DEFAULT_STATE:
    case formStates.LOADING_STATE || identifier !== localIdentifier:
      return <div>Loading ...</div>;
    case formStates.LOADED_STATE:
      return (
        <Formik
          render={props => <Form {...props} />}
          initialValues={readingMessage}
          validate={validate}
          onSubmit={values => {
            dispatch(actions.publish(values));
          }}
        />
      );
    case formStates.PUBLISHING_STATE:
      return <div>Publishing ...</div>;

    case formStates.PUBLISHED_STATE:
      return <Redirect to={{ pathname: `/reading/${id}` }} />;

    default:
      return <div>Error</div>;
  }
}
