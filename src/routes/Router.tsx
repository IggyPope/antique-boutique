import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import Layout from '@/layouts/Layout';
import About from '@/pages/About';
import Cart from '@/pages/Cart';
import Catalog from '@/pages/Catalog';
import Main from '@/pages/Main';
import NotFound from '@/pages/NotFound';
import Profile from '@/pages/Profile';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import { RequireAuth, RequireNoAuth } from '@/routes/auth/RouteGuards';
import SignOut from '@/routes/auth/SignOut';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Main />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/about" element={<About />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<NotFound />} />
      <Route element={<RequireNoAuth />}>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
      <Route element={<RequireAuth />}>
        <Route path="signout" element={<SignOut />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Route>,
  ),
);

export default router;
