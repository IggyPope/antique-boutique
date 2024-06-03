/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import router from '@/routes/Router';

export function App() {
  const { getToken } = useAuth();
  useEffect(() => {
    getToken();
  }, [getToken]);

  return <RouterProvider router={router} />;
}
