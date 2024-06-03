import { Pagination, Stack, Typography } from '@mui/material';

import ProductFilters from '@/components/ProductsBlock/ProductFilters';
import ProductList from '@/components/ProductsBlock/ProductList';
import { APP_SETTINGS } from '@/constants/app';
import useProducts from '@/hooks/useProducts';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPage } from '@/store/slices/filtersSlice';

const ProductsBlock = () => {
  const dispatch = useAppDispatch();

  const filters = useAppSelector((state) => state.filters);
  const { products, isFetching } = useProducts();

  return (
    <Stack direction="column" gap={2}>
      <ProductFilters />
      {isFetching ? (
        <Typography sx={{ textAlign: 'center' }}>Loading...</Typography>
      ) : products?.results.length ? (
        <>
          <ProductList />
          <Pagination
            page={filters.page}
            count={
              products && !isFetching
                ? Math.ceil((products.total || 1) / APP_SETTINGS.PRODUCTS_PER_PAGE)
                : 1
            }
            onChange={(_, page) => dispatch(setPage(page))}
            shape="rounded"
            sx={{ display: 'flex', justifyContent: 'center' }}
          />
        </>
      ) : (
        <Typography sx={{ textAlign: 'center', mt: 5, color: 'text.secondary' }}>
          No products found. Please try adjusting your search criteria.
        </Typography>
      )}
    </Stack>
  );
};

export default ProductsBlock;
