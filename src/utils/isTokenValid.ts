import { PasswordFlowTokenStore } from '@/store/PasswordStore';

export function isTokenValid(): boolean {
  const tokenData = PasswordFlowTokenStore.getData();
  const tokenExpiration = tokenData?.expirationTime ?? 0;
  const currentTime = new Date().getTime();
  return tokenExpiration > currentTime;
}
