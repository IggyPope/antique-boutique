import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Box, Button, Stack, Typography } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import { useChangePasswordMutation, useGetCustomerQuery } from '@/api/services/commercetoolsApi';
import { EditablePasswordTextField } from '@/components/Profile/Tabs/EditablePasswordTextInput';
import { PasswordValues, passwordSchema } from '@/components/Profile/Tabs/PasswordSchema';

export function UserPasswordTab() {
  const { data: userDetails } = useGetCustomerQuery();
  const [changePassword] = useChangePasswordMutation();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<PasswordValues>({
    resolver: yupResolver(passwordSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: PasswordValues) => {
    const payload = {
      version: userDetails?.version || 1,
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      email: userDetails?.email || '',
    };

    changePassword(payload)
      .then(() => {
        toast.success('Password changed successfully');
        reset();
      })
      .catch((error) => {
        toast.error(
          `Error changing password: ${error instanceof Error ? error.message : String(error)}`,
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
          <Typography component={'p'}>Your Current Password </Typography>
          <EditablePasswordTextField<PasswordValues>
            name="currentPassword"
            control={control}
            errors={errors}
            placeholder="Current password"
            dataTestId="edit-current-password"
          />
          <Typography component={'p'}>New Password </Typography>
          <EditablePasswordTextField<PasswordValues>
            name="newPassword"
            control={control}
            errors={errors}
            placeholder="New password"
            dataTestId="edit-new-password"
          />
          <Typography component={'p'}>Confirm New Password </Typography>
          <EditablePasswordTextField<PasswordValues>
            name="confirmPassword"
            control={control}
            errors={errors}
            placeholder="Confirm new password"
            dataTestId="edit-confirm-password"
          />
          <Button
            type="submit"
            disabled={!isValid}
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
