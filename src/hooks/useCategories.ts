import { useCallback } from 'react';

import type { Category } from '@commercetools/platform-sdk';

import { useGetCategoriesQuery } from '@/api/services/commercetoolsApi';

const useCategories = () => {
  const allCategories = useGetCategoriesQuery().data?.results;

  const getMainCategories = useCallback((): Category[] | undefined => {
    if (!allCategories) {
      return;
    }

    return allCategories.filter((category) => !category.parent);
  }, [allCategories]);

  const getSubcategories = useCallback(
    (parentId: string): Category[] | undefined => {
      if (!allCategories) {
        return;
      }
      return allCategories.filter((category) => category.parent?.id === parentId);
    },
    [allCategories],
  );

  return {
    getMainCategories,
    getSubcategories,
  };
};

export default useCategories;
