import { type TokenStore } from '@commercetools/sdk-client-v2';

import { StorageApi } from '@/api/Storage';
import { STORAGE_KEYS } from '@/constants/app';

export const PasswordFlowTokenStore = new StorageApi<TokenStore>(
  localStorage,
  STORAGE_KEYS.PASSWORD_FLOW_TOKEN,
);
