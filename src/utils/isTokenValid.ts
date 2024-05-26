import { TokenStore } from '@commercetools/sdk-client-v2';

import { LocalStorageApi } from '@/api/Storage';

export function isTokenValid(flowTokenStore: LocalStorageApi<TokenStore>): boolean {
  const tokenData = flowTokenStore.getData();
  const tokenExpiration = tokenData?.expirationTime ?? 0;
  const currentTime = new Date().getTime();
  return tokenExpiration > currentTime;
}
