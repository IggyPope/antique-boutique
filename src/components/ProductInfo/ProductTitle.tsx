import { Typography } from '@mui/material';

type ProductTitleProps = {
  title: string | undefined;
};

export const ProductTitle = ({ title }: ProductTitleProps) => {
  return (
    <Typography gutterBottom variant="h4" component="div">
      {title || 'Unknown Product'}
    </Typography>
  );
};
