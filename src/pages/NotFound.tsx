import { useNavigate } from 'react-router-dom';

import { Container, Stack, Typography } from '@mui/material';

import notFoundSrc from '@/assets/img/not-found.png';
import CustomButton from '@/components/UI/Button/CustomButton';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap="30px"
        flexWrap="wrap"
      >
        <img src={notFoundSrc} alt="404" width="250px" height="auto" />
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          spacing="15px"
          alignContent="center"
        >
          <Typography variant="body1">
            Oops! Page not found. Do not worry, we are on it! Feel free to explore other pages.
          </Typography>
          <CustomButton onClick={() => navigate('/')}>Home</CustomButton>
        </Stack>
      </Stack>
    </Container>
  );
};

export default NotFound;
