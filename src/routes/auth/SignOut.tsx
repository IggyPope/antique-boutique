import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useLogoutUserMutation } from '@/api/services/commercetoolsApi';

const SignOut = () => {
  const [logoutUser] = useLogoutUserMutation();

  useEffect(() => {
    void logoutUser();
  }, [logoutUser]);

  return <Navigate to="/" />;
};

export default SignOut;
