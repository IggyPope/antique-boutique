import { Customer, MyCustomerUpdate } from '@commercetools/platform-sdk';

import { CredentialsFormValues } from '@/components/Profile/Tabs/credentialsSchema';

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
