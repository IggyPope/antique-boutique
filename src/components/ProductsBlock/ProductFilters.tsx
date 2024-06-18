import { useEffect, useState } from 'react';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { SORT_DIRECTION, SORT_OPTIONS, SortOption } from '@/constants/app';
import useProducts from '@/hooks/useProducts';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearch, setSortBy, setSortDirection } from '@/store/slices/filtersSlice';

const ProductFilters = () => {
  const theme = useTheme();

  const dispatch = useAppDispatch();

  const { sortBy, sortDirection, search: searchFilter } = useAppSelector((state) => state.filters);
  const [searchWord, setSearchWord] = useState('');

  const { productsIsFetching } = useProducts();

  useEffect(() => {
    if (!searchFilter) {
      setSearchWord('');
    } else {
      setSearchWord(searchFilter);
    }
  }, [searchFilter]);

  const handleSearch = () => {
    dispatch(setSearch(searchWord));
  };

  const handleClearSearch = () => {
    setSearchWord('');
    dispatch(setSearch(''));
  };

  return (
    <Stack
      justifyContent="space-between"
      direction="row"
      alignItems="flex-start"
      flexWrap="wrap"
      gap={2}
      sx={{ '& p': { fontSize: '0.875rem' } }}
    >
      <Stack direction="row" gap={1}>
        <TextField
          value={searchWord}
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
          helperText="at least 3 characters"
          label="Search"
          variant="outlined"
          size="small"
          onKeyDown={(e) => e.key === 'Enter' && searchWord.length >= 3 && handleSearch()}
          sx={{
            width: '250px',
            '& > p': { m: '0' },
            [theme.breakpoints.down('sm')]: { width: '200px' },
          }}
        />
        <Button
          onClick={handleSearch}
          variant="outlined"
          disabled={searchWord.length < 3 || productsIsFetching}
          sx={{ padding: '5px', minWidth: '45px', height: '40px' }}
        >
          {productsIsFetching ? <CircularProgress size={20} /> : <SearchIcon />}
        </Button>
        <Button
          onClick={handleClearSearch}
          variant="outlined"
          color="error"
          disabled={!searchWord.length || productsIsFetching}
          sx={{ padding: '5px', minWidth: '45px', height: '40px' }}
        >
          {productsIsFetching ? <CircularProgress size={20} /> : <CloseIcon />}
        </Button>
      </Stack>
      <Stack direction="row" alignItems="center">
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            label="Sort By"
            disabled={productsIsFetching}
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
          disabled={productsIsFetching}
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
