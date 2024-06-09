import * as yup from 'yup';

export interface CredentialsFormValues {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
}
const maxAllowedDate = new Date();
const minAge: number = 13;
maxAllowedDate.setFullYear(maxAllowedDate.getFullYear() - minAge);

export const schema = yup.object<CredentialsFormValues>().shape({
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
  firstName: yup
    .string()
    .required('Please, enter your name')
    .matches(/^[a-zA-Z]+$/, 'First name should only contain letters')
    .matches(/^[A-Z]/, 'First letter should be capitalized')
    .trim(),
  lastName: yup
    .string()
    .required('Please, enter your last name')
    .matches(/^[a-zA-Z]+$/, 'Last name should only contain letters')
    .matches(/^[A-Z]/, 'First letter should be capitalized')
    .trim(),
  dateOfBirth: yup
    .date()
    .required('Please, enter your date of birth')
    .max(maxAllowedDate, 'You must be at least 13 years old'),
});
