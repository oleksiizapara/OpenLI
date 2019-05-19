import * as yup from 'yup';

import { errorMessages } from './errorMessages';

const emailValidation = yup
  .string()
  .min(3, errorMessages.invalidEmail)
  .max(255, errorMessages.invalidEmail)
  .email(errorMessages.invalidEmail)
  .required();

const passwordValidation = yup
  .string()
  .min(3, errorMessages.passwordNotLongEnough)
  .max(255)
  .required();

const passwordConfirmValidation = name =>
  yup
    .string()
    .oneOf([yup.ref(name), null], errorMessages.passwordsMustMatch)
    .required(errorMessages.passwordsConfirmIsRequired);

const codeValidation = yup
  .string()
  .length(6, errorMessages.invalidAuthenticationCode)
  .required();

export const signUpSchema = yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
  passwordConfirm: passwordConfirmValidation('password'),
  name: yup
    .string()
    .max(255)
    .required(),
  familyName: yup
    .string()
    .max(255)
    .required()
});

export const signUpConfirmSchema = yup.object().shape({
  email: emailValidation,
  code: codeValidation
});

export const signInSchema = yup.object().shape({
  email: emailValidation,
  password: passwordValidation
});

export const recoveryPasswordSchema = yup.object().shape({
  email: emailValidation
});

export const recoveryPasswordConfirmSchema = yup.object().shape({
  email: emailValidation,
  code: codeValidation,
  newPassword: passwordValidation,
  newPasswordConfirm: passwordConfirmValidation('newPassword')
});

export const createOrEditReadingMessageSchema = yup.object().shape({
  title: yup
    .string()
    .max(255, errorMessages.readingMessageInvalidTitle)
    .required(),
  content: yup
    .string()
    .max(5000, errorMessages.readingMessageInvalidContent)
    .required()
});

export const changePasswordSchema = yup.object().shape({
  newPassword: passwordValidation
});
