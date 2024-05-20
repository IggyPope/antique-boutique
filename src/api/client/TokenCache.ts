import { TokenStore, type TokenCache } from '@commercetools/sdk-client-v2';

import { AnonymousFlowTokenStore, PasswordFlowTokenStore } from '@/Storage/Store';

export const passwordTokenCache: TokenCache = {
  get: (): TokenStore => {
    const cachePasswordFlowToken = PasswordFlowTokenStore.getData();
    if (cachePasswordFlowToken) {
      return {
        token: `Bearer ${cachePasswordFlowToken.token}`,
        expirationTime: 0,
        refreshToken: ``,
      };
    }
    return { token: '', expirationTime: 0, refreshToken: '' };
  },
  set: (cache): void => {
    /* const cachePassworFlowToken = PasswordFlowTokenStore.getData();
     if (!cachePassworFlowToken) */
    PasswordFlowTokenStore.saveData(cache);
  },
};

export const anonymousTokenCache: TokenCache = {
  get: (): TokenStore => {
    const cacheAnonymousFlowToken = AnonymousFlowTokenStore.getData();
    if (cacheAnonymousFlowToken) {
      return {
        token: `Bearer ${cacheAnonymousFlowToken.token}`,
        expirationTime: 0,
        refreshToken: ``,
      };
    }
    return { token: '', expirationTime: 0, refreshToken: '' };
  },
  set: (cache): void => {
    /* const cacheAnonymousFlowToken = AnonymousFlowTokenStore.getData();
     if (!cacheAnonymousFlowToken) */
    AnonymousFlowTokenStore.saveData(cache);
  },
};
