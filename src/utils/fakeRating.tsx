import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Box } from '@mui/material';

const extractValuesFromId = (
  id: string | undefined,
): { numberOfFieldStars: number; numberOfReviews: number } => {
  if (!id) {
    return {
      numberOfFieldStars: 3,
      numberOfReviews: 25,
    };
  }
  let numberOfFieldStars;
  let numberOfReviews;
  const fieldStarsMatch = id.match(/^\d+/);
  if (
    fieldStarsMatch &&
    parseInt(fieldStarsMatch[0], 10) > 0 &&
    parseInt(fieldStarsMatch[0], 10) <= 5
  ) {
    numberOfFieldStars = parseInt(fieldStarsMatch[0], 10);
  } else {
    numberOfFieldStars = 3;
  }
  const reviewNumberMatch = id.match(/(\d{2})(?=\d)/);
  if (
    reviewNumberMatch &&
    parseInt(reviewNumberMatch[1], 10) >= 10 &&
    parseInt(reviewNumberMatch[1], 10) <= 99
  ) {
    numberOfReviews = parseInt(reviewNumberMatch[1], 10);
  } else {
    numberOfReviews = 25;
  }

  return { numberOfFieldStars, numberOfReviews };
};

type FakeRating = {
  id: string | undefined;
};

export const FakeRating = ({ id }: FakeRating) => {
  const { numberOfFieldStars, numberOfReviews } = extractValuesFromId(id);
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <StarBorderIcon key={index} color={index < numberOfFieldStars ? 'secondary' : 'action'} />
      ))}
      <span>{numberOfReviews} Reviews</span>
    </Box>
  );
};
