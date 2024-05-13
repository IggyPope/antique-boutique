import { useNavigate } from 'react-router-dom';

import { AuthService } from '@/api/services/AuthService';
import { useAppDispatch, useAppSelector } from '@/hooks';

export const useAuth = () => {
  const authService = AuthService.getInstance();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { isAuthenticated, isLoading, errorMessage } = useAppSelector((state) => state.user);

  return {
    signIn: (username: string, password: string) => {
      dispatch({ type: 'user/loginStart' });

      authService
        .signIn(username, password)
        .then(() => {
          dispatch({ type: 'user/loginSuccess' });
          navigate('/');
        })
        .catch((error: Error) => {
          dispatch({ type: 'user/loginError', payload: error.message });
        });
    },
    signUp: (username: string, password: string) => {
      dispatch({ type: 'user/loginStart' });

      authService
        .signUp(username, password)
        .then(() => {
          dispatch({ type: 'user/loginSuccess' });
          navigate('/');
        })
        .catch((error: Error) => {
          dispatch({ type: 'user/loginError', payload: error.message });
        });
    },
    signOut: () => {
      authService.signOut();

      dispatch({ type: 'user/logout' });
    },
    isAuthenticated,
    isLoading,
    errorMessage,
  };
};
