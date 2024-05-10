import { Container, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

import Logo from '@/components/UI/Logo/Logo';
import OutboundLink from '@/components/UI/OutboundLink/OutboundLink';

const Footer = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack
      component="footer"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.contrastText,
        width: '100%',
        height: '130px',
        fontWeight: '600',
        [theme.breakpoints.down('sm')]: {
          height: '100px',
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid
          columnSpacing={2}
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={4}>
            <Typography variant="body1">2024, June</Typography>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: 'center' }}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              flexWrap="wrap"
              gap={1}
            >
              <Logo />
              <Typography
                sx={{ [theme.breakpoints.down('sm')]: { display: 'none' } }}
                variant="body1"
              >
                Antique Boutique
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: 'right' }}>
            <OutboundLink
              href="https://rs.school/"
              text={isMobile ? 'RS School' : 'The Rolling Scopes School'}
            />
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
};

export default Footer;
