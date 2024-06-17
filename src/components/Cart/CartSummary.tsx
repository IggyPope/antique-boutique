import { Stack, Typography, lighten, Button } from '@mui/material';

import DiscountCode from '@/components/Cart/DiscountCode';
import TotalPriceSummary from '@/components/Cart/TotalPriceSummary';
import { useCart } from '@/hooks/useCart';
import theme from '@/theme';

const CartSummary = () => {
  const { data: cartData } = useCart();

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
      <DiscountCode disabled={!cartData?.totalPrice.centAmount} />
      <TotalPriceSummary
        subtotalSummary={cartData?.totalPrice.centAmount ?? 0}
        totalSummary={cartData?.totalPrice.centAmount ?? 0}
      />
      <Button onClick={() => {}} disabled={!cartData?.totalPrice.centAmount}>
        Proceed to Checkout
      </Button>
    </Stack>
  );
};

export default CartSummary;
