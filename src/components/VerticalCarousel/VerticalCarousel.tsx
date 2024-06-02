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
  const [originalSelectedIndex, setOriginalSelectedIndex] = useState<number>(0);

  if (!images) return null;

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  const imagesToShow = images.length > 3 ? 3 : images.length;

  const originalFirstIndex = images
    .slice(0, currentIndex)
    .reduce((acc, _, idx) => acc + (idx >= imagesToShow ? 1 : 0), 0);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '120px' }}>
      <IconButton onClick={handlePrevClick}>
        <ExpandMoreIcon sx={{ transform: 'scaleY(-1)' }} />
      </IconButton>
      {images.slice(originalFirstIndex, originalFirstIndex + imagesToShow).map((image, index) => (
        <Box
          key={index}
          sx={{ width: '100%', height: 'auto', border: '1px solid #ccc', padding: 1 }}
        >
          <img
            src={image}
            alt={`Image ${index}`}
            style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
            onClick={() => {
              setOriginalSelectedIndex(originalFirstIndex + index);
              onSelect(originalSelectedIndex);
            }}
          />
        </Box>
      ))}

      <IconButton onClick={handleNextClick}>
        <ExpandMoreIcon />
      </IconButton>
    </Box>
  );
};
