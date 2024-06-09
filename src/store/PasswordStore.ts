import { type TokenStore } from '@commercetools/sdk-client-v2';

import { LocalStorageApi } from '@/api/Storage';

export const PasswordFlowTokenStore = new LocalStorageApi<TokenStore>('ABPasswordFlowToken');
