import { Box, Link, Stack, Typography, styled } from '@mui/material';

import TestMuiButton from '@/components/TestMuiButton';

import logo from '/favicon.svg';

const Img = styled('img')(() => ({
  height: '6em',
  padding: '1.5em',
  willChange: 'filter',
  transition: 'filter 300ms',
  animation: 'logo-spin infinite 20s linear',
  '&:hover': {
    filter: 'drop-shadow(0 0 2em #646cffaa)',
  },
  '@keyframes logo-spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
}));

function App() {
  return (
    <>
      <Box>
        <Link href="#" target="_blank">
          <Img src={logo} alt="Antique Boutique logo" />
        </Link>
      </Box>
      <Typography variant="h1">Antique Boutique</Typography>
      <Stack padding={2} gap={2}>
        <button>Simple button</button>
        <TestMuiButton />
        <Typography variant="body2">
          Edit <code>src/App.tsx</code> and save to test HMR
        </Typography>
      </Stack>
    </>
  );
}

export default App;
