/* eslint-disable react/jsx-no-undef */
import { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useParams } from 'react-router-dom';

import {
  Typography,
  Box,
  Stack,
  Card,
  CardContent,
  Button,
  TextField,
  useTheme,
} from '@mui/material';

import { useGetProductByIdQuery } from '@/api/services/commercetoolsApi';
import { ModalCarousel } from '@/components/ModalCarousel/ModalCarousel';
import { ProductAvailability, isiInStock } from '@/components/ProductInfo/ProductAvailability';
import { ProductPrice } from '@/components/ProductInfo/ProductPrice';
import { VerticalCarousel } from '@/components/VerticalCarousel/VerticalCarousel';
import { APP_SETTINGS } from '@/constants/app';
import { FakeRating } from '@/utils/fakeRating';

export const ProductPage = () => {
  const { id } = useParams();
  const { data: product, isFetching } = useGetProductByIdQuery(id as string);
  const images = product?.masterVariant?.images?.map((image) => image.url);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const theme = useTheme();
  const addToCart = () => {
    return;
    //TODO Add the logic for adding the product to cart
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value)) {
      setQuantity(value);
    }
  };

  const handleImageClick = () => {
    setModalOpen(true);
  };
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
          <Typography gutterBottom variant="h4" component="div">
            {product?.name.en || 'Unknown Product'}
          </Typography>
          <FakeRating id={id} />
          <Stack flexDirection="row" justifyContent="space-between">
            <ProductPrice product={product} />
            <ProductAvailability product={product} />
          </Stack>
          <Box display="flex" gap={2}>
            <Typography gutterBottom variant="h6" component="div">
              Quantity
            </Typography>
            <TextField
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleChange}
              InputProps={{
                inputProps: {
                  min: '1',
                  max: '99',
                },
              }}
              sx={{ width: '80px', textAlign: 'center' }}
            />
          </Box>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            disabled={!isiInStock(product)}
            sx={{
              textTransform: 'none',
              fontWeight: '600',
              borderRadius: '5px',
              textDecoration: 'none',
            }}
            onClick={addToCart}
            data-testid="addToCart_button"
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
