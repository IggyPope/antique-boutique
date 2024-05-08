import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/layouts/Layout';
import Login from '@/pages/Login';
import Main from '@/pages/Main';
import NotFound from '@/pages/NotFound';
import Register from '@/pages/Register';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
