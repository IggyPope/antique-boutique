import type { UseFormSetValue, UseFormGetValues } from 'react-hook-form';

import { countriesList } from './countries';
import { FormValues } from './schema';

export function getCountryByCode(countryCode: string | undefined): string | null {
  const countryCodeInLowerCase = countryCode?.toLowerCase();
  return countriesList
    .map((country): string | null => {
      return country.code.toLowerCase() === countryCodeInLowerCase ? country.label : null;
    })
    .join('');
}

export function getCountryCode(countryName: string | undefined): string | null {
  const countryNameInLowerCase = countryName?.toLowerCase();
  return (
    countriesList.find((country) => country.label.toLowerCase() === countryNameInLowerCase)?.code ||
    null
  );
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
