import { useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Box,
  Stack,
  TextField,
  Button,
} from '@mui/material';

import { NotEditableTextField } from '@/components/Profile/Tabs/NotEditableTextField';
import { AddressesFormValues } from '@/components/Profile/Tabs/addressSchema';
import { COUNTRY_LIST } from '@/components/RegistrationForm/countries';

interface AddUserAddressFormProps {
  handleResetFlags: React.MutableRefObject<(() => void) | undefined>;
}

const initialAddressFlagsState = {
  useAsDefaultShipping: false,
  useAsDefaultBilling: false,
  useAsBilling: false,
  useAsShipping: false,
};

export function AddUserAddressForm({ handleResetFlags }: AddUserAddressFormProps) {
  const [addressFlags, setAddressFlags] = useState(initialAddressFlagsState);

  const {
    control,
    trigger,
    formState: { errors, isValid },
  } = useFormContext<AddressesFormValues>();

  useEffect(() => {
    handleResetFlags.current = () => {
      setAddressFlags(initialAddressFlagsState);
    };
  }, [handleResetFlags]);

  return (
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
                    checked={addressFlags.useAsDefaultShipping}
                    onChange={() => {
                      setAddressFlags((prev) => ({
                        ...prev,
                        useAsDefaultShipping: !addressFlags.useAsDefaultShipping,
                      }));
                      field.onChange(!addressFlags.useAsDefaultShipping);
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
                    checked={addressFlags.useAsDefaultBilling}
                    onChange={() => {
                      setAddressFlags((prev) => ({
                        ...prev,
                        useAsDefaultBilling: !addressFlags.useAsDefaultBilling,
                      }));
                      field.onChange(!addressFlags.useAsDefaultBilling);
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
                    checked={addressFlags.useAsBilling}
                    onChange={() => {
                      setAddressFlags((prev) => ({
                        ...prev,
                        useAsBilling: !addressFlags.useAsBilling,
                      }));
                      field.onChange(!addressFlags.useAsBilling);
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
                    checked={addressFlags.useAsShipping}
                    onChange={() => {
                      setAddressFlags((prev) => ({
                        ...prev,
                        useAsShipping: !addressFlags.useAsShipping,
                      }));
                      field.onChange(!addressFlags.useAsShipping);
                    }}
                  />
                }
                label={<span style={{ fontSize: '12px' }}>Use as shipping address</span>}
              />
            )}
          />
        </Stack>
      </Box>
      <Button type="submit" disabled={!isValid} variant="contained" color="secondary">
        Save
      </Button>
    </Stack>
  );
}
