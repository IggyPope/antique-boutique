import { Pagination, Stack } from '@mui/material';

import ProductFilters from './ProductFilters';
import ProductList from './ProductList';

const ProductsBlock = () => {
  return (
    <Stack direction="column" gap={2}>
      <ProductFilters />
      <ProductList />
      <Pagination shape="rounded" count={10} sx={{ display: 'flex', justifyContent: 'center' }} />
    </Stack>
  );
};

export default ProductsBlock;
