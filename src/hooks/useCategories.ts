import type { Category } from '@commercetools/platform-sdk';

import { useGetCategoriesQuery } from '@/api/services/commercetoolsApi';

const useCategories = () => {
  const allCategories = useGetCategoriesQuery().data?.results;

  const getMainCategories = (): Category[] | undefined => {
    if (!allCategories) {
      return;
    }

    return allCategories.filter((category) => !category.parent);
  };

  const getSubcategories = (parentId: string): Category[] | undefined => {
    if (!allCategories) {
      return;
    }
    return allCategories.filter((category) => category.parent?.id === parentId);
  };

  return {
    getMainCategories,
    getSubcategories,
  };
};

export default useCategories;
