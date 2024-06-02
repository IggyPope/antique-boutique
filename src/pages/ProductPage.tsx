import { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useParams } from 'react-router-dom';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Typography, Box, Stack, Card, CardContent } from '@mui/material';

import { useGetProductByIdQuery } from '@/api/services/commercetoolsApi';
import { ModalCarousel } from '@/components/ModalCarousel/ModalCarousel';
import { VerticalCarousel } from '@/components/VerticalCarousel/VerticalCarousel';
import { APP_SETTINGS } from '@/constants/app';
import { FakeRating } from '@/utils/fakeRating';
import formatPrice from '@/utils/formatPrice';

export const ProductPage = () => {
  const { id } = useParams();
  const { data: product, isFetching } = useGetProductByIdQuery(id as string);
  const images = product?.masterVariant?.images?.map((image) => image.url);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const handleImageClick = () => {
    setModalOpen(true);
  };
  if (isFetching) {
    return <Typography sx={{ textAlign: 'center' }}>Loading...</Typography>;
  }

  return (
    <Box sx={{ width: '90%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'start',
          justifyContent: 'center',
        }}
        gap={2}
      >
        <Box>
          <VerticalCarousel images={images} onSelect={(index) => setActiveItemIndex(index)} />
        </Box>
        <Box sx={{ width: '55%' }}>
          <Card>
            <CardContent>
              <Carousel
                autoPlay={false}
                animation={'fade'}
                navButtonsAlwaysVisible={true}
                index={activeItemIndex}
                height={500}
                className="carousel"
              >
                {images?.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      handleImageClick();
                      setActiveImageIndex(index);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      key={index}
                      src={`${image}`}
                      alt={`image ${index}`}
                      height="70%"
                      width="70%"
                      style={{
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                ))}
              </Carousel>
              <ModalCarousel
                open={modalOpen}
                handleClose={() => setModalOpen(false)}
                images={images}
                activeItemIndex={activeImageIndex}
              />
              <Typography variant="body2" color="text.secondary">
                {product?.description?.[APP_SETTINGS.LOCALE] || 'Description not available'}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ width: '40%' }}>
          <Typography gutterBottom variant="h4" component="div">
            {product?.name.en || 'Unknown Product'}
          </Typography>
          <FakeRating id={id} />
          <Stack flexDirection="row" justifyContent="space-between">
            <Box>
              <Typography gutterBottom variant="h6" component="div">
                Price
              </Typography>
              <Stack direction="row" gap={1} alignItems="center">
                {product?.masterVariant.prices![0].discounted ? (
                  <>
                    <Typography fontSize="2rem" fontWeight="600">
                      {`$${formatPrice(product?.masterVariant.prices[0].discounted.value.centAmount)}`}
                    </Typography>
                    <Typography
                      fontSize="1.5rem"
                      fontWeight="600"
                      color="primary.light"
                      sx={{ textDecoration: 'line-through' }}
                    >
                      {`$${formatPrice(product?.masterVariant.prices[0].value.centAmount)}`}
                    </Typography>
                  </>
                ) : (
                  <Typography fontSize="2rem" fontWeight="600">
                    {`$${formatPrice(product?.masterVariant.prices![0].value.centAmount || 1)}`}
                  </Typography>
                )}
              </Stack>
            </Box>
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
                <FiberManualRecordIcon
                  color={
                    product?.masterVariant?.attributes?.find((v) => v.name === 'In-Stock')
                      ? 'secondary'
                      : 'error'
                  }
                  fontSize="small"
                />
                {product?.masterVariant?.attributes?.find((v) => v.name === 'In-Stock')
                  ? 'In Stock'
                  : 'Sold'}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
