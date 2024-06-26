import { createTheme } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';

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
      main: '#828282',
      dark: '#212121',
      contrastText: '#fff',
    },
    error: {
      light: '#ffcbd0',
      main: '#E46D6D',
      dark: '#d02327',
      contrastText: '#000',
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        today: {
          color: '#846267',
          borderRadius: '2px',
          borderWidth: '1px',
          borderColor: '#C37D92',
          border: '1px solid',
          backgroundColor: '#E3E9BE',
        },
        root: {
          color: '#846267',
          borderRadius: '2px',
          borderWidth: '1px',
          borderColor: '#C37D92',
          border: '1px solid',
          backgroundColor: '#D6E4CB',
        },
      },
      defaultProps: {
        sx: {
          '&.Mui-selected': {
            backgroundColor: '#C37D92',
            '&:focus': {
              backgroundColor: '#C37D92',
            },
            '&:hover:focus': {
              backgroundColor: '#C37D92',
            },
          },
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
        sx: {
          padding: '0 10px',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        color: 'secondary',
        sx: {
          textTransform: 'none',
          fontWeight: '600',
          borderRadius: '2px',
          textDecoration: 'none',
        },
      },
    },
  },
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
    h1: {
      fontSize: '2.5rem',
    },
  },
});

export default theme;
