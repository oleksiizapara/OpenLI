import React from 'react';
import PropTypes from 'prop-types';

import { Message, Segment, Button, Form } from 'semantic-ui-react';

import { Formik } from 'formik';

import { recoveryPasswordFirstStepSchema } from 'common/validationSchema';

import { Auth } from 'aws-amplify';

const RecoveryPasswordFirstStep = ({ showSecondStep }) => {
  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={recoveryPasswordFirstStepSchema}
      onSubmit={async (values, actions) => {
        try {
          await Auth.forgotPassword(values.email);
          showSecondStep(values.email);
        } catch (errors) {
          actions.setErrors({ response: errors.message });
        } finally {
          actions.setSubmitting(false);
        }
      }}
    >
      {({
        isSubmitting,
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        isValid
      }) => (
        <Form
          size='large'
          error={!isValid}
          onSubmit={handleSubmit}
          loading={isSubmitting}
        >
          <Segment stacked>
            <Form.Input
              fluid
              name='email'
              icon='user'
              iconPosition='left'
              placeholder='E-mail address'
              error={!!errors.username}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />

            {!!errors.email && touched.email && (
              <Message error content={errors.email} />
            )}

            <Button fluid size='large' type='submit'>
              Recovery Password
            </Button>

            {!!errors.response && <Message error content={errors.response} />}
          </Segment>
        </Form>
      )}
    </Formik>
  );
};

export default RecoveryPasswordFirstStep;

RecoveryPasswordFirstStep.propTypes = {
  showSecondStep: PropTypes.func
};
