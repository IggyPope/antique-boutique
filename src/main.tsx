import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { App } from './App';
import './index.scss';
import { store } from './store/store';
import theme from './theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
