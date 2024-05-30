import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';

import { AddressesFormValues } from './addressesSchema';

export const copyShippingToBilling = (
  getValues: UseFormGetValues<AddressesFormValues>,
  setValue: UseFormSetValue<AddressesFormValues>,
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
