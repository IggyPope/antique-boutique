import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Box, Button, Stack, Typography } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import { ChangeUserPasswordService } from '@/api/services/ChangeUserPasswordService';
import { GetUserDetailsService } from '@/api/services/GetUserDetailsService';
import { EditablePasswordTextField } from '@/components/Profile/Tabs/EditablePasswordTextInput';
import { PasswordValues, passwordSchema } from '@/components/Profile/Tabs/PasswordSchema';
import { useAuth } from '@/hooks/useAuth';
import { PasswordFlowTokenStore } from '@/store/PasswordStore';

export function UserPasswordTab() {
  const {
    handleSubmit,
    control,
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
  const passwordService = ChangeUserPasswordService.getInstance();
  const userService = GetUserDetailsService.getInstance();
  const userVersionRef = useRef<number>(1);
  const userEmailRef = useRef<string>('');
  const { signIn } = useAuth();

  const onSubmit = async (data: PasswordValues) => {
    const payload = {
      version: userVersionRef.current,
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };
    try {
      await passwordService.changePassword(payload);
      toast.success('Password changed successfully');
      signIn(userEmailRef.current, data.newPassword);
      PasswordFlowTokenStore.removeData();
    } catch (error) {
      toast.error(
        `Error changing password: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userService.getUserDetails();
        const version = res.body.version;
        const email = res.body.email;
        if (version && email) {
          userVersionRef.current = version;
          userEmailRef.current = email;
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    void fetchData();
  }, [userService]);

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
