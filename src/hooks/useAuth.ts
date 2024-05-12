import { useNavigate } from 'react-router-dom';

import { AuthService } from '@/api/services/AuthService';
import { useAppDispatch } from '@/hooks';

export const useAuth = () => {
  const authService = AuthService.getInstance();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  return {
    signIn: (username: string, password: string) => {
      dispatch({ type: 'loginStart' });

      authService
        .signIn(username, password)
        .then(() => {
          dispatch({ type: 'loginSuccess' });
          navigate('/');
        })
        .catch((error: Error) => {
          dispatch({ type: 'loginError', payload: error.message });
        });
    },
    signUp: (username: string, password: string) => {
      dispatch({ type: 'loginStart' });

      authService
        .signUp(username, password)
        .then(() => {
          dispatch({ type: 'loginSuccess' });
          navigate('/');
        })
        .catch((error: Error) => {
          dispatch({ type: 'loginError', payload: error.message });
        });
    },
    signOut: () => {
      authService.signOut();

      dispatch({ type: 'logout' });
    },
  };
};
