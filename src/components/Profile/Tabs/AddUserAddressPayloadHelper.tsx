import { MyCustomerUpdate } from '@commercetools/platform-sdk';

import { AddressesFormValues } from '@/components/Profile/Tabs/addressSchema';
import { getCountryCode } from '@/components/RegistrationForm/utils';

export const createPayload = (
  data: AddressesFormValues,
  version: number,
  id?: string,
): MyCustomerUpdate => {
  let payload: MyCustomerUpdate = {
    version: version,
    actions: [
      {
        action: 'addAddress',
        address: {
          streetName: data.street,
          postalCode: data.zipCode,
          city: data.city,
          country: getCountryCode(data.country) ?? '',
        },
      },
    ],
  };

  if (id) {
    payload = {
      version: version,
      actions: [
        {
          action: 'changeAddress',
          addressId: id,
          address: {
            streetName: data.street,
            postalCode: data.zipCode,
            city: data.city,
            country: getCountryCode(data.country) ?? '',
          },
        },
      ],
    };

    if (data.useAsDefaultShippingAddress) {
      payload.actions.push({
        action: 'setDefaultShippingAddress',
        addressId: id,
      });
    }

    if (data.useAsDefaultBillingAddress) {
      payload.actions.push({
        action: 'setDefaultBillingAddress',
        addressId: id,
      });
    }

    if (data.useAsShippingAddress) {
      payload.actions.push({
        action: 'addShippingAddressId',
        addressId: id,
      });
    }
    if (data.useAsBillingAddress) {
      payload.actions.push({
        action: 'addBillingAddressId',
        addressId: id,
      });
    }
  }

  return payload;
};
