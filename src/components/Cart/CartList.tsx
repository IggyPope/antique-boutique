import { useState } from 'react';

import { Button, Stack } from '@mui/material';

import { LineItem } from '@commercetools/platform-sdk';

import CartItem from '@/components/Cart/CartItem';
import { useCart } from '@/hooks/useCart';

const CartList = ({ cartItems }: { cartItems: LineItem[] }) => {
  const [test, setTest] = useState('');

  const { updateItemQuantity } = useCart();

  const clearCart = () => {
    setTest(test);
  };

  const changeQuantity = async (productId: string, quantity: number) => {
    await updateItemQuantity({ productId, quantity });
  };

  return (
    <Stack gap={2}>
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} changeQuantity={changeQuantity} />
      ))}
      <Button
        onClick={() => clearCart()}
        color="error"
        variant="outlined"
        sx={{ marginLeft: 'auto' }}
      >
        Clear Shopping Cart
      </Button>
    </Stack>
  );
};

export default CartList;
