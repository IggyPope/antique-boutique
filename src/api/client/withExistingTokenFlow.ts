import { ExistingTokenMiddlewareOptions } from '@commercetools/sdk-client-v2';

import { anonymousTokenCache, passwordTokenCache } from './TockenCache';

export const options: ExistingTokenMiddlewareOptions = {
  force: true,
};

export const customerAuthorization = (): string => passwordTokenCache.get().token;
export const anonymAuthorization = (): string => anonymousTokenCache.get().token;
export const authorization = customerAuthorization()
  ? customerAuthorization()
  : anonymAuthorization();
