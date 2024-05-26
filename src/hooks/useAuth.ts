import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import type { CustomerDraft } from '@commercetools/platform-sdk';

import { AuthService } from '@/api/services/AuthService';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { AnonymousFlowTokenStore } from '@/store/AnonymousStore';
import { PasswordFlowTokenStore } from '@/store/PasswordStore';
import { setIsInitialRender } from '@/store/slices/userSlice';
import { isTokenValid } from '@/utils/isTokenValid';

//import { anonymousTokenCache, passwordTokenCache } from '@/api/client/TokenCache';

export const useAuth = () => {
  const authService = AuthService.getInstance();

  const dispatch = useAppDispatch();

  const { isAuthenticated, isLoading, errorMessage, isInitialRender } = useAppSelector(
    (state) => state.user,
  );

  return {
    getToken: () => {
      console.log('getToken');
      const anonymousFlowToken = AnonymousFlowTokenStore.getData();
      //TODO implement logic to refresh the expired token
      if (isTokenValid(PasswordFlowTokenStore)) {
        dispatch({ type: 'user/signInSuccess' });
      } else if (anonymousFlowToken) {
        dispatch(setIsInitialRender(false));
        // TODO implement logic of using the cached token for anonymous session
      } else {
        dispatch(setIsInitialRender(false));
        // TODO implement logic to obtain an access token for anonymous session
      }
    },

    signIn: (username: string, password: string) => {
      dispatch({ type: 'user/signInStart' });

      authService
        .signIn(username, password)
        .then(() => {
          dispatch({ type: 'user/signInSuccess' });
          toast.success('You have successfully signed in!');
          AnonymousFlowTokenStore.removeData();
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
          //   passwordTokenCache.set(anonymousTokenCache.get())
          AnonymousFlowTokenStore.removeData();
        })
        .catch((error: Error) => {
          dispatch({ type: 'user/signInError', payload: error.message });
          toast.error(error.message);
        });
    },
    signOut: () => {
      console.log(12312313123);
      authService.signOut();
      PasswordFlowTokenStore.removeData();
      dispatch({ type: 'user/signOut' });
      toast.success('You have successfully signed out!');
    },
    isAuthenticated,
    isLoading,
    isInitialRender,
    errorMessage,
  };
};
