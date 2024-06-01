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

  if (!images) return;

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    onSelect(currentIndex);
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    onSelect(currentIndex);
  };

  const imagesToShow = images.length > 3 ? 3 : images.length;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <IconButton onClick={handlePrevClick}>
        <ExpandMoreIcon sx={{ transform: 'scaleY(-1)' }} />
      </IconButton>
      {images.slice(currentIndex, currentIndex + imagesToShow).map((image, index) => (
        <Box
          key={index}
          sx={{ width: '100%', height: 'auto', border: '1px solid #ccc', padding: 1 }}
        >
          <img
            src={image}
            alt={`Image ${index}`}
            style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
            onClick={() => onSelect(index)}
          />
        </Box>
      ))}

      <IconButton onClick={handleNextClick}>
        <ExpandMoreIcon />
      </IconButton>
    </Box>
  );
};
