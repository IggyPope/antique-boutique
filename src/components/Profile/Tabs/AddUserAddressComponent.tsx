import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'react-toastify';

import { yupResolver } from '@hookform/resolvers/yup';

import { useUpdateCustomerMutation } from '@/api/services/commercetoolsApi';
import { AddUserAddressForm } from '@/components/Profile/Tabs/AddUserAddressForm';
import { createPayload } from '@/components/Profile/Tabs/AddUserAddressPayloadHelper';
import { AddressesFormValues, addressSchema } from '@/components/Profile/Tabs/addressSchema';

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
    try {
      let payload = createPayload(data, version || 1);
      const userDetails = await updateCustomer(payload).unwrap();

      if (
        data.useAsDefaultShippingAddress ||
        data.useAsDefaultBillingAddress ||
        data.useAsShippingAddress ||
        data.useAsBillingAddress
      ) {
        if (!userDetails?.addresses) return;
        const addressesList = userDetails?.addresses;
        const id = addressesList[addressesList.length - 1].id;
        payload = createPayload(data, userDetails?.version || 1, id);

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
