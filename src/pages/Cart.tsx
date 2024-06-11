import { Grid } from '@mui/material';

import CartList from '@/components/Cart/CartList';
import CartSummary from '@/components/Cart/CartSummary';
import EmptyCart from '@/components/Cart/EmptyCart';
import theme from '@/theme';

const Cart = () => {
  const cartItems = [
    {
      id: '1',
      name: 'Braun BC02',
      price: 3900,
      quantity: 1,
      imageUrl:
        'https://onlyonceshop.com/media/pages/product/braun-bc02-alarm-clock/4c2b241af0-1651872034/bc02xb-left-side-1017x678-q100.jpg',
    },
    {
      id: '2',
      name: '1972 Olympia Learning Program',
      discountedPrice: 6500,
      price: 5525,
      quantity: 2,
      imageUrl:
        'https://onlyonceshop.com/media/pages/product/1972-olympia-learning-program/cb745b962f-1714640380/1972-munich-olympic-games-branding-brand-identity-otl-aicher-learning-book-only-once-2.png',
    },
  ];

  return (
    <Grid
      container
      display="grid"
      gridTemplateColumns="3fr 1fr"
      gap={2}
      height="100%"
      sx={{
        [theme.breakpoints.down('md')]: {
          gridTemplateColumns: '1fr',
        },
      }}
    >
      <Grid item>{cartItems.length ? <CartList cartItems={cartItems} /> : <EmptyCart />}</Grid>
      <Grid item>
        <CartSummary />
      </Grid>
    </Grid>
  );
};

export default Cart;
