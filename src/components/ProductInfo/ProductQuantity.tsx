import { useState } from 'react';

import { Typography, Button, Box } from '@mui/material';

import { Attribute, isInStock } from '@/components/ProductInfo/ProductAvailability';
import { ProductQuantityInput } from '@/components/ProductInfo/ProductQuantityInput';

interface ProductQuantityProps {
  attributes: Attribute[] | undefined;
  isInCart: boolean;
}

export const ProductQuantity = ({ attributes, isInCart }: ProductQuantityProps) => {
  const [quantity, setQuantity] = useState(() => (isInStock(attributes) ? 1 : 0));

  const handleIncrement = () => {
    setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 99));
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleCartAction = (isInCart: boolean) => {
    if (isInCart) {
      // TODO add logic to remove the product from the cart
    } else {
      // TODO add logic to add the product to the cart
    }
  };

  return (
    <>
      <Box display="flex" gap={2} sx={{ height: '40px' }}>
        <Typography gutterBottom variant="h6" component="span" textAlign="center">
          Quantity
        </Typography>
        <ProductQuantityInput
          value={quantity}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          isInCart={isInCart}
          isInStock={isInStock(attributes)}
        />
      </Box>
      <Button
        type="button"
        variant={isInCart ? 'outlined' : 'contained'}
        color={isInCart ? 'error' : 'secondary'}
        disabled={!isInStock(attributes)}
        sx={{
          textTransform: 'none',
          fontWeight: '600',
          borderRadius: '5px',
          textDecoration: 'none',
          height: '40px',
        }}
        onClick={() => handleCartAction(isInCart)}
        data-testid="addToCart_button"
      >
        {isInCart ? 'Remove from Cart' : 'Add to Cart'}
      </Button>
    </>
  );
};
