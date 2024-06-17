import { Button } from '@mui/material';

import { useCart } from '@/hooks/useCart';

interface AddToCartButtonProps {
  id: string;
  isInStock: boolean;
  isInCart: boolean | undefined;
}

export const AddToCartButton = ({ id, isInStock, isInCart }: AddToCartButtonProps) => {
  const { addItemToCart, updateItemQuantity, getLineItemIdByProductId } = useCart();

  const handleCartAction = async () => {
    if (isInCart) {
      const lineItemId = getLineItemIdByProductId(id);
      if (!lineItemId) return;
      await updateItemQuantity({ lineItemId, quantity: 0 });
    } else {
      await addItemToCart({ productId: id, quantity: 1 });
    }
  };

  return (
    <Button
      type="button"
      variant={isInCart ? 'outlined' : 'contained'}
      color={isInCart ? 'error' : 'secondary'}
      disabled={!isInStock}
      sx={{
        textTransform: 'none',
        fontWeight: '600',
        borderRadius: '5px',
        textDecoration: 'none',
        height: '40px',
        width: '100%',
      }}
      onClick={handleCartAction}
      data-testid="addToCart_button"
    >
      {isInCart ? 'Remove from Cart' : isInStock ? 'Add to Cart' : 'Sold out'}
    </Button>
  );
};
