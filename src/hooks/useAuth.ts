import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
          toast.success('You have successfully signed in!');
        })
        .catch((error: Error) => {
          dispatch({ type: 'user/signInError', payload: error.message });
          toast.error(error.message);
        });
    },
    signUp: (customerDraft: CustomerDraft & { password: string }) => {
      dispatch({ type: 'user/signInStart' });

      authService
        .signUp(customerDraft)
        .then(() => {
          dispatch({ type: 'user/signInSuccess' });
          toast.success('You have successfully signed up!');
        })
        .catch((error: Error) => {
          dispatch({ type: 'user/signInError', payload: error.message });
          toast.error(error.message);
        });
    },
    signOut: () => {
      authService.signOut();

      dispatch({ type: 'user/signOut' });
      toast.success('You have successfully signed out!');
    },
    isAuthenticated,
    isLoading,
    errorMessage,
  };
};
