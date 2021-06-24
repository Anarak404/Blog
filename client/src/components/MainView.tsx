import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles({
  spacer: {
    flex: 1,
  },
  margin: {
    marginRight: '25px',
  },
  cursor: {
    cursor: 'pointer',
  },
});

export default function MainView() {
  const classes = useStyles();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography
          variant="h5"
          className={[classes.margin, classes.cursor].join(' ')}
        >
          Home
        </Typography>
        <Typography variant="h5" className={classes.cursor}>
          Role
        </Typography>
        <div className={classes.spacer} />
        <IconButton>
          <ExitToApp fontSize="large" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
