import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { LoadingButton } from '@mui/lab';
import { Box, Stack, Typography, FormHelperText } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { yupResolver } from '@hookform/resolvers/yup';

import { useGetCustomerQuery, useUpdateCustomerMutation } from '@/api/services/commercetoolsApi';
import { EditableTextField } from '@/components/Profile/Tabs/EditableTextField';
import { CredentialsFormValues, schema } from '@/components/Profile/Tabs/credentialsSchema';
import { createPayload, parseDateOfBirth } from '@/components/Profile/Tabs/utils';
import { useAuth } from '@/hooks/useAuth';

export function UserCredentialsTab() {
  const { data: userDetails } = useGetCustomerQuery();
  const [updateCustomer] = useUpdateCustomerMutation();

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

  useEffect(() => {
    if (
      !userDetails ||
      !userDetails.dateOfBirth ||
      !userDetails.firstName ||
      !userDetails.lastName ||
      !userDetails.email
    )
      return;
    const dateOfBirth = parseDateOfBirth(userDetails.dateOfBirth);
    if (dateOfBirth) {
      setValue('dateOfBirth', dateOfBirth), { shouldValidate: true };
    }
    setValue('firstName', userDetails?.firstName, {
      shouldValidate: true,
    });
    setValue('lastName', userDetails?.lastName, {
      shouldValidate: true,
    });
    setValue('email', userDetails?.email, {
      shouldValidate: true,
    });
  }, [userDetails, setValue]);

  const onSubmit = (data: CredentialsFormValues) => {
    const payload = createPayload(userDetails, data);

    updateCustomer(payload)
      .then(() => {
        toast.success('Profile data changed successfully');
      })
      .catch((error) => {
        toast.error(
          `Error changing profile data: ${error instanceof Error ? error.message : String(error)}`,
        );
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <Stack
          direction="column"
          gap={1}
          sx={{
            width: {
              xs: '90%',
              md: '50%',
              sm: '65%',
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
            label={'firstName'}
            fieldName={'First Name'}
            dataTestId={'edit-first-name'}
          />
          <EditableTextField<CredentialsFormValues>
            name="lastName"
            control={control}
            errors={errors}
            label={'lastName'}
            fieldName={'Last Name'}
            dataTestId={'edit-last-name'}
          />
          <EditableTextField<CredentialsFormValues>
            name="email"
            control={control}
            errors={errors}
            label={'email'}
            fieldName={'Email'}
            dataTestId={'edit-email'}
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
