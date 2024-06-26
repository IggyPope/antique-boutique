import { Typography, Box } from '@mui/material';

import { CartItemQuantityInput } from '@/components/Cart/CartItemQuantityInput';
import { useCart } from '@/hooks/useCart';

interface CartItemQuantityProps {
  isLoading: boolean;
  id: string;
  changeQuantity: (lineItemId: string, quantity: number) => void;
}

export const CartItemQuantity: React.FC<CartItemQuantityProps> = ({
  isLoading,
  id,
  changeQuantity,
}: CartItemQuantityProps) => {
  const { cartData } = useCart();

  const itemQuantity = cartData?.lineItems.find((item) => item.id === id)?.quantity;

  const handleIncrement = () => {
    if (itemQuantity === undefined) return;
    changeQuantity(id, itemQuantity + 1);
  };

  const handleDecrement = () => {
    if (itemQuantity === undefined) return;
    changeQuantity(id, Math.max(itemQuantity - 1, 0));
  };

  return (
    <Box display="flex" gap={2} height={'40px'}>
      <Typography gutterBottom variant="h6" component="span" textAlign="center">
        Quantity
      </Typography>
      <CartItemQuantityInput
        isLoading={isLoading}
        value={itemQuantity}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />
    </Box>
  );
};
