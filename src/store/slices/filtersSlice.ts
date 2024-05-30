import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import {
  DEFAULT_SORT_DIRECTION,
  DEFAULT_SORT_OPTION,
  type SortDirection,
  type SortOption,
} from '@/constants/app';

export interface ProductFilters {
  page: number;
  search?: string;
  sortBy: SortOption;
  sortDirection: SortDirection;
}

const initialState: ProductFilters = {
  page: 1,
  search: undefined,
  sortBy: DEFAULT_SORT_OPTION,
  sortDirection: DEFAULT_SORT_DIRECTION,
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.page = 1;
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
      state.page = 1;
    },
    setSortDirection: (state, action: PayloadAction<SortDirection>) => {
      state.sortDirection = action.payload;
      state.page = 1;
    },
    resetFilters: () => initialState,
  },
});

export const { setPage, setSearch, setSortBy, setSortDirection, resetFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
