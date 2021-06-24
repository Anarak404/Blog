import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import Authentication from './components/Authentication';
import MainView from './components/MainView';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#007200',
    },
    secondary: {
      main: '#c8d5b9',
    },
  },
  props: {
    MuiSvgIcon: {
      htmlColor: '#fff',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Authentication />
      </div>
    </ThemeProvider>
  );
}

export default App;
