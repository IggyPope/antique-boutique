import { Pagination, Stack, Typography } from '@mui/material';

import { useGetFilteredProductsQuery } from '@/api/services/commercetoolsApi';
import ProductFilters from '@/components/ProductsBlock/ProductFilters';
import ProductList from '@/components/ProductsBlock/ProductList';
import { APP_SETTINGS } from '@/constants/app';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setPage } from '@/store/slices/filtersSlice';

const ProductsBlock = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const { data, isFetching } = useGetFilteredProductsQuery(filters);
  return (
    <Stack direction="column" gap={2}>
      <ProductFilters />
      {isFetching ? (
        <Typography sx={{ textAlign: 'center' }}>Loading...</Typography>
      ) : data?.results.length ? (
        <>
          <ProductList />
          <Pagination
            page={filters.page}
            count={
              data && !isFetching
                ? Math.ceil((data.total || 1) / APP_SETTINGS.PRODUCTS_PER_PAGE)
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
