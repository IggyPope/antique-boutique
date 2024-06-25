import { NavLink as RouterNavLink } from 'react-router-dom';

import { Typography, useTheme } from '@mui/material';

export interface NavLinkProps {
  children: React.ReactNode;
  to: string;
}

export const NavLink = ({ children, to }: NavLinkProps) => {
  const theme = useTheme();

  return (
    <RouterNavLink to={to} style={{ textDecoration: 'none' }}>
      {({ isActive }) => (
        <Typography
          sx={{
            textDecoration: 'none',
            display: 'flex',
            color: isActive ? theme.palette.secondary.main : theme.palette.primary.contrastText,
          }}
        >
          {children}
        </Typography>
      )}
    </RouterNavLink>
  );
};
