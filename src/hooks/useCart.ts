import { useCallback, useEffect, useState } from 'react';

import { useGetCartQuery, useUpdateCartMutation } from '@/api/services/commercetoolsApi';
import { CART_ACTIONS } from '@/constants/app';
import { useAuth } from '@/hooks/useAuth';

export const useCart = () => {
  const { isAuthenticated } = useAuth();

  const {
    data: cartData,
    error: cartError,
    isFetching: cartIsFetching,
  } = useGetCartQuery(isAuthenticated);

  const [updateCartMutation, { isLoading: cartIsUpdating }] = useUpdateCartMutation();

  const [subtotal, setSubTotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);

  useEffect(() => {
    if (!cartData) return;
    setSubTotal(
      cartData.lineItems.reduce(
        (subtotal, el) =>
          subtotal +
          (el.price.discounted?.value?.centAmount ?? el.price.value.centAmount) * el.quantity,
        0,
      ),
    );
    setTotal(cartData.totalPrice?.centAmount ?? 0);
    setDiscount(subtotal - total);
  }, [cartData, total, subtotal]);

  const isProductInCart = useCallback(
    (id: string | undefined) => {
      if (!cartData) return;
      return cartData.lineItems.some((item) => item.productId === id);
    },
    [cartData],
  );

  const addItemToCart = async ({
    productId,
    quantity,
  }: {
    productId: string;
    quantity: number;
  }) => {
    if (!cartData) return;
    return await updateCartMutation({
      version: cartData?.version || 1,
      actions: [
        {
          action: CART_ACTIONS.ADD_ITEM,
          productId,
          quantity,
        },
      ],
    });
  };

  const updateItemQuantity = async ({
    lineItemId,
    quantity,
  }: {
    lineItemId: string;
    quantity: number;
  }) => {
    return await updateCartMutation({
      version: cartData?.version || 1,
      actions: [
        {
          action: CART_ACTIONS.CHANGE_ITEM_QUANTITY,
          lineItemId,
          quantity,
        },
      ],
    });
  };

  const clearCart = async () => {
    if (!cartData) return;
    return await updateCartMutation({
      version: cartData?.version || 1,
      actions: cartData?.lineItems.map((item) => ({
        action: CART_ACTIONS.REMOVE_ITEM,
        lineItemId: item.id,
      })),
    });
  };

  const getLineItemIdByProductId = useCallback(
    (id: string) => {
      if (!cartData) return;
      return cartData.lineItems.find((item) => item.productId === id)?.id;
    },
    [cartData],
  );

  return {
    cartData,
    cartError,
    cartIsFetching,
    cartIsUpdating,
    subtotal,
    total,
    discount,
    addItemToCart,
    isProductInCart,
    updateItemQuantity,
    clearCart,
    getLineItemIdByProductId,
  };
};
