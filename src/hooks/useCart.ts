import { useCallback } from 'react';

import { useGetCartQuery, useUpdateCartMutation } from '@/api/services/commercetoolsApi';
import { useAuth } from '@/hooks/useAuth';

export const useCart = () => {
  const { isAuthenticated } = useAuth();

  const { data, error, isFetching } = useGetCartQuery(isAuthenticated);

  const [updateCartMutation] = useUpdateCartMutation();

  const isProductInCart = useCallback(
    (id: string | undefined) => {
      if (!data) return;
      return data.lineItems.some((item) => item.productId === id);
    },
    [data],
  );

  const updateItemQuantity = async ({
    productId,
    quantity,
  }: {
    productId: string;
    quantity: number;
  }) => {
    return await updateCartMutation({
      version: data?.version || 1,
      actions: [
        {
          action: 'changeLineItemQuantity',
          lineItemId: productId,
          quantity,
        },
      ],
    });
  };

  const clearCart = async () => {
    if (!data) return;
    return await updateCartMutation({
      version: data?.version || 1,
      actions: data?.lineItems.map((item) => ({
        action: 'removeLineItem',
        lineItemId: item.id,
      })),
    });
  };

  return { data, error, isFetching, isProductInCart, updateItemQuantity, clearCart };
};
