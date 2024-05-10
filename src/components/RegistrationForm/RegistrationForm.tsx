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

import { countries } from './countries';
import { schema, FormValues } from './schema';

export function RegistrationForm() {
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      age: new Date(),
      email: '',
      password: '',
      country: '',
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Stack direction="column" gap={3} width="40%">
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
                helperText={errors.email?.message}
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
                helperText={errors.password?.message}
              />
            )}
          />
        </Stack>
        <Stack direction="column" gap={3} width="40%">
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
                helperText={errors.firstName?.message}
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
                helperText={errors.lastName?.message}
              />
            )}
          />

          <Controller
            name="age"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date of Birth"
                  value={field.value}
                  onChange={(newValue) => field.onChange(newValue)}
                />
                {errors.age && <FormHelperText error>{errors.age.message}</FormHelperText>}
              </LocalizationProvider>
            )}
          />
          <Controller
            name="country"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={countries}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country"
                    inputProps={{ ...params.inputProps, autoComplete: 'none' }}
                    error={!!errors.country}
                    helperText={errors.country?.message}
                  />
                )}
                onChange={(_, newValue) => {
                  field.onChange(newValue ?? '');
                }}
                isOptionEqualToValue={(option, value) => option === value}
              />
            )}
          />

          <Button
            type="submit"
            disabled={!isDirty || !isValid}
            variant="contained"
            color="secondary"
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </form>
  );
}
