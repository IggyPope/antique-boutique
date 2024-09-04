import { type TokenStore } from '@commercetools/sdk-client-v2';

import { StorageApi } from '@/api/Storage';
import { STORAGE_KEYS } from '@/constants/app';

export const AnonymousFlowTokenStore = new StorageApi<TokenStore>(
  localStorage,
  STORAGE_KEYS.ANONYMOUS_FLOW_TOKEN,
);
