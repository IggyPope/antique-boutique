import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Stack,
  Typography,
  FormHelperText,
  Autocomplete,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { yupResolver } from '@hookform/resolvers/yup';

import { ControlledTextField } from './ControlledTextField';
import { Password } from './Password';
import { countriesArr } from './countries';
import { schema, FormValues } from './schema';
import { copyShippingToBilling } from './utils';

export function RegistrationForm() {
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    trigger,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: new Date(2000, 0, 1),
      email: '',
      password: '',
      billing_zipCode: '',
      billing_city: '',
      billing_country: '',
      billing_street: '',
      shipping_zipCode: '',
      shipping_city: '',
      shipping_country: '',
      shipping_street: '',
      useAsDefaultShippingAddress: false,
      useAsDefaultBillingAddress: false,
    },
  });

  const navigate = useNavigate();

  const [useAsDefaultShipping, setUseAsDefaultShipping] = useState(false);
  const [useAsDefaultBilling, setUseAsDefaultBilling] = useState(false);
  const [useAsBillingAddress, setUseAsBillingAddress] = useState(false);

  useEffect(() => {
    copyShippingToBilling(getValues, setValue, useAsBillingAddress);
  }, [getValues, setValue, useAsBillingAddress]);

  const syncFields = (fieldName: keyof FormValues, value: string) => {
    if (useAsBillingAddress) {
      setValue(fieldName, value);
    }
  };
  const syncCountryFields = (value: string | null) => {
    if (useAsBillingAddress && typeof value === 'string') {
      setValue('billing_country', value);
    }
  };

  const onSubmit = (data: FormValues) => {
    console.log(data);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" gap={2} width="100%">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
          }}
        >
          <Stack
            direction="column"
            gap={1}
            justifyContent="center"
            sx={{
              width: {
                sm: '40%',
              },
              padding: {
                xs: '5%',
                sm: '0',
              },
            }}
          >
            <Typography component={'p'}>Your credentials</Typography>
            <ControlledTextField
              name="email"
              control={control}
              errors={errors}
              label="email"
              fieldName="Email"
            />
            <Password name="password" control={control} errors={errors} />
          </Stack>
          <Stack
            direction="column"
            gap={1}
            justifyContent="center"
            sx={{
              width: {
                sm: '40%',
              },
              padding: {
                xs: '5%',
                sm: '0',
              },
            }}
          >
            <Typography component={'p'}>Your personal information</Typography>
            <ControlledTextField
              name="firstName"
              control={control}
              errors={errors}
              label="firstName"
              fieldName="Frist Name"
            />
            <ControlledTextField
              name="lastName"
              control={control}
              errors={errors}
              label="lastName"
              fieldName="Last Name"
            />
            <Controller
              name="dateOfBirth"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date of Birth"
                    format="dd/MM/yyyy"
                    value={field.value}
                    onChange={(newValue) => field.onChange(newValue)}
                    slotProps={{
                      textField: {
                        size: 'small',
                      },
                    }}
                  />
                  {errors.dateOfBirth ? (
                    <FormHelperText error>{errors.dateOfBirth?.message}</FormHelperText>
                  ) : (
                    <FormHelperText> </FormHelperText>
                  )}
                </LocalizationProvider>
              )}
            />
          </Stack>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
          }}
        >
          <Stack
            direction="column"
            justifyContent="center"
            gap={1}
            sx={{
              width: {
                sm: '40%',
              },
              padding: {
                xs: '5%',
                sm: '0',
              },
            }}
          >
            <Typography component={'p'}>Your Shipping Address</Typography>
            <Controller
              name="shipping_country"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={countriesArr}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country"
                      inputProps={{ ...params.inputProps, autoComplete: 'none' }}
                      error={!!errors.shipping_country}
                      helperText={errors.shipping_country?.message || ' '}
                    />
                  )}
                  onChange={async (_, newValue) => {
                    field.onChange(newValue ?? '');
                    await trigger(`shipping_zipCode`);
                    syncCountryFields(newValue);
                  }}
                  isOptionEqualToValue={(option, value) => option === value}
                />
              )}
            />
            <ControlledTextField
              name="shipping_zipCode"
              control={control}
              errors={errors}
              label="shipping_zipCode"
              fieldName="Zip Code"
              nameToSync="billing_zipCode"
              callback={syncFields}
            />
            <ControlledTextField
              name="shipping_street"
              control={control}
              errors={errors}
              label="shipping_street"
              fieldName="Street"
              nameToSync="billing_street"
              callback={syncFields}
            />
            <ControlledTextField
              name="shipping_city"
              control={control}
              errors={errors}
              label="shipping_city"
              fieldName="City"
              nameToSync="billing_city"
              callback={syncFields}
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
                    label="Use as default shipping address"
                  />
                )}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={useAsBillingAddress}
                    onChange={() => setUseAsBillingAddress(!useAsBillingAddress)}
                  />
                }
                label="Use as billing address"
              />
            </Stack>
          </Stack>
          <Stack
            direction="column"
            justifyContent="center"
            gap={1}
            sx={{
              width: {
                sm: '40%',
              },
              padding: {
                xs: '5%',
                sm: '0',
              },
            }}
          >
            <Typography component={'p'}>Your Billing Address</Typography>

            <Controller
              name="billing_country"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={countriesArr}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country"
                      inputProps={{ ...params.inputProps, autoComplete: 'none' }}
                      error={!!errors.billing_country}
                      helperText={errors.billing_country?.message || ' '}
                    />
                  )}
                  onChange={async (_, newValue) => {
                    field.onChange(newValue ?? '');
                    await trigger(`billing_zipCode`);
                  }}
                  isOptionEqualToValue={(option, value) => option === value}
                />
              )}
            />
            <ControlledTextField
              name="billing_zipCode"
              control={control}
              errors={errors}
              label="billing_zipCode"
              fieldName="Zip Code"
            />

            <ControlledTextField
              name="billing_street"
              control={control}
              errors={errors}
              label="billing_street"
              fieldName="Street"
            />

            <ControlledTextField
              name="billing_city"
              control={control}
              errors={errors}
              label="billing_city"
              fieldName="City"
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
                  label="Use as default billing address"
                />
              )}
            />
            <Button
              type="submit"
              disabled={!isDirty || !isValid}
              variant="contained"
              color="secondary"
              sx={{
                textTransform: 'none',
                fontWeight: '600',
                borderRadius: '5px',
                textDecoration: 'none',
              }}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Stack>
    </form>
  );
}
