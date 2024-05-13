import { Navigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';

const SignOut = () => {
  const { signOut } = useAuth();
  signOut();
  return <Navigate to="/" />;
};

export default SignOut;
