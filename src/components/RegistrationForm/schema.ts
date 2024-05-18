import { postcodeValidator, postcodeValidatorExistsForCountry } from 'postcode-validator';
import * as yup from 'yup';

import { countriesArr } from './countries';
import { getCountryCode } from './utils';

export interface FormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  billing_zipCode: string;
  billing_city: string;
  billing_country: string;
  billing_street: string;
  shipping_zipCode: string;
  shipping_city: string;
  shipping_country: string;
  shipping_street: string;
  useAsDefaultShippingAddress: boolean;
  useAsDefaultBillingAddress: boolean;
  useAsBillingAddress: boolean;
}
const maxAllowedDate = new Date();
maxAllowedDate.setFullYear(maxAllowedDate.getFullYear() - 13);
export const schema = yup.object<FormValues>().shape({
  email: yup
    .string()
    .required('Please, enter your e-mail address')
    .email('Please, enter a valid email address')
    .test('no-space', 'Email cannot contain spaces', (value) => {
      if (value) {
        return !value.includes(' ');
      }
      return true;
    })
    .matches(/^\S+@\S+\.\S+$/, 'Email must contain a domain name and an "@" symbol'),
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

  billing_country: yup
    .string()
    .required('You should choose a country')
    .test('country', 'invalid country, choose a country from suggestions', (value) => {
      if (countriesArr.map((contry) => contry.toLowerCase()).includes(value.toLowerCase())) {
        return true;
      }
      return false;
    }),
  billing_street: yup
    .string()
    .required('Street is required')
    .min(1, 'Street must contain at least one character'),
  billing_city: yup
    .string()
    .required('City is required')
    .min(1, 'City must contain at least one character')
    .matches(/^[a-zA-Z\s-]+$/, 'City cannot contain special characters or numbers'),
  billing_zipCode: yup
    .string()
    .required('Postal Code is required')
    .test('custom-validation', 'Invalid ZIP code', function checkZipCode(value): boolean {
      const { billing_country } = this.parent as FormValues;
      const countryCode = getCountryCode(billing_country);
      let result: boolean = false;
      if (!postcodeValidatorExistsForCountry(countryCode || billing_country)) {
        return false;
      }
      if (value && countryCode) {
        result = postcodeValidator(value, countryCode);
      }
      return result;
    }),
  shipping_country: yup
    .string()
    .required('You should choose a country')
    .test('country', 'invalid country, choose a country from suggestions', (value) => {
      if (countriesArr.map((contry) => contry.toLowerCase()).includes(value.toLowerCase())) {
        return true;
      }
      return false;
    }),
  shipping_street: yup
    .string()
    .required('Street is required')
    .min(1, 'Street must contain at least one character'),
  shipping_city: yup
    .string()
    .required('City is required')
    .min(1, 'City must contain at least one character')
    .matches(/^[a-zA-Z\s-]+$/, 'City cannot contain special characters or numbers'),
  shipping_zipCode: yup
    .string()
    .required('Postal Code is required')
    .test('custom-validation', 'Invalid ZIP code', function checkZipCode(value): boolean {
      const { shipping_country } = this.parent as FormValues;
      const countryCode = getCountryCode(shipping_country);
      let result: boolean = false;
      if (!postcodeValidatorExistsForCountry(countryCode || shipping_country)) {
        return false;
      }
      if (value && countryCode) {
        result = postcodeValidator(value, countryCode);
      }
      return result;
    }),
  useAsDefaultShippingAddress: yup.boolean().required(),
  useAsDefaultBillingAddress: yup.boolean().required(),
  useAsBillingAddress: yup.boolean().required(),
});
