import { Link } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

const Main = () => {
  return (
    <>
      <Box
        sx={{
          marginTop: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          justifyContent: 'flex-end',
          width: '100%',
        }}
      >
        <Link to="/signin">Sign in</Link>
        <Link to="/signup">Sign up</Link>
      </Box>
      <Typography variant="h3">Main</Typography>
    </>
  );
};

export default Main;
