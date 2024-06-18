import { useEffect, useState } from 'react';

import { DiscountCode } from '@commercetools/platform-sdk';

import {
  useGetCartQuery,
  useGetDiscountCodesQuery,
  useUpdateCartMutation,
} from '@/api/services/commercetoolsApi';
import { CART_ACTIONS } from '@/constants/app';
import { useAuth } from '@/hooks/useAuth';

export const useDiscountCodes = () => {
  const { isAuthenticated } = useAuth();
  const { data: cartData } = useGetCartQuery(isAuthenticated);
  const { data: codesData } = useGetDiscountCodesQuery();

  const [updateCartMutation] = useUpdateCartMutation({
    fixedCacheKey: 'cartMutation',
  });

  const [appliedCodes, setAppliedCodes] = useState<DiscountCode[]>([]);

  useEffect(() => {
    if (!codesData || !cartData) return;
    setAppliedCodes(
      codesData.results.filter((code) =>
        cartData.discountCodes.some((discountCode) => discountCode.discountCode.id === code.id),
      ),
    );
  }, [codesData, cartData]);

  const addDiscountCode = async (code: string) => {
    if (!cartData) return;
    return await updateCartMutation({
      version: cartData?.version || 1,
      actions: [
        {
          action: CART_ACTIONS.ADD_DISCOUNT_CODE,
          code,
        },
      ],
    });
  };

  const removeDiscountCode = async (id: string) => {
    if (!cartData) return;
    return await updateCartMutation({
      version: cartData?.version || 1,
      actions: [
        {
          action: CART_ACTIONS.REMOVE_DISCOUNT_CODE,
          discountCode: {
            typeId: 'discount-code',
            id,
          },
        },
      ],
    });
  };

  return {
    appliedCodes,
    addDiscountCode,
    removeDiscountCode,
  };
};
