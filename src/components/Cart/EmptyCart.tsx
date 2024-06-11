import { useNavigate } from 'react-router-dom';

import { Stack, Typography, Link } from '@mui/material';

import CustomButton from '@/components/UI/Button/CustomButton';

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <Stack direction="column" justifyContent="center" alignItems="center" gap={2} height="100%">
      <Typography variant="h5">Nothing in your cart yet!</Typography>
      <Typography variant="body1">
        Why not take a look through{' '}
        <Link
          href="/catalog"
          color="secondary"
          sx={{
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'color 0.3s',
            '@media (any-hover: hover)': {
              '&:hover': {
                color: 'secondary.dark',
              },
            },
          }}
        >
          our catalog
        </Link>{' '}
        to discover some vintage items? Whether you are looking for something specific or just
        browsing for inspiration, we are sure you will find something you love.
      </Typography>
      <CustomButton onClick={() => navigate('/catalog')}>Shop Now</CustomButton>
    </Stack>
  );
};

export default EmptyCart;
