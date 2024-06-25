import { useState } from 'react';
import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form';

import EditNoteIcon from '@mui/icons-material/EditNote';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { IconButton, TextField } from '@mui/material';

interface EditableTextFieldProps<TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  errors: FieldErrors<TFormValues>;
  label: keyof FieldErrors<TFormValues> | Path<TFormValues>;
  fieldName: string;
  nameToSync?: Path<TFormValues>;
  callback?: (arg: Path<TFormValues>, val: string) => void;
  disabled?: boolean;
  dataTestId?: string;
}
type ErrorMessage = string | null;

export const EditableTextField = <TFormValues extends FieldValues>({
  name,
  control,
  errors,
  label,
  fieldName,
  nameToSync,
  callback,
  disabled,
  dataTestId,
}: EditableTextFieldProps<TFormValues>) => {
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
          label={fieldName}
          placeholder={fieldName}
          error={!!errors[label]}
          helperText={errorMessage}
          onChange={(e) => {
            field.onChange(e.target.value);
            if (callback && nameToSync) {
              callback(nameToSync, e.target.value);
            }
          }}
          disabled={disabled}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setEditModeOn(!editModeOn)} edge="end">
                {editModeOn ? (
                  <PlaylistAddCheckIcon sx={{ color: '#7db800' }} />
                ) : (
                  <EditNoteIcon sx={{ color: '#e46d6d' }} />
                )}
              </IconButton>
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
