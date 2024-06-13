import { useState } from 'react';

import { Button, Stack } from '@mui/material';

import CartItem from '@/components/Cart/CartItem';
import { TestType } from '@/components/Cart/types';

const CartList = ({ cartItems }: { cartItems: TestType[] }) => {
  const [test, setTest] = useState('');
  const clearCart = () => {
    setTest(test);
  };

  const deleteItem = (id: string) => {
    setTest(id);
  };

  const changeQuantity = (id: string, quantity: string) => {
    setTest(`${id}${quantity}`);
  };

  return (
    <Stack gap={2}>
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          deleteItem={deleteItem}
          changeQuantity={changeQuantity}
        />
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
