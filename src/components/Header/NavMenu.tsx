import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { NavLink } from '@/components/UI/NavLink/NavLink';
import { useFilteredPages } from '@/hooks/useFilteredPages';

const NavMenu = () => {
  const pages = useFilteredPages();
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        gap: '35px',
        '@media (any-hover: hover)': {
          '& *:hover': {
            color: theme.palette.secondary.main,
            transition: '0.3s',
          },
        },
      }}
    >
      {pages.map((page) => (
        <NavLink key={page.text} to={page.path}>
          {page.text}
        </NavLink>
      ))}
    </Box>
  );
};

export default NavMenu;
