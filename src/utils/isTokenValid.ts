import { TokenStore } from '@commercetools/sdk-client-v2';

import { StorageApi } from '@/api/Storage';

export function isTokenValid(flowTokenStore: StorageApi<TokenStore>): boolean {
  const tokenData = flowTokenStore.getData();
  const tokenExpiration = tokenData?.expirationTime ?? 0;
  const currentTime = new Date().getTime();
  return tokenExpiration > currentTime;
}
