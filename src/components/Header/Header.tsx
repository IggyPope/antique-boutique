import { useTheme } from '@mui/material';
import { Stack } from '@mui/material';
import { AppBar } from '@mui/material';

import { NavLink } from '@/components/UI/NavLink/NavLink';

// import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  // const { isAuthenticated } = useAuth();
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.primary.dark,
        padding: 2,
      }}
    >
      <Stack direction="row" gap={2} justifyContent="center">
        <NavLink to="/">Home</NavLink>
        {/* {isAuthenticated ? (
          <NavLink to="/signout">Sign out</NavLink>
        ) : (
          <>
            <NavLink to="/signin">Sign in</NavLink>
            <NavLink to="/signup">Sign up</NavLink>
          </>
        )} */}
        <NavLink to="/signin">Sign in</NavLink>
        <NavLink to="/signup">Sign up</NavLink>
        <NavLink to="/signout">Sign out</NavLink>
      </Stack>
    </AppBar>
  );
};

export default Header;
