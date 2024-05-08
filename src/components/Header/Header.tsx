import { Link } from 'react-router-dom';

import { Container } from '@mui/material';
import { AppBar } from '@mui/material';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <AppBar className={styles.header} position="static">
      <Container maxWidth="xl">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </Container>
    </AppBar>
  );
};

export default Header;
