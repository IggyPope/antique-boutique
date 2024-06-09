import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface Attribute {
  name: string;
  value: boolean;
}

type ProductAvailabilityProps = {
  attributes: Attribute[] | undefined;
};

export const ProductAvailability = ({ attributes }: ProductAvailabilityProps) => {
  const inStockAttribute = attributes?.find(
    (v) =>
      (v.name === 'In-Stock' && Array.isArray(v.value) && v.value.includes(true)) ||
      (v.name === 'Availability' && Array.isArray(v.value) && v.value.includes(true)),
  );
  const inStockColor: boolean = inStockAttribute?.value ?? false;

  return (
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
        <FiberManualRecordIcon color={inStockColor ? 'secondary' : 'error'} fontSize="small" />
        {inStockColor ? 'In Stock' : 'Sold'}
      </Typography>
    </Box>
  );
};

export const isiInStock = (attributes: Attribute[] | undefined): boolean => {
  return (
    attributes?.some(
      (attr) =>
        (attr.name === 'In-Stock' && Array.isArray(attr.value) && attr.value.includes(true)) ||
        (attr.name === 'Availability' && Array.isArray(attr.value) && attr.value.includes(true)),
    ) ?? false
  );
};
