import * as yup from 'yup';

export interface FormValues {
  firstName: string;
  lastName: string;
  age: Date;
  email: string;
  password: string;
  country: string;
}

export const schema = yup.object<FormValues>().shape({
  firstName: yup
    .string()
    .required('Please, enter your name')
    .matches(/^[A-Z]/, 'First letter should be capitalized')
    .trim(),
  lastName: yup
    .string()
    .required('Please, enter your last name')
    .matches(/^[A-Z]/, 'First letter should be capitalized')
    .trim(),
  age: yup
    .date()
    .required('Please, enter your date of birth')
    .max(new Date().getFullYear() - 13, 'You must be at least 13 years old'),
  email: yup
    .string()
    .required('Please, enter your e-mail address')
    .email('Please, enter a valid email')
    .matches(/^\S+@\S+\.\S+$/, 'Email must contain a domain name and an "@" symbol'),
  password: yup
    .string()
    .required('Please, enter a password')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/(?=.*[a-z])/g, 'Password must contain at least one lowercase letter')
    .matches(/(?=.*[A-Z])/g, 'Password must contain at least one uppercase letter')
    .matches(/(?=.*\d)/g, 'Password must contain at least one digit')
    .matches(/(?=.*[@#$%^&*?!])/g, 'Password must contain at least one special character')
    .trim(),
  country: yup.string().required('You should choose a country'),
});
