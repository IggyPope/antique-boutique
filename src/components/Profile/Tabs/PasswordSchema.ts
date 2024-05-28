import * as yup from 'yup';

export interface PasswordValues {
  password: string;
  confirmPassword: string;
}

export const schema = yup.object<PasswordValues>().shape({
  password: yup
    .string()
    .test(
      'No-leading-trailing-spaces',
      'Password cannot contain leading or trailing spaces',
      (value) => {
        if (value) return value.length === value.trim().length;
      },
    )
    .required('Please, enter a password')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/(?=.*[a-z])/g, 'Password must contain at least one lowercase letter')
    .matches(/(?=.*[A-Z])/g, 'Password must contain at least one uppercase letter')
    .matches(/(?=.*\d)/g, 'Password must contain at least one digit')
    .matches(/(?=.*[@#$%^&*?!])/g, 'Password must contain at least one special character'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .test(
      'No-leading-trailing-spaces',
      'Password cannot contain leading or trailing spaces',
      (value) => {
        if (value) return value.length === value.trim().length;
      },
    )
    .required('Please, enter a password')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/(?=.*[a-z])/g, 'Password must contain at least one lowercase letter')
    .matches(/(?=.*[A-Z])/g, 'Password must contain at least one uppercase letter')
    .matches(/(?=.*\d)/g, 'Password must contain at least one digit')
    .matches(/(?=.*[@#$%^&*?!])/g, 'Password must contain at least one special character'),
});
