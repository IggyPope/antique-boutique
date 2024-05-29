import { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { LoadingButton } from '@mui/lab';
import { Box, Stack, Typography, FormHelperText } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { MyCustomerUpdate } from '@commercetools/platform-sdk';
import { yupResolver } from '@hookform/resolvers/yup';

import { GetUserDetailsService } from '@/api/services/GetUserDetailsService';
import { UpdateCustomerService } from '@/api/services/UpdateCustomerService';
import { useAuth } from '@/hooks/useAuth';

import { EditableTextField } from './EditableTextField';
import { CredentialsFormValues, schema } from './credentialsSchema';

export function UserCredentialsTab() {
  const userDetailsService = GetUserDetailsService.getInstance();
  const updateService = UpdateCustomerService.getInstance();
  const userVersionRef = useRef<number>(1);
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
    const fetchData = async () => {
      try {
        const res = await userDetailsService.getUserDetails();
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
        const version = res.body.version;
        if (version) {
          userVersionRef.current = version;
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
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    void fetchData();
  }, [userDetailsService, setValue]);

  const onSubmit = async (data: CredentialsFormValues) => {
    const payload: MyCustomerUpdate = {
      version: userVersionRef.current,
      actions: [
        {
          action: 'setFirstName',
          firstName: data.firstName,
        },
        {
          action: 'setLastName',
          lastName: data.lastName,
        },

        {
          action: 'changeEmail',
          email: data.email,
        },

        {
          action: 'setDateOfBirth',
          dateOfBirth: new Intl.DateTimeFormat('fr-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }).format(new Date(data.dateOfBirth)),
        },
      ],
    };
    try {
      await updateService.updateCustomer(payload);
      toast.success('Profile data changed successfully');
    } catch (error) {
      toast.error(
        `Error changing password: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  };

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
            label={'firstName'}
            fieldName={'First Name'}
          />
          <EditableTextField<CredentialsFormValues>
            name="lastName"
            control={control}
            errors={errors}
            label={'lastName'}
            fieldName={'Last Name'}
          />
          <EditableTextField<CredentialsFormValues>
            name="email"
            control={control}
            errors={errors}
            label={'email'}
            fieldName={'Email'}
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
