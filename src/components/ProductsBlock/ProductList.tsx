import { useState } from 'react';
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
  Button,
  CardActions,
} from '@mui/material';

import { isInStock } from '@/components/ProductInfo/ProductAvailability';
import { APP_SETTINGS } from '@/constants/app';
import useProducts from '@/hooks/useProducts';
import formatPrice from '@/utils/formatPrice';

const ProductList = () => {
  const [testId, setTestId] = useState('');
  const { products } = useProducts();

  const theme = useTheme();

  const productsInCart = ['27626717-9713-4a4c-9244-2f01121f2701'];

  const isInCart = (id: string) => {
    return productsInCart.includes(id);
  };

  const addToCart = (id: string) => {
    setTestId(testId);
    setTestId(id);
  };

  return (
    <Grid
      container
      justifyContent="center"
      gap={2}
      sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}
    >
      {products?.results.length &&
        products.results.map((product) => (
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
                <Button
                  type="button"
                  variant={isInCart(product.id) ? 'outlined' : 'contained'}
                  color={isInCart(product.id) ? 'error' : 'secondary'}
                  disabled={!isInStock(product.masterVariant.attributes)}
                  sx={{
                    textTransform: 'none',
                    fontWeight: '600',
                    borderRadius: '5px',
                    textDecoration: 'none',
                    height: '40px',
                    width: '100%',
                  }}
                  onClick={() => addToCart(product.id)}
                  data-testid="addToCart_button"
                >
                  {isInCart(product.id) ? 'Remove from Cart' : 'Add to Cart'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default ProductList;
