import { useState } from 'react';

import { Button, Stack } from '@mui/material';

import { LineItem } from '@commercetools/platform-sdk';

import CartItem from '@/components/Cart/CartItem';
import { ConfirmationModal } from '@/components/Cart/ConfirmationModal';
import { useCart } from '@/hooks/useCart';

const CartList = ({ isLoading, cartItems }: { isLoading: boolean; cartItems: LineItem[] }) => {
  const { updateItemQuantity, clearCart } = useCart();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClearCart = async () => {
    await clearCart();
  };

  const changeQuantity = async (lineItemId: string, quantity: number) => {
    await updateItemQuantity({ lineItemId, quantity });
  };

  return (
    <>
      <Stack gap={2}>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            changeQuantity={changeQuantity}
            isLoading={isLoading}
          />
        ))}
        <Button
          onClick={() => setIsModalOpen(true)}
          disabled={isLoading}
          color="error"
          variant="outlined"
          sx={{ marginLeft: 'auto' }}
        >
          Clear Shopping Cart
        </Button>
      </Stack>

      <ConfirmationModal
        isOpen={isModalOpen}
        handleCancel={() => setIsModalOpen(false)}
        handleConfirm={() => {
          setIsModalOpen(false);
          void handleClearCart();
        }}
      />
    </>
  );
};

export default CartList;
