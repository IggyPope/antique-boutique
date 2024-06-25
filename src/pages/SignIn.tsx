import { Link } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import { LoginForm } from '@/components/LoginForm/LoginForm';

const SignIn = () => {
  return (
    <>
      <LoginForm />
      <Box
        sx={{
          marginTop: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Typography variant="h6">Don&rsquo;t have an account yet?</Typography>
        <Link to="/signup">Sign up</Link>
      </Box>
    </>
  );
};

export default SignIn;
