import Carousel from 'react-material-ui-carousel';

import { useMediaQuery } from '@mui/material';
import { Box, Modal, Fade, Button, useTheme } from '@mui/material';

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
  const theme = useTheme();
  const xs = useMediaQuery('(min-width:500px) and (max-width:600px)');
  const xxs = useMediaQuery('(min-width:400px) and (max-width:499px)');
  const xxxs = useMediaQuery('(max-width:399px)');

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
          display="flex"
          flexDirection="column"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: {
              xs: '90%',
              sm: '90%',
              md: '60%',
            },
            height: {
              xs: 'auto',
              sm: 'auto',
              md: 'auto',
            },
            bgcolor: '#e8e3e3',
            border: 'none',
            boxShadow: 24,
            p: 1,
            overflow: 'hidden',
          }}
        >
          <Button sx={{ alignSelf: 'flex-end' }} onClick={handleClose}>
            Close
          </Button>
          <Carousel
            autoPlay={false}
            animation={'fade'}
            navButtonsAlwaysVisible={true}
            index={activeItemIndex}
            height={xxxs ? 400 : xxs ? 500 : xs ? 600 : 700}
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
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                }}
              >
                <img
                  key={index}
                  src={`${image}`}
                  alt={`image ${index}`}
                  style={{ width: '100%', height: '100%', cursor: 'pointer', objectFit: 'contain' }}
                />
              </div>
            ))}
          </Carousel>
        </Box>
      </Fade>
    </Modal>
  );
};
