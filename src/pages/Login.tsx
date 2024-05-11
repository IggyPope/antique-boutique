import { Typography } from '@mui/material';

import { LoginForm } from '@/components/LoginForm/LoginForm';

const Login = () => {
  return (
    <>
      <Typography variant="h3">Sign in</Typography>
      <LoginForm />
    </>
  );
};

export default Login;
