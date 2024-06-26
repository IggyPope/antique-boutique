import { Badge, IconButton, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Cart from '@/components/UI/Icon/Cart';
import Profile from '@/components/UI/Icon/Profile';
import { NavLink } from '@/components/UI/NavLink/NavLink';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';

const pages = [
  { icon: <Profile />, path: '/profile', auth: true },
  { icon: <Cart />, path: '/cart' },
];

const IconMenu = () => {
  const theme = useTheme();
  const { isAuthenticated } = useAuth();
  const filteredPages = pages.filter((page) =>
    isAuthenticated ? page.auth !== false : page.auth !== true,
  );

  const { cartData } = useCart();

  const badgeContent = cartData?.lineItems.length || 0;

  return (
    <Stack
      direction="row"
      alignItems={'flex-start'}
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
            <NavLink to={item.path}>
              <Badge color="secondary" badgeContent={badgeContent}>
                {item.icon}
              </Badge>
            </NavLink>
          ) : (
            <NavLink to={item.path}>{item.icon}</NavLink>
          )}
        </IconButton>
      ))}
    </Stack>
  );
};

export default IconMenu;
