import { Grid, Link, Typography } from '@mui/material';
import { lighten, useTheme } from '@mui/material/styles';

import accessories from '@/assets/img/promo/accessories.webp';
import audio from '@/assets/img/promo/audio.webp';
import book from '@/assets/img/promo/book.webp';
import clock from '@/assets/img/promo/clock.webp';
import electronic from '@/assets/img/promo/electronic.webp';
import home from '@/assets/img/promo/home.webp';
import man from '@/assets/img/promo/man.webp';
import radio from '@/assets/img/promo/radio.webp';

const promo = [
  { name: 'Devices', href: '/catalog/devices', img: electronic },
  { name: 'Clothes', href: '/catalog/clothes', img: man },
  { name: 'Home', href: '/catalog/home', img: home },
  { name: 'Books', href: '/catalog/home/books', img: book },
  { name: 'Clocks', href: '/catalog/devices/clocks', img: clock },
  { name: 'Audio', href: '/catalog/devices/audio', img: audio },
  { name: 'Accessories', href: '/catalog/clothes/accessories', img: accessories },
];

const PromoCategories = () => {
  const theme = useTheme();
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sm={6}
        md={8}
        sx={{
          padding: '36px 24px 24px 24px',
          [theme.breakpoints.down('lg')]: {
            padding: '24px 16px 16px 16px',
          },
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          backgroundImage: `linear-gradient(rgba(33, 33, 33, 0.7), rgba(33, 33, 33, 0.7)), url(${radio})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center 10%',
          backgroundSize: 'cover',
          color: theme.palette.primary.contrastText,
          height: '180px',
          border: `5px solid ${theme.palette.primary.contrastText}`,
        }}
      >
        <Typography variant="h5">Buy at the best prices!</Typography>
        <Typography>
          Use code &quot;PROMO20&quot; to get 20% off all clothes and &quot;PROMO15&quot; to get 15%
          off all items price
        </Typography>
      </Grid>
      {promo.map((item) => (
        <Grid
          component={Link}
          href={item.href}
          item
          key={item.name}
          xs={12}
          sm={6}
          md={4}
          sx={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'end',
            justifyContent: 'end',
            backgroundColor: lighten(theme.palette.primary.main, 0.7),
            backgroundImage: `url(${item.img})`,
            border: `5px solid ${theme.palette.primary.contrastText}`,
            padding: '16px 24px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '-50% 10%',
            backgroundSize: '80%',
            height: '180px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            '@media (any-hover: hover)': {
              '&:hover': {
                backgroundColor: lighten(theme.palette.primary.main, 0.9),
              },
            },
          }}
        >
          <Typography>{item.name}</Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default PromoCategories;
