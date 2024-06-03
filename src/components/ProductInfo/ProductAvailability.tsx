import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { ProductProjection } from '@commercetools/platform-sdk';

type ProductAvailabilityProps = {
  product: ProductProjection | undefined;
};

export const ProductAvailability = ({ product }: ProductAvailabilityProps) => {
  const inStockAttribute = product?.masterVariant?.attributes?.find(
    (v) => v.name === 'In-Stock',
  ) as { name: string; value: boolean } | undefined;
  const inStockColor: boolean = inStockAttribute?.value ?? false;

  return (
    <Box>
      <Typography
        gutterBottom
        variant="h6"
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FiberManualRecordIcon color={inStockColor ? 'secondary' : 'error'} fontSize="small" />
        {inStockColor ? 'In Stock' : 'Sold'}
      </Typography>
    </Box>
  );
};

export function isiInStock(product: ProductProjection | undefined) {
  return product?.masterVariant?.attributes?.find((v) => v.name === 'In-Stock') as
    | { name: string; value: boolean }
    | undefined;
}
