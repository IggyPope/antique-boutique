import { Control, Controller, FieldErrors } from 'react-hook-form';

import { TextField } from '@mui/material';

import { LoginFormValues } from '@/components/LoginForm/schema';

interface UserNameProps {
  name: keyof LoginFormValues;
  control: Control<LoginFormValues>;
  errors: FieldErrors<LoginFormValues>;
}

export const UserName = ({ name, control, errors }: UserNameProps) => {
  return (
    <Controller
      name={name}
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
  );
};
