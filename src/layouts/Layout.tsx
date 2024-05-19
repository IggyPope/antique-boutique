import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Container } from '@mui/material';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import PageHeader from '@/components/PageHeader/PageHeader';
import { useAuth } from '@/hooks/useAuth';

const Layout = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    getToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Header />
      <PageHeader />
      <Container
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          padding: 2,
        }}
      >
        <Outlet />
      </Container>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Layout;
