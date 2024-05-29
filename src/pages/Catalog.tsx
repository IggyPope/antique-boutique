import { Grid } from '@mui/material';

import Filters from '@/components/Filters/Filters';
import ProductsBlock from '@/components/ProductsBlock/ProductsBlock';

const Catalog = () => {
  return (
    <Grid container sx={{ margin: '46px 0', gap: '24px' }}>
      <Grid item xs={12} sm={12} md={3.1}>
        <Filters />
      </Grid>
      <Grid item xs={12} sm={12} md={8.5}>
        <ProductsBlock />
      </Grid>
    </Grid>
  );
};

export default Catalog;
