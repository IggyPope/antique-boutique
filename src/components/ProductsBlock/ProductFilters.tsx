import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';

import { SORT_DIRECTION, SORT_OPTIONS, SortOption } from '@/constants/app';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setSearch, setSortBy, setSortDirection } from '@/store/slices/filtersSlice';

const ProductFilters = () => {
  const dispatch = useAppDispatch();
  const { search, sortBy, sortDirection } = useAppSelector((state) => state.filters);

  return (
    <Stack
      justifyContent="space-between"
      direction="row"
      alignItems="center"
      flexWrap="wrap"
      gap={2}
      sx={{ '& p': { fontSize: '0.875rem' } }}
    >
      <TextField
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        label="Search"
        variant="outlined"
        size="small"
        sx={{ width: '250px' }}
      />
      <Stack direction="row" alignItems="center">
        <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            label="Sort By"
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value as SortOption))}
          >
            {SORT_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <IconButton
          onClick={() =>
            dispatch(
              setSortDirection(
                sortDirection === SORT_DIRECTION.ASC ? SORT_DIRECTION.DESC : SORT_DIRECTION.ASC,
              ),
            )
          }
        >
          <ArrowDownwardIcon
            sx={{
              transform: `rotate(${sortDirection === SORT_DIRECTION.ASC ? 0 : 180}deg)`,
              transition: 'transform 0.2s',
            }}
          />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default ProductFilters;
