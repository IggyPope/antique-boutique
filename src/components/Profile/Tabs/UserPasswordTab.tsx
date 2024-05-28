import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Button, Stack, Typography } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import { AuthService } from '@/api/services/AuthService';

import { EditablePasswordTextField } from './EditablePasswordTextInput';
import { PasswordValues, schema } from './PasswordSchema';

export function UserPasswordTab() {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm<PasswordValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: PasswordValues) => {
    console.log(data.password, data.confirmPassword);
  };
  const service = AuthService.getInstance();
  useEffect(() => {
    service.apiRoot
      .me()
      .get()
      .execute()
      .then((res) => {
        const password = res.body.password;
        if (password) {
          setValue('password', password);
          setValue('confirmPassword', password);
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
          <Typography component={'p'}>Your Password </Typography>
          <EditablePasswordTextField<PasswordValues>
            name="password"
            control={control}
            errors={errors}
            dataTestId="edit-password"
          />
          <Typography component={'p'}>Confirm Your Password </Typography>
          <EditablePasswordTextField<PasswordValues>
            name="confirmPassword"
            control={control}
            errors={errors}
            dataTestId="edit-password"
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
            data-testid="edit_password_submit-button"
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </form>
  );
}
