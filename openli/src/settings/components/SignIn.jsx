import React from 'react';
import { useDispatch } from 'react-redux';

import {
  Grid,
  Header,
  Message,
  Segment,
  Button,
  Form
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { Formik } from 'formik';
import useReactRouter from 'use-react-router';

import { signInSchema } from 'common/validationSchema';

import { Auth } from 'aws-amplify';

import { actions as settingsActions } from 'settings/actions';

const SignIn = () => {
  const { history } = useReactRouter();
  const dispatch = useDispatch();

  return (
    <div className='login-form'>
      <style>
        {`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
      `}
      </style>
      <Grid
        textAlign='center'
        style={{ height: '100%' }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' textAlign='center'>
            OpenLI
          </Header>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={signInSchema}
            onSubmit={async (values, actions) => {
              try {
                await Auth.signIn(values.email, values.password);
                history.push('/');
                dispatch(settingsActions.userFetch());
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

                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    name='password'
                    error={!!errors.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />

                  {!!errors.password && touched.password && (
                    <Message error content={errors.password} />
                  )}

                  <Button fluid size='large' type='submit'>
                    Login
                  </Button>

                  {!!errors.response && (
                    <Message error content={errors.response} />
                  )}
                </Segment>
              </Form>
            )}
          </Formik>

          <Message>
            New to us? <Link to='/sign_up'>Sign Up</Link>
          </Message>

          <Message>
            <Link to='/recovery_password'>Forgot Password?</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default SignIn;
