import { Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const PromoSlogan = () => {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        margin: '0 auto',
        textAlign: 'center',
        padding: '20px 0',
        [theme.breakpoints.down('sm')]: [{ padding: '10px 0' }],
      }}
    >
      <Typography variant="h5">
        Our mission is to collect unique and timeless design artifacts
      </Typography>
      <Typography variant="h5">From heritage to contemporary</Typography>
    </Stack>
  );
};

export default PromoSlogan;
