import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material';
import { Stack } from '@mui/material';

const MainNavLinks = () => {
  const theme = useTheme();
  const navLinks = [
    { text: 'Home', path: '/' },
    { text: 'Catalog', path: '/catalog' },
    { text: 'About us', path: '/about' },
    { text: 'Cart', path: '/cart' },
    { text: 'Profile', path: '/profile' },
    { text: 'Sign in', path: '/signin' },
    { text: 'Sign up', path: '/signup' },
  ];
  return (
    <Stack direction="row" gap="10px" flexWrap="wrap">
      {navLinks.map((link) => (
        <Link
          to={link.path}
          key={link.text}
          style={{
            color: theme.palette.primary.light,
            textDecoration: 'none',
            fontSize: '0.9rem',
          }}
        >
          {link.text}
        </Link>
      ))}
    </Stack>
  );
};

export default MainNavLinks;
