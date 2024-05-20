import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Container } from '@mui/material';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import PageHeader from '@/components/PageHeader/PageHeader';

const Layout = () => {
  return (
    <>
      <Header />
      <PageHeader />
      <Container
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
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
