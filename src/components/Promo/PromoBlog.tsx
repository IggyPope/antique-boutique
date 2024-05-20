import { Grid, Typography } from '@mui/material';
import { lighten, useTheme } from '@mui/material/styles';

import blog from '@/assets/img/blog.jpg';

const PromoBlog = () => {
  const theme = useTheme();
  return (
    <Grid container>
      <Grid
        item
        sm={12}
        md={6}
        sx={{
          backgroundImage: `url(${blog})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
        }}
      ></Grid>
      <Grid
        item
        sm={12}
        md={6}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        gap={2}
        sx={{ backgroundColor: lighten(theme.palette.primary.main, 0.7), padding: '64px 24px' }}
      >
        <Typography variant="h6" sx={{ color: theme.palette.primary.contrastText }}>
          From Blog
        </Typography>
        <Typography variant="h4">Dieter Rams 10 principles of good Design</Typography>
        <Typography>
          Dieter Rams famous 10 principles of good design have become iconic and have inspired
          designers across the world. Born in Wiesbaden on May 20, 1932, Dieter Rams soon made a
          name for himself in the field of industrial design. Over the course of half a century, he
          has developed more than 500 products ranging from audio to furniture. In the 19070s Dieter
          Rams has laid out of a list of 10 principles which made history ever since. This
          straightforward list lays out the fundamentals of good design, which are valid up to this
          day decades after.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PromoBlog;
