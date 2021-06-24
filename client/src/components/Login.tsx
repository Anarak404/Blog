import React from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  makeStyles,
  Paper,
  TextField,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useRef } from 'react';
import { useCallback } from 'react';

const useStyles = makeStyles({
  inputContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    padding: '5px 0',
  },
  icon: {
    marginBottom: '5px',
    marginRight: '7px',
  },
  container: {
    padding: '25px 25px',
  },
  image: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
  },
  boxImage: {
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formControl: {
    padding: '25px 0',
  },
  loginButton: {
    margin: '10px 0',
  },
});

interface IProps {
  navigation: () => void;
}

export default function Login({ navigation }: IProps) {
  const classes = useStyles();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const login = useCallback(() => {
    console.log('Ania');
  }, []);

  return (
    <Container maxWidth="xs">
      <Paper className={classes.container} elevation={15}>
        <Box className={classes.boxImage}>
          <img
            src="https://www.national-geographic.pl/uploads/media/default/0014/19/roslinka.jpeg"
            alt="Plant"
            className={classes.image}
          />
        </Box>
        <FormControl fullWidth className={classes.formControl}>
          <div className={classes.inputContainer}>
            <AccountCircle className={classes.icon} />
            <TextField label="Email" fullWidth inputRef={emailRef} />
          </div>
          <div className={classes.inputContainer}>
            <AccountCircle className={classes.icon} />
            <TextField
              label="Password"
              type="password"
              fullWidth
              inputRef={passwordRef}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            endIcon={<ExitToAppIcon />}
            onClick={login}
            className={classes.loginButton}
          >
            Login
          </Button>
          <Button variant="outlined" color="primary" onClick={navigation}>
            Register
          </Button>
        </FormControl>
      </Paper>
    </Container>
  );
}
