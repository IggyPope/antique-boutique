import { Button, CircularProgress } from '@mui/material';

import { useCart } from '@/hooks/useCart';

interface AddToCartButtonProps {
  id: string;
  isInStock: boolean;
  isInCart: boolean | undefined;
}

export const AddToCartButton = ({ id, isInStock, isInCart }: AddToCartButtonProps) => {
  const {
    cartIsFetching,
    cartIsUpdating,
    addItemToCart,
    updateItemQuantity,
    getLineItemIdByProductId,
  } = useCart();

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
      disabled={!isInStock || cartIsUpdating || cartIsFetching}
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
      {!isInStock ? (
        'Sold out'
      ) : cartIsUpdating || cartIsFetching ? (
        <CircularProgress size={20} />
      ) : isInCart ? (
        'Remove from Cart'
      ) : (
        'Add to Cart'
      )}
    </Button>
  );
};
