import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Typography, Button, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { Attribute, isInStock } from '@/components/ProductInfo/ProductAvailability';

interface ProductQuantityProps {
  attributes: Attribute[] | undefined;
  isInCart: boolean;
}
interface IncrementDecrementButtonsProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  isInStock: boolean;
}

export const ProductQuantity = ({ attributes, isInCart }: ProductQuantityProps) => {
  const [quantity, setQuantity] = useState(() => (isInStock(attributes) ? 1 : 0));

  const handleIncrement = () => {
    setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 99));
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const IncrementDecrementButtons: React.FC<IncrementDecrementButtonsProps> = ({
    value,
    onIncrement,
    onDecrement,
    isInStock,
  }: IncrementDecrementButtonsProps) => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '80px',
          height: '100%',
        }}
      >
        <IconButton onClick={onDecrement} disabled={isInCart || !isInStock}>
          <RemoveIcon />
        </IconButton>
        <input
          type="text"
          readOnly
          value={value}
          style={{ textAlign: 'center', width: '40px', height: '80%' }}
        />
        <IconButton onClick={onIncrement} disabled={isInCart || !isInStock}>
          <AddIcon />
        </IconButton>
      </div>
    );
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
        <IncrementDecrementButtons
          value={quantity}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
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
