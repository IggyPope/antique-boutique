import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Grid } from '@mui/material';

import { useGetCategoriesQuery } from '@/api/services/commercetoolsApi';
import Filters from '@/components/Filters/Filters';
import ProductsBlock from '@/components/ProductsBlock/ProductsBlock';
import { APP_SETTINGS } from '@/constants/app';
import useCategories from '@/hooks/useCategories';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCategory, setSubcategory } from '@/store/slices/filtersSlice';

const Catalog = () => {
  const { category: categoryParam, subcategory: subcategoryParam } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { category: categoryFilter, subcategory: subcategoryFilter } = useAppSelector(
    (state) => state.filters,
  );

  const { data: categoriesData, isFetching } = useGetCategoriesQuery();
  const { getMainCategories, getSubcategories, getCategorySlugById } = useCategories();

  const [initialCategoryId, setInitialCategoryId] = useState<string | null>(
    categoryParam ? null : '',
  );
  const [initialSubcategoryId, setInitialSubcategoryId] = useState<string | null>(
    subcategoryParam ? null : '',
  );

  // Checks if category and subcategory in the URL are valid and throws an error if not (caught by the router errorElement)
  useEffect(() => {
    if (isFetching || (categoryParam === undefined && subcategoryParam === undefined)) return;

    const mainCategories = getMainCategories();
    const mainCategoryId = mainCategories?.find(
      (categoryEntry) => categoryEntry.slug[APP_SETTINGS.LOCALE] === categoryParam,
    )?.id;

    if (!mainCategoryId) throw new Error('Category not found');

    const subcategories = getSubcategories(mainCategoryId);

    const isCategoryValid = categoryParam === undefined || mainCategoryId;
    const isSubcategoryValid =
      isCategoryValid &&
      (subcategoryParam === undefined ||
        subcategories?.find(
          (subcategoryEntry) => subcategoryEntry.slug[APP_SETTINGS.LOCALE] === subcategoryParam,
        ));

    if (!isCategoryValid || !isSubcategoryValid) {
      throw new Error('Category not found');
    }

    if (mainCategoryId) {
      dispatch(setCategory(mainCategoryId));
      setInitialCategoryId(mainCategoryId);
    }

    if (isSubcategoryValid) {
      const subcategoryId = subcategories?.find(
        (subcategoryEntry) => subcategoryEntry.slug[APP_SETTINGS.LOCALE] === subcategoryParam,
      )?.id;

      if (subcategoryId) {
        dispatch(setSubcategory(subcategoryId));
        setInitialSubcategoryId(subcategoryId);
      }
    }
  }, [
    isFetching,
    categoryParam,
    subcategoryParam,
    categoriesData,
    dispatch,
    getMainCategories,
    getSubcategories,
  ]);

  useEffect(() => {
    const categorySlug = getCategorySlugById(categoryFilter || '');
    const subcategorySlug = getCategorySlugById(subcategoryFilter || '');

    const categoryPath = `/${categorySlug}`;
    const subcategoryPath = `/${subcategorySlug}`;

    if (!categorySlug && !subcategorySlug) return;

    navigate({
      pathname: `/catalog${categorySlug ? categoryPath : ''}${subcategorySlug ? subcategoryPath : ''}`,
    });
  }, [categoryFilter, subcategoryFilter, navigate, getCategorySlugById]);

  return (
    <Grid container sx={{ margin: '46px 0', gap: '24px' }}>
      <Grid item xs={12} sm={12} md={3.1}>
        {initialCategoryId !== null && (
          <Filters
            initialCategoryId={initialCategoryId || undefined}
            initialSubcategoryId={initialSubcategoryId || undefined}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={8.5}>
        <ProductsBlock />
      </Grid>
    </Grid>
  );
};

export default Catalog;
