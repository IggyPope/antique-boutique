import Carousel from 'react-material-ui-carousel';

import { Box, Modal, Fade, Button } from '@mui/material';

interface ModalCarouselProps {
  open: boolean;
  handleClose: () => void;
  images: string[] | undefined;
  activeItemIndex: number;
}

export const ModalCarousel: React.FC<ModalCarouselProps> = ({
  open,
  handleClose,
  images,
  activeItemIndex,
}: ModalCarouselProps) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            bgcolor: 'white',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
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
          <Button onClick={handleClose}>X</Button>
        </Box>
      </Fade>
    </Modal>
  );
};
