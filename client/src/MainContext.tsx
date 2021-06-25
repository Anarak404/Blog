import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { ILogin, IPost, Role } from './types';

interface IMainContext {
  loggedIn: boolean;
  setLogin(loginData: ILogin): void;
  role: Role;
  getHeaders(auth?: boolean): Headers;
  posts: IPost[];
}

interface IMainContextProps {
  children?: React.ReactNode;
}

const defaultValue: IMainContext = {
  loggedIn: false,
  setLogin: (loginData: ILogin) => {},
  role: 'USER',
  getHeaders: (auth?: boolean) => new Headers(),
  posts: [],
};

export const mainContext = createContext<IMainContext>(defaultValue);

export const url = 'http://localhost:8080';

const { Provider } = mainContext;

export default function MainContextProvider({ children }: IMainContextProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [data, setData] = useState<ILogin>({
    email: '',
    password: '',
    posts: [],
    user: { id: 0, name: '', role: 'USER' },
  });

  const setLogin = useCallback(
    (loginData: ILogin) => {
      setData(loginData);
      setLoggedIn(true);
    },
    [setData, setLoggedIn]
  );

  const getHeaders = useCallback(
    (auth: boolean = true) => {
      console.log(auth);
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      if (auth) {
        headers.append(
          'Authorization',
          `Basic ${btoa(`${data.email}:${data.password}`)}`
        );
      }
      return headers;
    },
    [data]
  );

  return (
    <Provider
      value={{
        loggedIn,
        setLogin,
        role: data.user.role,
        getHeaders,
        posts: data.posts,
      }}
    >
      {children}
    </Provider>
  );
}
