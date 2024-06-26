export const APP_SETTINGS = {
  LOCALE: 'en-US',
  PRODUCTS_PER_PAGE: 12,
  API_PRICE_RATE: 100,
  CURRENCY: {
    ISO_CODE: 'EUR',
    SYMBOL: '€',
  },
} as const;

export const STORAGE_KEYS = {
  ANONYMOUS_FLOW_TOKEN: 'ABAnonymousFlowToken',
  PASSWORD_FLOW_TOKEN: 'ABPasswordFlowToken',
  CART_ID: 'ABCartId',
} as const;

export const CART_ACTIONS = {
  ADD_ITEM: 'addLineItem',
  REMOVE_ITEM: 'removeLineItem',
  CHANGE_ITEM_QUANTITY: 'changeLineItemQuantity',
  ADD_DISCOUNT_CODE: 'addDiscountCode',
  REMOVE_DISCOUNT_CODE: 'removeDiscountCode',
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
