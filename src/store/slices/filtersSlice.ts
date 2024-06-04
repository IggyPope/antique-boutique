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
  category: string | null;
  subcategory: string | null;
  brand: string[];
  size: string[];
  color: string[];
  priceRange: [number, number] | null;
  availability: boolean | null;
}

const initialState: ProductFilters = {
  page: 1,
  search: undefined,
  sortBy: DEFAULT_SORT_OPTION,
  sortDirection: DEFAULT_SORT_DIRECTION,
  category: null,
  subcategory: null,
  brand: [],
  size: [],
  color: [],
  priceRange: null,
  availability: null,
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      if (action.payload === '') {
        state.search = undefined;
      } else {
        state.search = action.payload;
      }
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
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.category = action.payload;
      state.page = 1;
    },
    setSubcategory: (state, action: PayloadAction<string | null>) => {
      state.subcategory = action.payload;
      state.page = 1;
    },
    setBrand: (state, action: PayloadAction<string[]>) => {
      state.brand = action.payload;
      state.page = 1;
    },
    setSize: (state, action: PayloadAction<string[]>) => {
      state.size = action.payload;
      state.page = 1;
    },
    setColor: (state, action: PayloadAction<string[]>) => {
      state.color = action.payload;
      state.page = 1;
    },
    setPriceRange: (state, action: PayloadAction<[number, number] | null>) => {
      state.priceRange = action.payload;
      state.page = 1;
    },
    setAvailability: (state, action: PayloadAction<boolean | null>) => {
      state.availability = action.payload;
      state.page = 1;
    },
    resetFilters: () => initialState,
  },
});

export const {
  setPage,
  setSearch,
  setSortBy,
  setSortDirection,
  setCategory,
  setSubcategory,
  setBrand,
  setSize,
  setColor,
  setPriceRange,
  setAvailability,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
