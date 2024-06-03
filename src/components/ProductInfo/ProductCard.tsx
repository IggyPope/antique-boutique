// ProductCard.js
import { useState } from 'react';
import Carousel from 'react-material-ui-carousel';

import { Typography, Card, CardContent, useTheme, Box } from '@mui/material';

import { ProductProjection } from '@commercetools/platform-sdk';

import { ModalCarousel } from '@/components/ModalCarousel/ModalCarousel';
import { VerticalCarousel } from '@/components/VerticalCarousel/VerticalCarousel';
import { APP_SETTINGS } from '@/constants/app';

interface ProductCardProps {
  images: string[] | undefined;
  product: ProductProjection | undefined;
}
const ProductCard: React.FC<ProductCardProps> = ({ images, product }: ProductCardProps) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const theme = useTheme();

  const handleImageClick = () => {
    setModalOpen(true);
  };

  return (
    <>
      <Box>
        <VerticalCarousel images={images} onSelect={(index) => setActiveItemIndex(index)} />
      </Box>
      <Box
        sx={{
          width: {
            xs: '95%',
            sm: '65%',
            md: '65%',
          },
        }}
      >
        <Card>
          <CardContent>
            <Carousel
              autoPlay={false}
              animation={'fade'}
              navButtonsAlwaysVisible={true}
              index={activeItemIndex}
              height={500}
              className="carousel"
              activeIndicatorIconButtonProps={{
                style: {
                  color: theme.palette.secondary.main,
                },
              }}
              navButtonsProps={{
                style: {
                  backgroundColor: theme.palette.primary.light,
                },
              }}
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
    </>
  );
};

export default ProductCard;
