import { useState } from 'react';
import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, TextField } from '@mui/material';

interface PasswordProps<TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  errors: FieldErrors<TFormValues>;
}

type ErrorMessage = string | null;

export const PasswordTextInput = <TFormValues extends FieldValues>({
  name,
  control,
  errors,
}: PasswordProps<TFormValues>) => {
  const [showPassword, setShowPassword] = useState(false);
  const errorMessage = errors[name] ? (errors[name]?.message as ErrorMessage) : null;
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
          helperText={errorMessage}
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
