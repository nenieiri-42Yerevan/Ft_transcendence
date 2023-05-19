import * as Yup from 'yup';
import { setIn } from 'final-form';
import argon2 from 'argon2';


export const validationScheme = Yup.object().shape({
  first_name: Yup.string()
    .required('First name is required.')
    .matches(/^[a-zA-Z]+$/),
  last_name: Yup.string()
    .required('Last name is required.')
    .matches(/^[a-zA-Z]+$/),
  username: Yup.string()
    .required('Username is required.')
    .min(8, 'At least 8 characters long.')
    .matches(
      /^[a-zA-Z][a-zA-Z0-9_]{7,}[a-zA-Z0-9]$/,
      "Contains at least 8 character long.\nShould start with lowercase or uppercase.\nContains lowercase, uppercase, digit or '_'.",
    ),
  email: Yup.string()
    .required('Email is required.')
    .email('Must be valid email address.'),
  gender: Yup.string().required('Gender is required.'),
  password: Yup.string()
    .required('Password is required.')
    .min(8, 'At least 8 characters long.')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Contains at least one lowercase letter.\nContains at least one uppercase letter.\nContains at least one digit.\nContains at least one special character.',
    ),
  repeat_password: Yup.string()
    .required('Password is required.')
    .min(8, 'At least 8 characters long.')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Contains at least one lowercase letter.\nContains at least one uppercase letter.\nContains at least one digit.\nContains at least one special character.',
    )
    .oneOf([Yup.ref('password'), null], 'Passwords is not same.'),
  day: Yup.string()
    .required('Required')
    .test('not_be_day', 'Day is required.', (value) => value !== 'Day'),
  month: Yup.string()
    .required('Required')
    .test('not_be_month', 'Month is required.', (value) => value !== 'Month'),
  year: Yup.string()
    .required('Required')
    .test('not_be_year', 'Year is required.', (value) => value !== 'Year'),
});


export const validationSettings = Yup.object().shape({
  first_name: Yup.string()
    .required('First name is required.')
    .matches(/^[a-zA-Z]+$/),
  last_name: Yup.string()
    .required('Last name is required.')
    .matches(/^[a-zA-Z]+$/),
  tfa:  Yup.string().required('TFA is required.'),
  username: Yup.string()
  .required('Username is required.')
  .min(8, 'At least 8 characters long.')
  .matches(
    /^(?=.{8})[a-zA-Z][a-zA-Z0-9_]{6,}[a-zA-Z0-9]$/,
    "Contains at least 8 characters.\nShould start with lowercase or uppercase.\nContains lowercase, uppercase, digit, or '_'.",
  ),
  cur_password: Yup.string()
  .min(8, 'At least 8 characters long.')
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    'Contains at least one lowercase letter.\nContains at least one uppercase letter.\nContains at least one digit.\nContains at least one special character.',
  ),
  new_password: Yup.string()
  .min(8, 'At least 8 characters long.')
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    'Contains at least one lowercase letter.\nContains at least one uppercase letter.\nContains at least one digit.\nContains at least one special character.',
  ),
});

export interface Data {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  gender: string;
  password: string;
  repeat_password: string;
  month: string;
  day: string;
  year: string;
}

export interface EditInfo {
  first_name: string;
  last_name: string;
  username: string;
  tfa: string;
  cur_password: string;
  new_password: string;
}

export const days: any[] = Array.from(Array(31).keys()).map((d) => d + 1);
export const years: any[] = Array.from(Array(76).keys()).map((d) => d + 1940);
export const months: any[] = [
  { value: 'January' },
  { value: 'February' },
  { value: 'March' },
  { value: 'April' },
  { value: 'May' },
  { value: 'June' },
  { value: 'July' },
  { value: 'August' },
  { value: 'September' },
  { value: 'October' },
  { value: 'November' },
  { value: 'December' },
];

export type Gender = 'male' | 'female';
export type TFA = 'enable' | 'disable';

export const validate = async (values: Data) => {
  try {
    await validationScheme.validate(values, { abortEarly: false });
  } catch (err: any) {
    const errors = err.inner.reduce((formError: any, innerError: any) => {
      return setIn(formError, innerError.path, innerError.message);
    }, {});

    return errors;
  }
};

export const validateSettings = async (values: EditInfo) => {
  try { 
    await validationSettings.validate(values, { abortEarly: false });
  } catch (err: any) {
    const errors = err.inner.reduce((formError: any, innerError: any) => {
      return setIn(formError, innerError.path, innerError.message);
    }, {});

    return errors;
  }
};
