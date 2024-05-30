import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Button, Stack, Autocomplete, Checkbox, FormControlLabel } from '@mui/material';
import TextField from '@mui/material/TextField';

import { MyCustomerUpdate } from '@commercetools/platform-sdk';
import { yupResolver } from '@hookform/resolvers/yup';

import { UpdateCustomerService } from '@/api/services/UpdateCustomerService';
import { EditableTextField } from '@/components/Profile/Tabs/EditableTextField';
import { AddressInfo } from '@/components/Profile/Tabs/UserAdressesTab';
import { addressSchema, AddressesFormValues } from '@/components/Profile/Tabs/addressSchema';
import { COUNTRY_LIST } from '@/components/RegistrationForm/countries';
import { getCountryCode } from '@/components/RegistrationForm/utils';

interface UserAddressFormProps {
  initialData: AddressInfo | null;
  version?: number;
}

export function UserAddressForm({ initialData, version }: UserAddressFormProps) {
  const {
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<AddressesFormValues>({
    resolver: yupResolver(addressSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      zipCode: '',
      city: '',
      country: '',
      street: '',
      useAsDefaultShippingAddress: false,
      useAsDefaultBillingAddress: false,
      useAsBillingAddress: false,
      useAsShippingAddress: false,
    },
  });

  const [useAsDefaultShipping, setUseAsDefaultShipping] = useState(false);
  const [useAsDefaultBilling, setUseAsDefaultBilling] = useState(false);
  const [useAsBilling, setUseAsBilling] = useState(false);
  const [useAsShipping, setUseAsShipping] = useState(false);
  const updateService = UpdateCustomerService.getInstance();

  if (initialData) {
    setValue('street', initialData.street ?? '');
    setValue('city', initialData.city ?? '');
    setValue('zipCode', initialData.zipCode ?? '');
    setValue('country', initialData.country ?? '');
    setValue('useAsDefaultShippingAddress', initialData.useAsDefaultShipping ?? false);
    setValue('useAsDefaultBillingAddress', initialData.useAsDefaultBilling ?? false);
    setValue('useAsBillingAddress', initialData.shippingAddressId ?? false);
    setValue('useAsShippingAddress', initialData.billingAddressId ?? false);
  }

  const onSubmit = async (data: AddressesFormValues) => {
    const payload: MyCustomerUpdate = {
      version: initialData?.version || version || 1,
      actions: [
        {
          action: initialData ? 'changeAddress' : 'addAddress',
          addressId: initialData?.id,
          address: {
            streetName: data.street,
            postalCode: data.zipCode,
            city: data.city,
            country: getCountryCode(data.country) ?? '',
          },
        },
      ],
    };
    if (initialData && useAsDefaultShipping) {
      payload.actions.push({
        action: 'setDefaultShippingAddress',
        addressId: initialData?.id || '',
      });
    }

    if (initialData && useAsDefaultBilling) {
      payload.actions.push({
        action: 'setDefaultBillingAddress',
        addressId: initialData?.id || '',
      });
    }

    if (initialData && useAsShipping) {
      payload.actions.push({
        action: 'addShippingAddressId',
        addressId: initialData?.id || '',
      });
    }

    if (initialData && useAsBilling) {
      payload.actions.push({
        action: 'addBillingAddressId',
        addressId: initialData?.id || '',
      });
    }

    try {
      await updateService.updateCustomer(payload);
      const message = initialData ? 'Address changed successfully' : 'Address added successfully';
      toast.success(message);
    } catch (error) {
      toast.error(
        `Address updating failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        direction="column"
        justifyContent="center"
        gap={1}
        sx={{
          width: {
            sm: '100%',
          },
          padding: {
            xs: '5%',
            sm: '0',
          },
        }}
      >
        <Controller
          name="country"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={COUNTRY_LIST}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'none',
                  }}
                  error={!!errors.country}
                  helperText={errors.country?.message || ' '}
                />
              )}
              onChange={async (_, newValue) => {
                field.onChange(newValue ?? '');
                if (!useAsBilling) {
                  await trigger(`zipCode`);
                }
              }}
              isOptionEqualToValue={(option, value) => option === value}
            />
          )}
        />
        <EditableTextField
          name="zipCode"
          control={control}
          errors={errors}
          label="zipCode"
          fieldName="Zip Code"
          dataTestId="editing-zip-code"
        />

        <EditableTextField
          name="street"
          control={control}
          errors={errors}
          label="street"
          fieldName="Street"
          dataTestId="editing-street"
        />

        <EditableTextField
          name="city"
          control={control}
          errors={errors}
          label="city"
          fieldName="City"
          dataTestId="editing-billing-city"
        />
        <Stack direction="column">
          <Controller
            name="useAsDefaultShippingAddress"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={useAsDefaultShipping}
                    onChange={() => {
                      setUseAsDefaultShipping(!useAsDefaultShipping);
                      field.onChange(!useAsDefaultShipping);
                    }}
                  />
                }
                label={<span style={{ fontSize: '12px' }}>Use as default billing address</span>}
              />
            )}
          />
          <Controller
            name="useAsDefaultBillingAddress"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={useAsDefaultBilling}
                    onChange={() => {
                      setUseAsDefaultBilling(!useAsDefaultBilling);
                      field.onChange(!useAsDefaultBilling);
                    }}
                  />
                }
                label={<span style={{ fontSize: '12px' }}>Use as default shipping address</span>}
              />
            )}
          />
        </Stack>
        <Stack direction="column">
          <Controller
            name="useAsBillingAddress"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={useAsBilling}
                    onChange={() => {
                      setUseAsBilling(!useAsBilling);
                      field.onChange(!useAsBilling);
                    }}
                  />
                }
                label={<span style={{ fontSize: '12px' }}>Use as billing address</span>}
              />
            )}
          />
          <Controller
            name="useAsShippingAddress"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={useAsShipping}
                    onChange={() => {
                      setUseAsShipping(!useAsShipping);
                      field.onChange(!useAsShipping);
                    }}
                  />
                }
                label={<span style={{ fontSize: '12px' }}>Use as shipping address</span>}
              />
            )}
          />
        </Stack>
        <Button
          type="submit"
          disabled={!isValid}
          variant="contained"
          color="secondary"
          sx={{
            textTransform: 'none',
            fontWeight: '600',
            borderRadius: '5px',
            textDecoration: 'none',
          }}
          data-testid="registration_submit-button"
        >
          {initialData ? 'Submit' : 'Add a new address'}
        </Button>
      </Stack>
    </form>
  );
}
