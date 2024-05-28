import { useState } from 'react';
import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form';

import EditNoteIcon from '@mui/icons-material/EditNote';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, TextField } from '@mui/material';

interface EditablePasswordProps<TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  errors: FieldErrors<TFormValues>;
  dataTestId?: string;
}

type ErrorMessage = string | null;

export const EditablePasswordTextField = <TFormValues extends FieldValues>({
  name,
  control,
  errors,
  dataTestId,
}: EditablePasswordProps<TFormValues>) => {
  const [showPassword, setShowPassword] = useState(false);
  const [editModeOn, setEditModeOn] = useState(false);
  const errorMessage = errors[name] ? (errors[name]?.message as ErrorMessage) : ' ';
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
              <>
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                <IconButton onClick={() => setEditModeOn(!editModeOn)} edge="end">
                  {editModeOn ? (
                    <PlaylistAddCheckIcon sx={{ color: '#7db800' }} />
                  ) : (
                    <EditNoteIcon sx={{ color: '#e46d6d' }} />
                  )}
                </IconButton>
              </>
            ),
          }}
          inputProps={{
            'data-testid': dataTestId,
            readOnly: !editModeOn,
          }}
        />
      )}
    />
  );
};
