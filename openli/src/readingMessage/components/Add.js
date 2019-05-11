import React, { useState } from 'react';
// import useReactRouter from 'use-react-router';
// import { useSelector } from 'react-redux';

import Form, { validate } from './Form';
import { Formik } from 'formik';
// import uuid from 'uuid/v4';

// export const publish = async (readingMessage, history, mutationHelper) => {
// const resultReadingMessage = await mutationHelper.createReadingMessage(readingMessage);

// history.push(`/read/${resultReadingMessage.id}`);
// };

// eslint-disable-next-line no-unused-vars
export default function ReadingAdd(props) {
  // const { history } = useReactRouter();
  // const [identifier, setIdentifier] = useState(uuid());

  const values = {
    title: '',
    content: ''
  };

  return (
    <Formik
      render={props => <Form {...props} />}
      initialValues={values}
      validate={validate}
    />
  );
}
