import {
  Box,
  Button,
  Container,
  FormControl,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React, { useCallback, useRef } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { mainContext, url } from '../MainContext';
import { IAuthenticaionResponse, IRegisterRequest } from '../types';

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
    padding: '5px 25px',
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
  registerButton: {
    margin: '10px 0',
  },
});

interface IProps {
  navigation: () => void;
}

export const isNotEmptyString = (text: string | undefined) => {
  return text && text.length > 0;
};

export default function Register({ navigation }: IProps) {
  const classes = useStyles();
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const repeatPasswordRef = useRef<HTMLInputElement>(null);

  const { setLogin } = useContext(mainContext);

  const [message, setMessage] = useState('');

  const login = useCallback(() => {
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const repeatPassword = repeatPasswordRef.current?.value;

    if (!isNotEmptyString(username)) {
      setMessage('Username can not be empty!');
      return;
    }
    if (!isNotEmptyString(email)) {
      setMessage('Mail can not be empty!');
      return;
    }
    if (!isNotEmptyString(password)) {
      setMessage('Password can not be empty!');
      return;
    }
    if (password !== repeatPassword) {
      setMessage('Passwords are not equals!');
      return;
    }

    const data: IRegisterRequest = {
      mail: email as string,
      name: username as string,
      password: password as string,
    };

    setMessage('');

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    fetch(url + '/user/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers,
    })
      .then(async (response) => {
        if (response.ok) {
          const responseData: IAuthenticaionResponse = await response.json();
          setLogin({
            ...responseData,
            password: password as string,
            email: email as string,
          });
          return;
        }
        setMessage('User with email already exist!');
      })
      .catch(() => setMessage('Error'));
  }, [setMessage, setLogin]);

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
            <TextField label="Username" fullWidth inputRef={usernameRef} />
          </div>
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
          <div className={classes.inputContainer}>
            <AccountCircle className={classes.icon} />
            <TextField
              label="Repeat Password"
              type="password"
              fullWidth
              inputRef={repeatPasswordRef}
            />
          </div>
          {message.length > 0 && (
            <Typography color="error">{message}</Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            endIcon={<ExitToAppIcon />}
            onClick={login}
            className={classes.registerButton}
          >
            Register
          </Button>
          <Button variant="outlined" color="primary" onClick={navigation}>
            Go back to login page
          </Button>
        </FormControl>
      </Paper>
    </Container>
  );
}
