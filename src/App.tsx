/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import router from '@/routes/Router';

import { useAuth } from './hooks/useAuth';

export function App() {
  const { getToken } = useAuth();
  console.log('App');
  useEffect(() => {
    getToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getToken]);

  return <RouterProvider router={router} />;
}
