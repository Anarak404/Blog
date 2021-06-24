import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import AppView from './components/AppView';
import MainContextProvider from './MainContext';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#007200',
    },
    secondary: {
      main: '#c8d5b9',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainContextProvider>
        <AppView />
      </MainContextProvider>
    </ThemeProvider>
  );
}

export default App;
