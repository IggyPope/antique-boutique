import { useParams } from 'react-router-dom';

import { Typography, Box, Stack } from '@mui/material';

import { useGetProductByIdQuery } from '@/api/services/commercetoolsApi';
import { AddToCartButton } from '@/components/ProductInfo/AddToCartButton';
import { ProductAvailability } from '@/components/ProductInfo/ProductAvailability';
import { ProductCard } from '@/components/ProductInfo/ProductCard';
import { ProductPrice } from '@/components/ProductInfo/ProductPrice';
import { ProductTitle } from '@/components/ProductInfo/ProductTitle';
import { isInStock } from '@/components/ProductInfo/utils';
import { useCart } from '@/hooks/useCart';
import { FakeRating } from '@/utils/fakeRating';

export const ProductPage = () => {
  const { id } = useParams();

  const { data: product, isFetching } = useGetProductByIdQuery(id as string);
  const { isProductInCart } = useCart();

  const images = product?.masterVariant?.images?.map((image) => image.url);
  const attributes = product?.masterVariant?.attributes;
  const prices = product?.masterVariant?.prices;
  const title = product?.name.en;

  if (isFetching) {
    return <Typography sx={{ textAlign: 'center' }}>Loading...</Typography>;
  }

  return (
    <Box
      sx={{
        width: '98%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row',
            md: 'row',
          },
          alignItems: 'start',
          justifyContent: 'center',
        }}
        gap={2}
      >
        <ProductCard product={product} images={images} />
        <Box
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            width: {
              xs: '95%',
              sm: '35%',
              md: '35%',
            },
          }}
        >
          <ProductTitle title={title} />
          <FakeRating id={id} />
          <Stack flexDirection="row" justifyContent="space-between">
            <ProductPrice prices={prices} />
            <ProductAvailability attributes={attributes} />
          </Stack>
          <AddToCartButton
            id={id ?? ''}
            isInStock={isInStock(attributes)}
            isInCart={isProductInCart(id)}
          />
        </Box>
      </Box>
    </Box>
  );
};
