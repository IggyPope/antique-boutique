import { ExistingTokenMiddlewareOptions } from '@commercetools/sdk-client-v2';

import { anonymousTokenCache, passwordTokenCache } from './TokenCache';

export const options: ExistingTokenMiddlewareOptions = {
  force: true,
};

export const authorization = passwordTokenCache.get().token || anonymousTokenCache.get().token;
