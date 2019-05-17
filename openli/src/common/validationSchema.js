import * as yup from 'yup';

import { errorMessages } from './errorMessages';

export const registerPasswordValidation = yup
  .string()
  .min(3, errorMessages.passwordNotLongEnough)
  .max(255)
  .required();

export const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, errorMessages.emailNotLongEnough)
    .max(255)
    .email(errorMessages.invalidEmail)
    .required(),
  password: registerPasswordValidation,
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], errorMessages.passwordsMustMatch)
    .required(errorMessages.passwordsConfirmIsRequired),
  name: yup
    .string()
    .max(255)
    .required(),
  familyName: yup
    .string()
    .max(255)
    .required()
});

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, errorMessages.invalidLogin)
    .max(255, errorMessages.invalidLogin)
    .email(errorMessages.invalidLogin)
    .required(),
  password: yup
    .string()
    .min(3, errorMessages.invalidLogin)
    .max(255, errorMessages.invalidLogin)
    .required()
});

export const signConfirmSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, errorMessages.invalidLogin)
    .max(255, errorMessages.invalidLogin)
    .email(errorMessages.invalidLogin)
    .required(),
  authenticationCode: yup
    .string()
    .length(6, errorMessages.invalidAuthenticationCode)
    .required()
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
  newPassword: registerPasswordValidation
});
