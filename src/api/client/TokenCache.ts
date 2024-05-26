import { TokenStore, type TokenCache } from '@commercetools/sdk-client-v2';

import { AnonymousFlowTokenStore } from '@/store/AnonymousStore';
import { PasswordFlowTokenStore } from '@/store/PasswordStore';

import { type LocalStorageApi } from '../Storage';

class TokenCacheClass implements TokenCache {
  constructor(private store: LocalStorageApi<TokenStore>) {}

  get() {
    const cacheToken = this.store.getData();
    return {
      token: cacheToken?.token ? `Bearer ${cacheToken?.token}` : '',
      expirationTime: 0,
      refreshToken: cacheToken?.refreshToken ?? '',
    };
  }

  set(cache: TokenStore) {
    this.store.saveData(cache);
  }
}

export const passwordTokenCache = new TokenCacheClass(PasswordFlowTokenStore);
export const anonymousTokenCache = new TokenCacheClass(AnonymousFlowTokenStore);
