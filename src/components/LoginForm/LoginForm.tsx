import { useForm } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import { Box, Stack, Typography } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import { UserName } from '@/components/LoginForm/NameTextInput';
import { schema, LoginFormValues } from '@/components/LoginForm/schema';
import { PasswordTextInput } from '@/components/RegistrationForm/PasswordTextInput';
import { useAuth } from '@/hooks/useAuth';

export function LoginForm() {
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { signIn, isLoading } = useAuth();

  const onSubmit = (data: LoginFormValues) => {
    signIn(data.email, data.password);
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
          <Typography component={'p'}>Your credentials</Typography>
          <UserName name="email" control={control} errors={errors} />
          <PasswordTextInput<LoginFormValues>
            name="password"
            control={control}
            errors={errors}
            dataTestId="login-password"
          />
          <LoadingButton
            type="submit"
            loading={isLoading}
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
          </LoadingButton>
        </Stack>
      </Box>
    </form>
  );
}
