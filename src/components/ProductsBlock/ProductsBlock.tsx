import { Pagination, Stack } from '@mui/material';

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
      <ProductList />
      <Pagination
        page={filters.page}
        count={
          data && !isFetching ? Math.ceil((data.total || 1) / APP_SETTINGS.PRODUCTS_PER_PAGE) : 1
        }
        onChange={(_, page) => dispatch(setPage(page))}
        shape="rounded"
        sx={{ display: 'flex', justifyContent: 'center' }}
      />
    </Stack>
  );
};

export default ProductsBlock;
