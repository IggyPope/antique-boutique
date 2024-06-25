import { APP_SETTINGS } from '@/constants/app';

export default (price: number) => {
  return `${APP_SETTINGS.CURRENCY.SYMBOL}${(price / 100).toFixed(2)}`;
};
