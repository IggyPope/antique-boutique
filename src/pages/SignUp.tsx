import { Link } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import { RegistrationForm } from '../components/RegistrationForm/RegistrationForm';

const SignUp = () => {
  return (
    <>
      <Typography variant="h3">Sign Up</Typography>
      <RegistrationForm />
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
        <Typography variant="h6">Already have an account?</Typography>
        <Link to="/signin">Sign in </Link>
      </Box>
    </>
  );
};

export default SignUp;
