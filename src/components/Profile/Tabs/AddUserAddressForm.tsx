import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Button, Stack, Autocomplete, Checkbox, FormControlLabel, Box } from '@mui/material';
import TextField from '@mui/material/TextField';

import { MyCustomerUpdate } from '@commercetools/platform-sdk';
import { yupResolver } from '@hookform/resolvers/yup';

import { useUpdateCustomerMutation } from '@/api/services/commercetoolsApi';
import { NotEditableTextField } from '@/components/Profile/Tabs/NotEditableTextField';
import { addressSchema, AddressesFormValues } from '@/components/Profile/Tabs/addressSchema';
import { COUNTRY_LIST } from '@/components/RegistrationForm/countries';
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

export function AddUserAddressForm({ version }: AddUserAddressFormProps) {
  const {
    handleSubmit,
    control,
    trigger,
    reset,
    formState: { errors, isValid },
  } = useForm<AddressesFormValues>({
    resolver: yupResolver(addressSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const [useAsDefaultShipping, setUseAsDefaultShipping] = useState(false);
  const [useAsDefaultBilling, setUseAsDefaultBilling] = useState(false);
  const [useAsBilling, setUseAsBilling] = useState(false);
  const [useAsShipping, setUseAsShipping] = useState(false);
  const [updateCustomer] = useUpdateCustomerMutation();

  const onSubmit = async (data: AddressesFormValues) => {
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

      if (useAsDefaultShipping || useAsDefaultShipping || useAsShipping || useAsBilling) {
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

        if (useAsDefaultShipping) {
          payload.actions.push({
            action: 'setDefaultShippingAddress',
            addressId: id,
          });
        }

        if (useAsDefaultBilling) {
          payload.actions.push({
            action: 'setDefaultBillingAddress',
            addressId: id,
          });
        }

        if (useAsShipping) {
          payload.actions.push({
            action: 'addShippingAddressId',
            addressId: id,
          });
        }
        if (useAsBilling) {
          payload.actions.push({
            action: 'addBillingAddressId',
            addressId: id,
          });
        }

        await updateCustomer(payload);
      }
      const message = 'Address added successfully';
      reset();
      setUseAsBilling(false);
      setUseAsShipping(false);
      setUseAsDefaultBilling(false);
      setUseAsDefaultShipping(false);
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
                await trigger(`zipCode`);
              }}
              isOptionEqualToValue={(option, value) => option === value}
            />
          )}
        />
        <NotEditableTextField
          name="zipCode"
          control={control}
          errors={errors}
          label="zipCode"
          fieldName="Zip Code"
          dataTestId="editing-zip-code"
        />

        <NotEditableTextField
          name="street"
          control={control}
          errors={errors}
          label="street"
          fieldName="Street"
          dataTestId="editing-street"
        />

        <NotEditableTextField
          name="city"
          control={control}
          errors={errors}
          label="city"
          fieldName="City"
          dataTestId="editing-billing-city"
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
          data-testid="addAddress_submit-button"
        >
          Add address
        </Button>
      </Stack>
    </form>
  );
}
