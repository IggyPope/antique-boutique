import { useState, useEffect } from 'react';

import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  useTheme,
  Stack,
} from '@mui/material';

import { ProductProjection } from '@commercetools/platform-sdk';

import { AuthService } from '@/api/services/AuthService';
import formatPrice from '@/utils/formatPrice';

const ProductList = () => {
  const service = AuthService.getInstance();
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const theme = useTheme();
  useEffect(() => {
    service.apiRoot
      .productProjections()
      .get()
      .execute()
      .then((res) => {
        setProducts(res.body.results);
      })
      .catch((err) => {
        throw new Error(`${err}`);
      });
  }, []);
  return (
    <Grid
      container
      justifyContent="center"
      gap={2}
      sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}
    >
      {products.map((product) => (
        <Grid item key={product.id}>
          <Card
            sx={{
              '& > *': { height: '100%' },
              height: '100%',
            }}
          >
            <CardActionArea
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
                  <Typography
                    fontSize="0.9rem"
                    fontWeight="600"
                    color="primary.main"
                    sx={{ textDecoration: 'line-through' }}
                  >
                    {`$${formatPrice(product.masterVariant.prices![0].value.centAmount)}`}
                  </Typography>
                  <Typography fontSize="1rem" fontWeight="600">
                    {`$${formatPrice(product.masterVariant.prices![0].value.centAmount)}`}
                  </Typography>
                </Stack>
                <Typography fontSize="0.9rem">{`${product.description!['en-US'].slice(0, 100)}...`}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
