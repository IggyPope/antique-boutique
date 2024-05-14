import { useState } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, TextField } from '@mui/material';

import { FormValues } from './schema';

interface PasswordProps {
  name: keyof FormValues;
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
}

export const Password = ({ name, control, errors }: PasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <TextField
          {...field}
          type={showPassword ? 'text' : 'password'}
          label="Password"
          placeholder="Password"
          error={!!errors.password}
          helperText={errors.password?.message || ' '}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />
      )}
    />
  );
};
