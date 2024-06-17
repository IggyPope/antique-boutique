import { Button, Stack } from '@mui/material';

import { LineItem } from '@commercetools/platform-sdk';

import CartItem from '@/components/Cart/CartItem';
import { useCart } from '@/hooks/useCart';

const CartList = ({ cartItems }: { cartItems: LineItem[] }) => {
  const { updateItemQuantity, clearCart } = useCart();

  const handleClearCart = async () => {
    await clearCart();
  };

  const changeQuantity = async (lineItemId: string, quantity: number) => {
    await updateItemQuantity({ lineItemId, quantity });
  };

  return (
    <Stack gap={2}>
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} changeQuantity={changeQuantity} />
      ))}
      <Button
        onClick={handleClearCart}
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
