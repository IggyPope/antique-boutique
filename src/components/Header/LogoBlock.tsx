import { useNavigate } from 'react-router-dom';

import { Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Logo from '@/components/UI/Logo/Logo';

interface ILogoBlockProps {
  display?: { xs: string; md: string };
}

const LogoBlock = ({ display }: ILogoBlockProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Stack
      onClick={() => navigate('/')}
      direction="row"
      alignItems="center"
      gap={1}
      sx={{
        display: display,
        cursor: 'pointer',
        '@media (any-hover: hover)': {
          '&>*:hover': {
            color: theme.palette.secondary.main,
            transition: '0.3s',
          },
        },
      }}
    >
      <Logo />
      <Typography variant="h6" sx={{ [theme.breakpoints.down('sm')]: { display: 'none' } }}>
        Antique Boutique
      </Typography>
    </Stack>
  );
};

export default LogoBlock;
