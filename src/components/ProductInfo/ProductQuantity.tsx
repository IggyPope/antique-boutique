import { useState } from 'react';

import { Typography, TextField, Button, Box } from '@mui/material';

import { Attribute, isiInStock } from '@/components/ProductInfo/ProductAvailability';

interface ProductQuantityProps {
  attributes: Attribute[] | undefined;
}

export const ProductQuantity = ({ attributes }: ProductQuantityProps) => {
  const [quantity, setQuantity] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value)) {
      setQuantity(value);
    }
  };
  const addToCart = () => {
    return;
    //TODO Add the logic for adding the product to cart
  };
  return (
    <>
      <Box display="flex" gap={2}>
        <Typography gutterBottom variant="h6" component="div">
          Quantity
        </Typography>
        <TextField
          type="number"
          id="quantity"
          value={quantity}
          onChange={handleChange}
          InputProps={{
            inputProps: {
              min: '1',
              max: '99',
            },
          }}
          sx={{ width: '80px', textAlign: 'center' }}
        />
      </Box>
      <Button
        type="button"
        variant="contained"
        color="secondary"
        disabled={!isiInStock(attributes)}
        sx={{
          textTransform: 'none',
          fontWeight: '600',
          borderRadius: '5px',
          textDecoration: 'none',
        }}
        onClick={addToCart}
        data-testid="addToCart_button"
      >
        Add to Cart
      </Button>
    </>
  );
};
