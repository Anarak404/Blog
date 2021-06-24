import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import Login from './Login';
import Register from './Register';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function Authentication() {
  const classes = useStyles();
  const [displayLoginPage, setDisplayLoginPage] = useState(true);

  const changeWindow = useCallback(() => {
    setDisplayLoginPage((s) => !s);
  }, [setDisplayLoginPage]);

  return (
    <div className={classes.container}>
      {displayLoginPage ? (
        <Login navigation={changeWindow} />
      ) : (
        <Register navigation={changeWindow} />
      )}
    </div>
  );
}
