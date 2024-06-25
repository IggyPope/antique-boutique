import { Stack, Typography, lighten, Button } from '@mui/material';

import { AppliedCodes } from '@/components/Cart/AppliedCodes';
import DiscountCode from '@/components/Cart/DiscountCode';
import TotalPriceSummary from '@/components/Cart/TotalPriceSummary';
import { useCart } from '@/hooks/useCart';
import theme from '@/theme';

const CartSummary = ({ isLoading }: { isLoading: boolean }) => {
  const { cartData, subtotal, total, discount } = useCart();

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
      <DiscountCode disabled={!cartData?.totalPrice.centAmount || isLoading} />
      <AppliedCodes isLoading={isLoading} />
      <TotalPriceSummary subtotalSummary={subtotal} totalSummary={total} discount={discount} />
      <Button onClick={() => {}} disabled={!total || isLoading}>
        Proceed to Checkout
      </Button>
    </Stack>
  );
};

export default CartSummary;
