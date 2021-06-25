import React, { useContext, useState } from 'react';
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
import MailIcon from '@material-ui/icons/Mail';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockIcon from '@material-ui/icons/Lock';
import { useRef } from 'react';
import { useCallback } from 'react';
import { isNotEmptyString } from './Register';
import { IAuthenticaionResponse, ILoginRequest } from '../types';
import { mainContext, url } from '../MainContext';

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

  const { setLogin } = useContext(mainContext);

  const [message, setMessage] = useState('');

  const login = useCallback(() => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!isNotEmptyString(email)) {
      setMessage('Mail can not be empty!');
      return;
    }
    if (!isNotEmptyString(password)) {
      setMessage('Password can not be empty!');
      return;
    }

    const data: ILoginRequest = {
      mail: email as string,
      password: password as string,
    };

    setMessage('');

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    fetch(url + '/user/login', {
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
        setMessage('Authentication failed!');
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
            <MailIcon className={classes.icon} />
            <TextField label="Email" fullWidth inputRef={emailRef} />
          </div>
          <div className={classes.inputContainer}>
            <LockIcon className={classes.icon} />
            <TextField
              label="Password"
              type="password"
              fullWidth
              inputRef={passwordRef}
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
