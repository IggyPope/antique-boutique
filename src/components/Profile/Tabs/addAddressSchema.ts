import { postcodeValidator, postcodeValidatorExistsForCountry } from 'postcode-validator';
import * as yup from 'yup';

import { COUNTRY_LIST } from '@/components/RegistrationForm/countries';
import { getCountryCode } from '@/components/RegistrationForm/utils';

export interface AddressesFormValues {
  zipCode: string;
  city: string;
  country: string;
  street: string;
  useAsDefaultShippingAddress: boolean;
  useAsDefaultBillingAddress: boolean;
  useAsBillingAddress: boolean;
  useAsShippingAddress: boolean;
}
const maxAllowedDate = new Date();
const minAge: number = 13;
maxAllowedDate.setFullYear(maxAllowedDate.getFullYear() - minAge);
export const addressSchema = yup.object<AddressesFormValues>().shape({
  country: yup
    .string()
    .required('You should choose a country')
    .test('country', 'invalid country, choose a country from suggestions', (value) => {
      if (COUNTRY_LIST.map((contry) => contry.toLowerCase()).includes(value.toLowerCase())) {
        return true;
      }
      return false;
    }),
  street: yup
    .string()
    .required('Street is required')
    .min(1, 'Street must contain at least one character'),
  city: yup
    .string()
    .required('City is required')
    .min(1, 'City must contain at least one character')
    .matches(/^[a-zA-Z\s-]+$/, 'City cannot contain special characters or numbers'),
  zipCode: yup
    .string()
    .required('Postal Code is required')
    .test('custom-validation', 'Invalid ZIP code', function checkZipCode(value): boolean {
      const { country } = this.parent as AddressesFormValues;
      const countryCode = getCountryCode(country);
      let result: boolean = false;
      if (!postcodeValidatorExistsForCountry(countryCode || country)) {
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
  useAsShippingAddress: yup.boolean().required(),
});
