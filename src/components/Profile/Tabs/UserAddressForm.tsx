import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Button, Stack, Autocomplete, Checkbox, FormControlLabel, Box } from '@mui/material';
import TextField from '@mui/material/TextField';

import { MyCustomerUpdate } from '@commercetools/platform-sdk';
import { yupResolver } from '@hookform/resolvers/yup';

import { useUpdateCustomerMutation } from '@/api/services/commercetoolsApi';
import { EditableTextField } from '@/components/Profile/Tabs/EditableTextField';
import { AddressInfo } from '@/components/Profile/Tabs/UserAddressesTab';
import { addressSchema, AddressesFormValues } from '@/components/Profile/Tabs/addressSchema';
import { COUNTRY_LIST } from '@/components/RegistrationForm/countries';
import { getCountryCode } from '@/components/RegistrationForm/utils';

interface UserAddressFormProps {
  initialData: AddressInfo;
}

export function UserAddressForm({ initialData }: UserAddressFormProps) {
  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors, isValid },
  } = useForm<AddressesFormValues>({
    resolver: yupResolver(addressSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      zipCode: initialData?.zipCode,
      city: initialData?.city,
      country: initialData?.country || '',
      street: initialData?.street,
      useAsDefaultShippingAddress: initialData?.useAsDefaultShipping,
      useAsDefaultBillingAddress: initialData?.useAsDefaultBilling,
      useAsBillingAddress: initialData?.billingAddressId,
      useAsShippingAddress: initialData?.shippingAddressId,
    },
  });

  const [useAsDefaultShipping, setUseAsDefaultShipping] = useState(false);
  const [useAsDefaultBilling, setUseAsDefaultBilling] = useState(false);
  const [useAsBilling, setUseAsBilling] = useState(false);
  const [useAsShipping, setUseAsShipping] = useState(false);
  const [updateCustomer] = useUpdateCustomerMutation();

  const onSubmit = async (data: AddressesFormValues) => {
    const payload: MyCustomerUpdate = {
      version: initialData.version || 1,
      actions: [
        {
          action: 'changeAddress',
          addressId: initialData.id,
          address: {
            streetName: data.street,
            postalCode: data.zipCode,
            city: data.city,
            country: getCountryCode(data.country) ?? '',
          },
        },
      ],
    };
    if (useAsDefaultShipping) {
      payload.actions.push({
        action: 'setDefaultShippingAddress',
        addressId: initialData?.id || '',
      });
    }

    if (useAsDefaultBilling) {
      payload.actions.push({
        action: 'setDefaultBillingAddress',
        addressId: initialData?.id || '',
      });
    }

    if (useAsShipping) {
      payload.actions.push({
        action: 'addShippingAddressId',
        addressId: initialData?.id || '',
      });
    }

    if (useAsBilling) {
      payload.actions.push({
        action: 'addBillingAddressId',
        addressId: initialData?.id || '',
      });
    }

    try {
      await updateCustomer(payload);
      const message = 'Address changed successfully';
      toast.success(message);
      setUseAsBilling(false);
      setUseAsShipping(false);
      setUseAsDefaultBilling(false);
      setUseAsDefaultShipping(false);
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
          dataTestId="editing-city"
        />

        <Box
          gap={2}
          width="100%"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Stack direction="column" width="45%">
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
                  label={<span style={{ fontSize: '12px' }}>Use as default shipping address</span>}
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
                  label={<span style={{ fontSize: '12px' }}>Use as default billing address</span>}
                />
              )}
            />
          </Stack>
          <Stack direction="column" width="45%">
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
        </Box>
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
          data-testid="editing_submit-button"
        >
          Save Changes
        </Button>
      </Stack>
    </form>
  );
}
