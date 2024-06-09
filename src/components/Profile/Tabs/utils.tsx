import { Customer, MyCustomerUpdate } from '@commercetools/platform-sdk';

import { AddressInfo } from '@/components/Profile/Tabs/UserAddressesTab';
import { CredentialsFormValues } from '@/components/Profile/Tabs/credentialsSchema';
import { getCountryByCode } from '@/components/RegistrationForm/utils';

export function createPayload(
  userDetails: Customer | undefined,
  data: CredentialsFormValues,
): MyCustomerUpdate {
  return {
    version: userDetails?.version || 1,
    actions: [
      {
        action: 'setFirstName',
        firstName: data.firstName,
      },
      {
        action: 'setLastName',
        lastName: data.lastName,
      },
      {
        action: 'changeEmail',
        email: data.email,
      },
      {
        action: 'setDateOfBirth',
        dateOfBirth: new Intl.DateTimeFormat('fr-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).format(new Date(data.dateOfBirth)),
      },
    ],
  };
}

export function parseDateOfBirth(dateOfBirthString: string) {
  const dateParts = dateOfBirthString.split('-');
  if (dateParts) {
    return new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2]);
  }
}

export function processAddresses(userDetails: Customer | undefined) {
  if (!userDetails) return [];

  return userDetails.addresses.map((address) => ({
    id: address.id,
    street: address.streetName,
    city: address.city,
    zipCode: address.postalCode,
    country: getCountryByCode(address.country),
    version: userDetails.version || 1,
    shippingAddressId: userDetails?.shippingAddressIds?.includes(address.id || '') ?? false,
    billingAddressId: userDetails?.billingAddressIds?.includes(address.id || '') ?? false,
    addressType: address.id
      ? userDetails?.billingAddressIds?.includes(address.id) &&
        userDetails?.shippingAddressIds?.includes(address.id)
        ? 'shipping and billing'
        : userDetails?.billingAddressIds?.includes(address.id)
          ? 'billing'
          : userDetails?.shippingAddressIds?.includes(address.id)
            ? 'shipping'
            : ''
      : '',
    useAsDefaultShipping: userDetails.defaultShippingAddressId === address.id,
    useAsDefaultBilling: userDetails.defaultBillingAddressId === address.id,
  })) as AddressInfo[];
}
