import { Outlet } from 'react-router-dom';

import { Container } from '@mui/material';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

const Layout = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
