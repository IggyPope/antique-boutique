import * as yup from 'yup';

export interface LoginFormValues {
  email: string;
  password: string;
}

export const schema = yup.object<LoginFormValues>().shape({
  email: yup
    .string()
    .required('Please, enter your e-mail address')
    .email('Please, enter a valid e-mail address')
    .test('no-space', 'Email cannot contain spaces', (value) => {
      if (value) {
        return !value.includes(' ');
      }
      return true;
    })
    .matches(/^\S+@\S+\.\S+$/, 'Email must contain a domain name and an "@" symbol'),
  password: yup
    .string()
    .test('no-space', 'Password cannot contain spaces', (value) => {
      if (value) {
        return !value.includes(' ');
      }
      return true;
    })
    .required('Please, enter a password')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/(?=.*[a-z])/g, 'Password must contain at least one lowercase letter')
    .matches(/(?=.*[A-Z])/g, 'Password must contain at least one uppercase letter')
    .matches(/(?=.*\d)/g, 'Password must contain at least one digit')
    .matches(/(?=.*[@#$%^&*?!])/g, 'Password must contain at least one special character')
    .trim(),
});
