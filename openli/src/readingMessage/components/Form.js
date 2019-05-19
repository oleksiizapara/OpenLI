import React from 'react';
import PropTypes from 'prop-types';

import { Field } from 'formik';

import { Message, Button, Form } from 'semantic-ui-react';
import readingMessageAccess from 'common/readingMessageAccess';
import SelectField from 'common/Components/SelectField';
import InputField from 'common/Components/InputField';

const ReadingMessageForm = ({
  loading,
  isSubmitting,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
  isValid
}) => {
  const accessOptions = [
    {
      key: readingMessageAccess.PUBLIC,
      text: 'public',
      value: readingMessageAccess.PUBLIC
    },
    {
      key: readingMessageAccess.PRIVATE,
      text: 'private',
      value: readingMessageAccess.PRIVATE
    }
  ];

  return (
    <Form
      error={!isValid}
      onSubmit={handleSubmit}
      loading={isSubmitting || loading}
    >
      <Field fluid name='title' placeholder='Title' component={InputField} />

      <Form.TextArea
        rows={15}
        placeholder='Content'
        name='content'
        error={!!errors.content && touched.content}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.content}
      />

      {!!errors.content && touched.content && (
        <Message error content={errors.content} />
      )}

      <Field
        placeholder='access'
        options={accessOptions}
        name='access'
        component={SelectField}
      />

      <Button size='large' type='submit'>
        Publish
      </Button>

      {!!errors.response && <Message error content={errors.response} />}
    </Form>
  );
};

export default ReadingMessageForm;

ReadingMessageForm.propTypes = {
  loading: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isValid: PropTypes.bool
};
