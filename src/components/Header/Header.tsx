import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTheme, AppBar, Container, Stack } from '@mui/material';

import BurgerMenu from './BurgerMenu';
import IconMenu from './IconMenu';
import LogoBlock from './LogoBlock';
import NavMenu from './NavMenu';

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (path: string) => {
    setAnchorElNav(null);
    if (typeof path !== 'string') {
      return;
    }
    navigate(path);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.primary.dark,
        padding: '20px 0',
        [theme.breakpoints.down('sm')]: {
          padding: '10px 0',
        },
      }}
    >
      <Container>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <LogoBlock display={{ xs: 'none', md: 'flex' }} />
          <BurgerMenu
            handleOpenNavMenu={handleOpenNavMenu}
            handleCloseNavMenu={handleCloseNavMenu}
            anchorElNav={anchorElNav}
          />
          <NavMenu />
          <LogoBlock display={{ xs: 'flex', md: 'none' }} />
          <IconMenu />
        </Stack>
      </Container>
    </AppBar>
  );
};

export default Header;
