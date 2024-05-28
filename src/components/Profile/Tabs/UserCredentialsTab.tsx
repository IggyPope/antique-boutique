import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import { Box, Stack, Typography, FormHelperText } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { yupResolver } from '@hookform/resolvers/yup';

import { AuthService } from '@/api/services/AuthService';
import { useAuth } from '@/hooks/useAuth';

import { EditableTextField } from './EditableTextField';
import { CredentialsFormValues, schema } from './credentialsSchema';

export function UserCredentialsTab() {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<CredentialsFormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      dateOfBirth: new Date(2000, 0, 1),
    },
  });

  const { isLoading } = useAuth();

  const onSubmit = (data: CredentialsFormValues) => {
    console.log(data.email, data.firstName);
  };
  const service = AuthService.getInstance();
  useEffect(() => {
    service.apiRoot
      .me()
      .get()
      .execute()
      .then((res) => {
        const email = res.body.email;
        const firstName = res.body.firstName;
        const lastName = res.body.lastName;
        const dateString = res.body.dateOfBirth;
        const dateParts = dateString?.split('-');
        if (dateParts) {
          const dateOfBirth = new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2]);
          setValue('dateOfBirth', dateOfBirth),
            {
              shouldValidate: true,
            };
        }
        if (firstName && lastName && email) {
          setValue('firstName', firstName, {
            shouldValidate: true,
          });
          setValue('lastName', lastName, {
            shouldValidate: true,
          });
          setValue('email', email, {
            shouldValidate: true,
          });
        }
        console.log(JSON.stringify(res));
      })
      .catch((err) => {
        throw new Error(`${err}`);
      });
  }, [service.apiRoot, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <Stack
          direction="column"
          gap={1}
          sx={{
            width: {
              xs: '80%',
              md: '40%',
              sm: '50%',
            },
            padding: {
              xs: '5%',
              sm: '0',
            },
          }}
        >
          <Typography component={'p'}>Your Name, Date of Birth and E-mail Address </Typography>
          <EditableTextField<CredentialsFormValues>
            name="firstName"
            control={control}
            errors={errors}
            label={'email'}
            fieldName={''}
          />
          <EditableTextField<CredentialsFormValues>
            name="lastName"
            control={control}
            errors={errors}
            label={'email'}
            fieldName={''}
          />
          <EditableTextField<CredentialsFormValues>
            name="email"
            control={control}
            errors={errors}
            label={'email'}
            fieldName={''}
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
          <LoadingButton
            type="submit"
            loading={isLoading}
            disabled={!isValid}
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
          </LoadingButton>
        </Stack>
      </Box>
    </form>
  );
}
