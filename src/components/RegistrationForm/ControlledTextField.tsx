import { Control, Controller, FieldErrors } from 'react-hook-form';

import { TextField } from '@mui/material';

import { FormValues } from './schema';

interface ControledTextFieldProps {
  name: keyof FormValues;
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  label: keyof FieldErrors<FormValues> | keyof FormValues;
  fieldName: string;
  nameToSync?: keyof FormValues;
  callback?: (arg: keyof FormValues, val: string) => void;
}

export const ControlledTextField = ({
  name,
  control,
  errors,
  label,
  fieldName,
  nameToSync,
  callback,
}: ControledTextFieldProps) => {
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
          helperText={errors[label]?.message || ' '}
          onChange={(e) => {
            field.onChange(e.target.value);
            if (callback && nameToSync) {
              callback(nameToSync, e.target.value);
            }
          }}
        />
      )}
    />
  );
};
