import { Stack, Typography, lighten } from '@mui/material';

import DiscountCode from '@/components/Cart/DiscountCode';
import TotalPriceSummary from '@/components/Cart/TotalPriceSummary';
import CustomButton from '@/components/UI/Button/CustomButton';
import theme from '@/theme';

const CartSummary = () => {
  const subtotalPrice = 1000;
  const totalSummary = 980;

  return (
    <Stack
      gap={3}
      sx={{
        padding: '34px 37px',
        minWidth: '350px',
        backgroundColor: lighten(theme.palette.primary.main, 0.9),
        [theme.breakpoints.down('md')]: {
          minWidth: '0px',
          maxWidth: '400px',
        },
      }}
    >
      <Typography
        fontSize="1.125rem"
        fontWeight="600"
        pb={1.4}
        sx={{ borderBottom: `1px solid ${theme.palette.primary.main}` }}
      >
        Summary
      </Typography>
      <DiscountCode disabled={!subtotalPrice} />
      <TotalPriceSummary subtotalSummary={subtotalPrice} totalSummary={totalSummary} />
      <CustomButton onClick={() => {}} disabled={!subtotalPrice}>
        Proceed to Checkout
      </CustomButton>
    </Stack>
  );
};

export default CartSummary;
