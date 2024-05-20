import { Navigate, Outlet } from 'react-router-dom';

import { Loader } from '@/components/Loader/Loader';
import { useAuth } from '@/hooks/useAuth';

export const RequireAuth = () => {
  const { isAuthenticated, isInitialRender } = useAuth();

  if (isInitialRender) {
    return <Loader />;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export const RequireNoAuth = () => {
  const { isAuthenticated, isInitialRender } = useAuth();
  if (isInitialRender) {
    return <Loader />;
  }
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
