import type { UseFormSetValue, UseFormGetValues } from 'react-hook-form';

import { COUNTRY_DATA_LIST } from '@/components/RegistrationForm/countries';
import { FormValues } from '@/components/RegistrationForm/schema';

export function getCountryByCode(countryCode: string | undefined): string | null {
  if (countryCode === undefined) {
    return null;
  }
  const foundCountry = COUNTRY_DATA_LIST.find((country) => country.code === countryCode);
  return foundCountry ? foundCountry.label : null;
}

export function getCountryCode(countryName: string | undefined): string | null {
  if (countryName === undefined) {
    return null;
  }
  const foundCountry = COUNTRY_DATA_LIST.find((country) => country.label === countryName);
  return foundCountry?.code || null;
}

export const copyShippingToBilling = (
  getValues: UseFormGetValues<FormValues>,
  setValue: UseFormSetValue<FormValues>,
  useAsBillingAddress: boolean,
  isCleaned: boolean,
) => {
  if (useAsBillingAddress) {
    setValue('billing_street', getValues('shipping_street'), {
      shouldValidate: true,
    });
    setValue('billing_city', getValues('shipping_city'), {
      shouldValidate: true,
    });
    setValue('billing_country', getValues('shipping_country'), {
      shouldValidate: true,
    });
    setValue('billing_zipCode', getValues('shipping_zipCode'), {
      shouldValidate: true,
    });
  } else if (!useAsBillingAddress && isCleaned) {
    setValue('billing_street', '', {
      shouldValidate: true,
    });
    setValue('billing_city', '', {
      shouldValidate: true,
    });
    setValue('billing_country', '', {
      shouldValidate: true,
    });
    setValue('billing_zipCode', '', {
      shouldValidate: true,
    });
  }
};
