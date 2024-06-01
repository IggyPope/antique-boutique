import { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useParams } from 'react-router-dom';

import { Card, CardContent, Typography, Box } from '@mui/material';

import { useGetProductByIdQuery } from '@/api/services/commercetoolsApi';
import { VerticalCarousel } from '@/components/VerticalCarousel/VerticalCarousel';
import { APP_SETTINGS } from '@/constants/app';
import formatPrice from '@/utils/formatPrice';

export const ProductPage = () => {
  const { id } = useParams();
  const { data: product, isFetching } = useGetProductByIdQuery(id as string);
  const images = product?.masterVariant?.images?.map((image) => image.url);

  {
    isFetching && <Typography sx={{ textAlign: 'center' }}>Loading...</Typography>;
  }

  const [activeItemIndex, setActiveItemIndex] = useState(0);
  return (
    <Box sx={{ maxWidth: '80%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'start',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ marginRight: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <VerticalCarousel images={images} onSelect={(index) => setActiveItemIndex(index)} />
        </Box>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product?.name.en || 'Unknown Product'}
            </Typography>

            <Carousel
              autoPlay={false}
              animation={'fade'}
              navButtonsAlwaysVisible={true}
              index={activeItemIndex}
            >
              {images?.map((image, index) => (
                <div key={index}>
                  <img
                    src={`${image}`}
                    alt={`image ${index}`}
                    style={{
                      maxHeight: '400px',
                      maxWidth: '100%',
                      objectFit: 'cover',
                      margin: 'auto',
                    }}
                  />
                </div>
              ))}
            </Carousel>

            <Typography variant="body2" color="text.secondary">
              {product?.description?.[APP_SETTINGS.LOCALE] || 'Description not available'}
            </Typography>

            <Typography variant="body1">
              Price: ${formatPrice(product?.masterVariant?.prices?.[0]?.value?.centAmount || 0)}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
