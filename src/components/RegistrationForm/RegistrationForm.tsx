import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Stack,
  Typography,
  FormHelperText,
  Autocomplete, // useTheme,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { yupResolver } from '@hookform/resolvers/yup';

import { countriesArr } from './countries';
import { schema, FormValues } from './schema';

export function RegistrationForm() {
  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: new Date(),
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

  const onSubmit = (data: FormValues) => {
    console.log(data);

    navigate('/');
  };
  // const theme = useTheme();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" gap={2} width="100%">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Stack direction="column" gap={1} width="40%">
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
          <Stack direction="column" gap={1} width="40%">
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Stack direction="column" gap={1} width="40%">
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
          </Stack>
          <Stack direction="column" gap={1} width="40%">
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
