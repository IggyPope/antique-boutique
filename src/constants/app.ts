export const APP_SETTINGS = {
  LOCALE: 'en-US',
  PRODUCTS_PER_PAGE: 12,
  API_PRICE_RATE: 100,
} as const;

export const SEARCH_PARAM_NAME = 'text.en-US';

export const SORT_OPTIONS = [
  { value: 'price', label: 'Price' },
  { value: 'name.en-US', label: 'Name' },
] as const;

export const SORT_DIRECTION = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export const DEFAULT_SORT_OPTION = SORT_OPTIONS[0].value;
export const DEFAULT_SORT_DIRECTION = SORT_DIRECTION.ASC;

export type SortOption = (typeof SORT_OPTIONS)[number]['value'];
export type SortDirection = (typeof SORT_DIRECTION)[keyof typeof SORT_DIRECTION];
