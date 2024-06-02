import { Box, Typography, Stack } from '@mui/material';

import { ProductProjection } from '@commercetools/platform-sdk';

import formatPrice from '@/utils/formatPrice';

type ProductPriceProps = {
  product: ProductProjection | undefined;
};

export const ProductPrice = ({ product }: ProductPriceProps) => {
  return (
    <Box>
      <Typography gutterBottom variant="h6" component="div">
        Price
      </Typography>
      <Stack direction="row" gap={1} alignItems="center">
        {product?.masterVariant.prices![0].discounted ? (
          <>
            <Typography fontSize="2rem" fontWeight="600">
              {`$${formatPrice(product.masterVariant.prices[0].discounted.value.centAmount)}`}
            </Typography>
            <Typography
              fontSize="1.5rem"
              fontWeight="600"
              color="primary.light"
              sx={{ textDecoration: 'line-through' }}
            >
              {`$${formatPrice(product.masterVariant.prices[0].value.centAmount)}`}
            </Typography>
          </>
        ) : (
          <Typography fontSize="2rem" fontWeight="600">
            {`$${formatPrice(product?.masterVariant.prices![0].value.centAmount || 1)}`}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};
