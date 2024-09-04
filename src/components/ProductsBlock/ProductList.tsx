import { Link } from 'react-router-dom';

import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  useTheme,
  Stack,
  CardActions,
} from '@mui/material';

import { AddToCartButton } from '@/components/ProductInfo/AddToCartButton';
import { isInStock } from '@/components/ProductInfo/utils';
import { APP_SETTINGS } from '@/constants/app';
import { useCart } from '@/hooks/useCart';
import useProducts from '@/hooks/useProducts';
import formatPrice from '@/utils/formatPrice';

const ProductList = () => {
  const { productsData } = useProducts();

  const theme = useTheme();

  const { isProductInCart } = useCart();

  return (
    <Grid
      container
      justifyContent="center"
      gap={2}
      sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}
    >
      {productsData?.results.length &&
        productsData.results.map((product) => (
          <Grid item key={product.id}>
            <Card
              sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
              }}
            >
              <CardActionArea
                component={Link}
                to={`/product/${product.id}`}
                sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}
              >
                <CardMedia
                  component="img"
                  height="250px"
                  image={product.masterVariant.images![0].url}
                  alt={product.name.en}
                  sx={{
                    objectFit: 'contain',
                    [theme.breakpoints.down('sm')]: {
                      height: '100px',
                    },
                  }}
                />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <Typography variant="h6" fontSize="1rem" fontWeight="600" lineHeight="1">
                    {product.name.en}
                  </Typography>
                  <Stack direction="row" gap={1} alignItems="center">
                    {product.masterVariant.prices![0].discounted ? (
                      <>
                        <Typography fontSize="1rem" fontWeight="600">
                          {formatPrice(
                            product.masterVariant.prices![0].discounted.value.centAmount,
                          )}
                        </Typography>
                        <Typography
                          fontSize="0.9rem"
                          fontWeight="600"
                          color="primary.light"
                          sx={{ textDecoration: 'line-through' }}
                        >
                          {formatPrice(product.masterVariant.prices![0].value.centAmount)}
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography fontSize="1rem" fontWeight="600">
                          {formatPrice(product.masterVariant.prices![0].value.centAmount)}
                        </Typography>
                      </>
                    )}
                  </Stack>
                  <Typography fontSize="0.9rem">{`${product.description![APP_SETTINGS.LOCALE].slice(0, 100)}...`}</Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <AddToCartButton
                  id={product.id}
                  isInCart={isProductInCart(product.id)}
                  isInStock={isInStock(product.masterVariant.attributes)}
                />
              </CardActions>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default ProductList;
