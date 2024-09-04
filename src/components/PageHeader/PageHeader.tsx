import { Box, Container, Stack, Typography, useTheme } from '@mui/material';

import furniture from '@/assets/img/furniture.webp';
import { usePageTitle } from '@/hooks/usePageTitle';

const PageHeader = () => {
  const theme = useTheme();

  const pageTitle = usePageTitle();
  return pageTitle ? (
    <Box
      sx={{
        width: '100%',
        backgroundImage: `linear-gradient(rgba(33, 33, 33, 1), rgba(33, 33, 33, 0.8)), url(${furniture})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="column"
          justifyContent="space-between"
          height="100%"
          sx={{
            padding: '34px 0 40px 0',
            gap: '15px',
            [theme.breakpoints.down('sm')]: {
              padding: '10px 0 10px 0',
              gap: '7px',
            },
          }}
        >
          <Typography
            color={theme.palette.secondary.contrastText}
            variant="h1"
            sx={{ [theme.breakpoints.down('sm')]: { fontSize: '1.6rem' } }}
          >
            {pageTitle}
          </Typography>
        </Stack>
      </Container>
    </Box>
  ) : null;
};

export default PageHeader;
