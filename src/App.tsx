import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import router from '@/routes/Router';

import { useAuth } from './hooks/useAuth';

export function App() {
  const { getToken } = useAuth();

  useEffect(() => {
    getToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <RouterProvider router={router} />;
}
