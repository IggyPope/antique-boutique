import { TokenStore, type TokenCache } from '@commercetools/sdk-client-v2';

import { type StorageApi } from '@/api/Storage';
import { AnonymousFlowTokenStore } from '@/store/AnonymousStore';
import { PasswordFlowTokenStore } from '@/store/PasswordStore';

class TokenCacheClass implements TokenCache {
  constructor(private store: StorageApi<TokenStore>) {}

  get() {
    const cacheToken = this.store.getData();

    const tokenObject = {
      token: cacheToken?.token ? `${cacheToken?.token}` : '',
      expirationTime: cacheToken?.expirationTime ?? 0,
      refreshToken: cacheToken?.refreshToken ?? '',
    };

    return tokenObject;
  }

  set(cache: TokenStore) {
    this.store.saveData({
      token: `${cache.token}`,
      expirationTime: cache.expirationTime,
      refreshToken: cache.refreshToken,
    });
  }
}

export const passwordTokenCache = new TokenCacheClass(PasswordFlowTokenStore);
export const anonymousTokenCache = new TokenCacheClass(AnonymousFlowTokenStore);
