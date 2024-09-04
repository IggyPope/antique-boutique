import { useCallback } from 'react';

import type { Category } from '@commercetools/platform-sdk';

import { useGetCategoriesQuery } from '@/api/services/commercetoolsApi';
import { APP_SETTINGS } from '@/constants/app';

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

  const getCategorySlugById = useCallback(
    (categoryId: string): string | undefined => {
      if (!allCategories) {
        return;
      }
      return allCategories.find((category) => category.id === categoryId)?.slug[
        APP_SETTINGS.LOCALE
      ];
    },
    [allCategories],
  );

  return {
    getMainCategories,
    getSubcategories,
    getCategorySlugById,
  };
};

export default useCategories;
