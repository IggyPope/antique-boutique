import { type TokenStore } from '@commercetools/sdk-client-v2';

import { LocalStorageApi } from './Storage';

export const PasswordFlowTokenStore = new LocalStorageApi<TokenStore>('ABPasswordFlowToken');

export const AnonymousFlowTokenStore = new LocalStorageApi<TokenStore>('ABAnonymousFlowToken');
