import { useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, IconButton } from '@mui/material';

export const VerticalCarousel = ({
  images,
  onSelect,
}: {
  images: string[] | undefined;
  onSelect: (index: number) => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images) return null;

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    onSelect(currentIndex + 1);
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    onSelect(currentIndex - 1);
  };

  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex === images.length - 3;

  const imagesToShow = images.length > 3 ? 3 : images.length;

  return (
    <Box
      sx={{
        display: {
          xs: 'none',
          sm: 'none',
          md: 'flex',
        },
        flexDirection: 'column',
        gap: 2,
        width: '120px',
        minHeight: '100px',
      }}
    >
      <IconButton onClick={handlePrevClick} disabled={isAtStart}>
        <ExpandMoreIcon sx={{ transform: 'scaleY(-1)' }} />
      </IconButton>

      {images.slice(currentIndex, currentIndex + imagesToShow).map((image, index) => (
        <Box
          key={image}
          sx={{
            width: '100%',
            height: '127px',
            border: '1px solid #ccc',
            padding: 1,
            overflow: 'hidden',
          }}
        >
          <img
            src={image}
            alt={`Image ${index}`}
            style={{ width: '100%', height: 'auto', cursor: 'pointer', objectFit: 'contain' }}
            onClick={() => {
              onSelect(currentIndex + index);
            }}
          />
        </Box>
      ))}

      <IconButton onClick={handleNextClick} disabled={isAtEnd}>
        <ExpandMoreIcon />
      </IconButton>
    </Box>
  );
};
