import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useFilteredPages } from '@/hooks/useFilteredPages';

interface IMenuProps {
  handleOpenNavMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseNavMenu: (path: string) => void;
  anchorElNav: HTMLElement | null;
}

const BurgerMenu = ({ handleOpenNavMenu, handleCloseNavMenu, anchorElNav }: IMenuProps) => {
  const theme = useTheme();
  const pages = useFilteredPages();
  return (
    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
        sx={{ padding: 0 }}
      >
        <MenuIcon fontSize="large" />
      </IconButton>
      <Menu
        anchorEl={anchorElNav}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        {pages.map((page) => (
          <MenuItem key={page.text} onClick={() => handleCloseNavMenu(page.path)}>
            <Typography color={theme.palette.primary.dark}>{page.text}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default BurgerMenu;
