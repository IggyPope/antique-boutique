import { useEffect, useState } from 'react';

import { Grid } from '@mui/material';

import CartList from '@/components/Cart/CartList';
import CartSummary from '@/components/Cart/CartSummary';
import EmptyCart from '@/components/Cart/EmptyCart';
import { useCart } from '@/hooks/useCart';
import theme from '@/theme';

const Cart = () => {
  const { cartData, cartIsFetching, cartIsUpdating } = useCart();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(cartIsFetching || cartIsUpdating);
  }, [cartIsFetching, cartIsUpdating]);

  return (
    <Grid
      container
      display="grid"
      gridTemplateColumns="3fr 1fr"
      gap={4}
      height="100%"
      sx={{
        [theme.breakpoints.down('md')]: {
          gridTemplateColumns: '1fr',
        },
      }}
    >
      {cartData && (
        <Grid item>
          {cartData?.lineItems.length ? (
            <CartList isLoading={isLoading} cartItems={cartData.lineItems} />
          ) : (
            <EmptyCart />
          )}
        </Grid>
      )}
      <Grid item>
        <CartSummary isLoading={isLoading} />
      </Grid>
    </Grid>
  );
};

export default Cart;
