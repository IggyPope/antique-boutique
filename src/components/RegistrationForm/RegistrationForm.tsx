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
    },
  });

  const navigate = useNavigate();

  const [useAsDefaultShipping, setUseAsDefaultShipping] = useState(false);
  const [useAsDefaultBilling, setUseAsDefaultBilling] = useState(false);
  const [useAsBillingAddress, setUseAsBillingAddress] = useState(false);

  useEffect(() => {
    copyShippingToBilling(getValues, setValue, useAsBillingAddress);
  }, [getValues, setValue, useAsBillingAddress]);

  const syncStreetFields = (value: string) => {
    if (useAsBillingAddress) {
      setValue('billing_street', value);
    }
  };

  const syncCityFields = (value: string) => {
    if (useAsBillingAddress) {
      setValue('billing_city', value);
    }
  };

  const syncZipCodeFields = (value: string) => {
    if (useAsBillingAddress) {
      setValue('billing_zipCode', value);
    }
  };

  const syncCountryFields = (value: string | null) => {
    if (useAsBillingAddress && typeof value === 'string') {
      setValue('billing_country', value);
    }
  };

  const onSubmit = (data: FormValues) => {
    console.log(data, useAsDefaultShipping, useAsDefaultBilling);
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
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  placeholder="Email"
                  error={!!errors.email}
                  helperText={errors.email?.message || ' '}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Password"
                  placeholder="Password"
                  error={!!errors.password}
                  helperText={errors.password?.message || ' '}
                />
              )}
            />
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
            <Controller
              name="firstName"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
                  placeholder="First Name"
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message || ' '}
                />
              )}
            />

            <Controller
              name="lastName"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  placeholder="Last Name"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message || ' '}
                />
              )}
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
            <Controller
              name="shipping_zipCode"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Zip Code"
                  placeholder="Zip Code"
                  error={!!errors.shipping_zipCode}
                  helperText={errors.shipping_zipCode?.message || ' '}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    syncZipCodeFields(e.target.value);
                  }}
                />
              )}
            />
            <Controller
              name="shipping_street"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Street"
                  placeholder="Street"
                  error={!!errors.shipping_street}
                  helperText={errors.shipping_street?.message || ' '}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    syncStreetFields(e.target.value);
                  }}
                />
              )}
            />
            <Controller
              name="shipping_city"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="City"
                  placeholder="City"
                  error={!!errors.shipping_city}
                  helperText={errors.shipping_city?.message || ' '}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    syncCityFields(e.target.value);
                  }}
                />
              )}
            />
            <Stack direction="column">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={useAsDefaultShipping}
                    onChange={() => setUseAsDefaultShipping(!useAsDefaultShipping)}
                  />
                }
                label="Use as default shipping address"
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
            <Controller
              name="billing_zipCode"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Zip Code"
                  placeholder="Zip Code"
                  error={!!errors.billing_zipCode}
                  helperText={errors.billing_zipCode?.message || ' '}
                />
              )}
            />
            <Controller
              name="billing_street"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Street"
                  placeholder="Street"
                  error={!!errors.billing_street}
                  helperText={errors.billing_street?.message || ' '}
                />
              )}
            />
            <Controller
              name="billing_city"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="City"
                  placeholder="City"
                  error={!!errors.billing_city}
                  helperText={errors.billing_city?.message || ' '}
                />
              )}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={useAsDefaultBilling}
                  onChange={() => setUseAsDefaultBilling(!useAsDefaultBilling)}
                />
              }
              label="Use as default billing address"
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
