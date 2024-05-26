import { Badge, IconButton, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useAuth } from '../../hooks/useAuth';
import Cart from '../UI/Icon/Cart';
import Profile from '../UI/Icon/Profile';
import { NavLink } from '../UI/NavLink/NavLink';

const IconMenu = () => {
  const theme = useTheme();
  const { isAuthenticated } = useAuth();
  const pages = [
    { icon: <Profile />, path: '/profile', auth: true },
    { icon: <Cart />, path: '/cart' },
  ];
  const filteredPages = pages.filter((page) =>
    isAuthenticated ? page.auth !== false : page.auth !== true,
  );
  return (
    <Stack
      direction="row"
      sx={{
        '@media (any-hover: hover)': {
          '& > *:hover *': {
            stroke: theme.palette.secondary.main,
            transition: '0.3s',
          },
        },
      }}
    >
      {filteredPages.map((item) => (
        <IconButton key={item.path.slice(1)}>
          {item.path === '/cart' ? (
            <Badge color="secondary" badgeContent={0}>
              <NavLink to={item.path}>{item.icon}</NavLink>
            </Badge>
          ) : (
            <NavLink to={item.path}>{item.icon}</NavLink>
          )}
        </IconButton>
      ))}
    </Stack>
  );
};

export default IconMenu;
