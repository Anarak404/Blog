import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { ILogin } from './types';

interface IMainContext {
  loggedIn: boolean;
  setLogin(loginData: ILogin): void;
}

interface IMainContextProps {
  children?: React.ReactNode;
}

const defaultValue: IMainContext = {
  loggedIn: false,
  setLogin: (loginData: ILogin) => {},
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

  return <Provider value={{ loggedIn, setLogin }}>{children}</Provider>;
}
