import { Box, Typography, Stack } from '@mui/material';

import formatPrice from '@/utils/formatPrice';

type PriceObject = {
  value: {
    centAmount: number;
    currencyCode: string;
    fractionDigits: number;
  };
  discounted?: {
    value: {
      centAmount: number;
      currencyCode: string;
      fractionDigits: number;
    };
  };
};

type ProductPriceProps = {
  prices: PriceObject[] | undefined;
};

export const ProductPrice = ({ prices }: ProductPriceProps) => {
  const firstPrice = prices?.[0] ?? undefined;
  return (
    <Box>
      <Typography gutterBottom variant="h6" component="div">
        Price
      </Typography>
      <Stack direction="row" gap={1} alignItems="center">
        {firstPrice?.discounted ? (
          <>
            <Typography fontSize="2rem" fontWeight="600">
              {`$${formatPrice(firstPrice.discounted.value.centAmount)}`}
            </Typography>
            <Typography
              fontSize="1.5rem"
              fontWeight="600"
              color="primary.light"
              sx={{ textDecoration: 'line-through' }}
            >
              {`$${formatPrice(firstPrice.value.centAmount)}`}
            </Typography>
          </>
        ) : (
          <Typography fontSize="2rem" fontWeight="600">
            {`$${formatPrice(firstPrice?.value.centAmount || 0)}`}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};
