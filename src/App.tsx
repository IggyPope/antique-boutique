/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import router from '@/routes/Router';

import { ProductService } from './api/services/ProductService';
import { useAuth } from './hooks/useAuth';

export function App() {
  const { getToken } = useAuth();

  useEffect(() => {
    getToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    ProductService.getInstance().getProductById().then(console.log).catch(console.log);
  });
  return <RouterProvider router={router} />;
}
