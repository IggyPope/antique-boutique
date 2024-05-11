import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, Stack, Typography, IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';

import { yupResolver } from '@hookform/resolvers/yup';

import { schema, LoginFormValues } from './schema';

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
      username: '',
      password: '',
    },
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = (data: LoginFormValues) => {
    console.log(data);

    navigate('/');
  };
  // const theme = useTheme();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <Stack direction="column" gap={1} width="50%">
          <Typography component={'p'}>Your credentials</Typography>
          <Controller
            name="username"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                placeholder="Email"
                error={!!errors.username}
                helperText={errors.username?.message || ' '}
              />
            )}
          />

          <Controller
            name="password"
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
          <Button
            type="submit"
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
          </Button>
        </Stack>
      </Box>
    </form>
  );
}
