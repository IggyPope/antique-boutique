import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'react-toastify';

import { MyCustomerUpdate } from '@commercetools/platform-sdk';
import { yupResolver } from '@hookform/resolvers/yup';

import { useUpdateCustomerMutation } from '@/api/services/commercetoolsApi';
import { AddUserAddressForm } from '@/components/Profile/Tabs/AddUserAddressForm';
import { AddressesFormValues, addressSchema } from '@/components/Profile/Tabs/addressSchema';
import { getCountryCode } from '@/components/RegistrationForm/utils';

interface AddUserAddressFormProps {
  version?: number;
}

const DEFAULT_FORM_VALUES = {
  zipCode: '',
  city: '',
  country: '',
  street: '',
  useAsDefaultShippingAddress: false,
  useAsDefaultBillingAddress: false,
  useAsBillingAddress: false,
  useAsShippingAddress: false,
};

export function AddUserAddressComponent({ version }: AddUserAddressFormProps) {
  const methods = useForm<AddressesFormValues>({
    resolver: yupResolver(addressSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const [updateCustomer] = useUpdateCustomerMutation();

  const onSubmit = async (data: AddressesFormValues, clearFlagsHandler: () => void) => {
    let payload: MyCustomerUpdate = {
      version: version || 1,
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

    try {
      const userDetails = await updateCustomer(payload).unwrap();

      if (
        data.useAsDefaultShippingAddress ||
        data.useAsDefaultBillingAddress ||
        data.useAsShippingAddress ||
        data.useAsBillingAddress
      ) {
        if (!userDetails?.addresses) return;
        const addressesList = userDetails?.addresses;
        const version = userDetails?.version || 1;
        const id = userDetails?.addresses[addressesList.length - 1].id;
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

        await updateCustomer(payload);
      }
      const message = 'Address added successfully';
      methods.reset();
      clearFlagsHandler();
      toast.success(message);
    } catch (error) {
      toast.error(
        `Address updating failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  };

  return (
    <FormProvider {...methods}>
      <AddUserAddressForm onSubmit={onSubmit} />
    </FormProvider>
  );
}
