import { postcodeValidator, postcodeValidatorExistsForCountry } from 'postcode-validator';
import * as yup from 'yup';

import { COUNTRY_LIST } from '@/components/RegistrationForm/countries';
import { getCountryCode } from '@/components/RegistrationForm/utils';

export interface AddressesFormValues {
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
const minAge: number = 13;
maxAllowedDate.setFullYear(maxAllowedDate.getFullYear() - minAge);
export const schema = yup.object<AddressesFormValues>().shape({
  billing_country: yup
    .string()
    .required('You should choose a country')
    .test('country', 'invalid country, choose a country from suggestions', (value) => {
      if (COUNTRY_LIST.map((contry) => contry.toLowerCase()).includes(value.toLowerCase())) {
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
      const { billing_country } = this.parent as AddressesFormValues;
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
      if (COUNTRY_LIST.map((contry) => contry.toLowerCase()).includes(value.toLowerCase())) {
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
      const { shipping_country } = this.parent as AddressesFormValues;
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
