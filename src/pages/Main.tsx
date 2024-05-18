import { Box } from '@mui/material';

import MainNavLinks from '@/components/MainNavLinks/MainNavLinks';

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
        <MainNavLinks />
      </Box>
    </>
  );
};

export default Main;
