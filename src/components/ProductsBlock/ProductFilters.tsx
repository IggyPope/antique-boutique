import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

const ProductFilters = () => {
  return (
    <Stack
      justifyContent="space-between"
      direction="row"
      alignItems="center"
      flexWrap="wrap"
      gap={2}
      sx={{ '& p': { fontSize: '0.875rem' } }}
    >
      <TextField label="Product name" variant="outlined" size="small" sx={{ width: '250px' }} />
      <Stack direction="row" alignItems="center">
        <Typography sx={{ color: 'primary.main', mr: 2 }}>Sort By</Typography>
        <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
          <Select displayEmpty>
            <MenuItem value="None">
              <em>None</em>
            </MenuItem>
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="name">Name</MenuItem>
          </Select>
        </FormControl>
        <IconButton>
          <ArrowDownwardIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default ProductFilters;
