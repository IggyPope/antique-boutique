import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form';

import { TextField } from '@mui/material';

interface NotEditableTextFieldProps<TFormValues extends FieldValues> {
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

export const NotEditableTextField = <TFormValues extends FieldValues>({
  name,
  control,
  errors,
  label,
  fieldName,
  nameToSync,
  callback,
  disabled,
  dataTestId,
}: NotEditableTextFieldProps<TFormValues>) => {
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
          inputProps={{
            'data-testid': dataTestId,
          }}
        />
      )}
    />
  );
};
