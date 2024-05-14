import type { CustomerDraft } from '@commercetools/platform-sdk';

import { AuthService } from '@/api/services/AuthService';
import { useAppDispatch, useAppSelector } from '@/hooks';

export const useAuth = () => {
  const authService = AuthService.getInstance();

  const dispatch = useAppDispatch();

  const { isAuthenticated, isLoading, errorMessage } = useAppSelector((state) => state.user);

  return {
    signIn: (username: string, password: string) => {
      dispatch({ type: 'user/signInStart' });

      authService
        .signIn(username, password)
        .then(() => {
          dispatch({ type: 'user/signInSuccess' });
        })
        .catch((error: Error) => {
          dispatch({ type: 'user/signInError', payload: error.message });
        });
    },
    signUp: (customerDraft: CustomerDraft & { password: string }) => {
      dispatch({ type: 'user/signInStart' });

      authService
        .signUp(customerDraft)
        .then(() => {
          dispatch({ type: 'user/signInSuccess' });
        })
        .catch((error: Error) => {
          dispatch({ type: 'user/signInError', payload: error.message });
        });
    },
    signOut: () => {
      authService.signOut();

      dispatch({ type: 'user/signOut' });
    },
    isAuthenticated,
    isLoading,
    errorMessage,
  };
};
