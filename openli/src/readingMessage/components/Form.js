import React from 'react';
import PropTypes from 'prop-types';

import { Message, Button, Form } from 'semantic-ui-react';

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
  return (
    <Form
      error={!isValid}
      onSubmit={handleSubmit}
      loading={isSubmitting || loading}
    >
      <Form.Input
        fluid
        name='title'
        placeholder='Title'
        error={!!errors.title}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.title}
      />

      {!!errors.title && touched.title && (
        <Message error content={errors.title} />
      )}

      <Form.TextArea
        rows={15}
        placeholder='Content'
        name='content'
        error={!!errors.content}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.content}
      />

      {!!errors.content && touched.content && (
        <Message error content={errors.content} />
      )}

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
