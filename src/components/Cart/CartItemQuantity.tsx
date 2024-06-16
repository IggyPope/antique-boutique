import { useState } from 'react';

import { Typography, Box } from '@mui/material';

import { CartItemQuantityInput } from '@/components/Cart/CartItemQuantityInput';

interface CartItemQuantityProps {
  id: string;
  quantity: number;
  changeQuantity: (id: string, quantity: number) => void;
}

export const CartItemQuantity: React.FC<CartItemQuantityProps> = ({
  id,
  quantity,
  changeQuantity,
}: CartItemQuantityProps) => {
  const [itemQuantity, setQuantity] = useState(quantity);

  const handleIncrement = () => {
    changeQuantity(id, Math.min(itemQuantity + 1, 99));
    setQuantity(Math.min(itemQuantity + 1, 99));
    //TODO add logic to send API request
  };

  const handleDecrement = () => {
    changeQuantity(id, Math.max(itemQuantity - 1, 1));
    setQuantity(Math.max(itemQuantity - 1, 1));
    //TODO add logic to send API request
  };

  return (
    <Box display="flex" gap={2} sx={{ height: '40px' }}>
      <Typography gutterBottom variant="h6" component="span" textAlign="center">
        Quantity
      </Typography>
      <CartItemQuantityInput
        value={itemQuantity}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />
    </Box>
  );
};
