import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { CssBaseline } from '@mui/material';

import { useAuth } from '@/hooks/useAuth';
import router from '@/routes/Router';

export function App() {
  const { getToken } = useAuth();

  useEffect(() => {
    getToken();
  }, [getToken]);

  return (
    <CssBaseline>
      <RouterProvider router={router} />
    </CssBaseline>
  );
}
