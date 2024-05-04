import React from 'react';
import ReactDOM from 'react-dom/client';

// Main design font
import '@fontsource-variable/roboto-condensed';
// Roboto font is required for Material UI
import '@fontsource/roboto/latin-ext.css';
import '@fontsource/roboto/latin-italic.css';
import '@fontsource/roboto/latin.css';

import App from '@/App';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
