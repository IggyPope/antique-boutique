import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    secondary: {
      light: '#b3d969 ',
      main: '#7DB800',
      dark: '#236f00',
      contrastText: '#fff',
    },
    primary: {
      light: '#A2A2A2',
      main: '#212121',
      dark: '#828282',
      contrastText: '#000',
    },
    error: {
      light: '#ffcbd0',
      main: '#E46D6D',
      dark: '#d02327',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
  },
});

export default theme;
