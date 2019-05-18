import React, {useState} from 'react';

import {
  Grid,
  Header,
  Message,
  Segment,
  Button,
  Form
} from 'semantic-ui-react';

import { Formik } from 'formik';
import useReactRouter from 'use-react-router';

import { signInSchema } from 'common/validationSchema';

import { Auth } from 'aws-amplify';
import RecoveryPasswordFirstStep from './RecoveryPasswordFirstStep';
import RecoveryPasswordSecondStep from './RecoveryPasswordSecondStep';

const RecoveryPassword = () => {
  const { history } = useReactRouter();
  const [isSecondStep, setIsSecondStep] = useState(false);
  const [email, setEmail] = useState(false);


  const showSecondStep = (email) => {
    setEmail(email);
    setIsSecondStep(true);
  }

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
      { (!isSecondStep) 
      ? (<RecoveryPasswordFirstStep showSecondStep={showSecondStep}/> ) 

      : (<RecoveryPasswordSecondStep email={email}/>)}

        </Grid.Column>
      </Grid>
    </div>
  );
};

export default RecoveryPassword;
