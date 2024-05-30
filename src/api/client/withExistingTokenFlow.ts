import { ExistingTokenMiddlewareOptions } from '@commercetools/sdk-client-v2';

import { anonymousTokenCache, passwordTokenCache } from '@/api/client/TokenCache';

export const options: ExistingTokenMiddlewareOptions = {
  force: true,
};

export const getAuthorizationToken = () => {
  return passwordTokenCache.get().token
    ? passwordTokenCache.get().token
    : anonymousTokenCache.get().token;
};
