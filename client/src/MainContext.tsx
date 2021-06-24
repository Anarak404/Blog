import React from 'react';
import { useState } from 'react';
import { createContext } from 'react';

interface IMainContext {
  loggedIn: boolean;
}

interface IMainContextProps {
  children?: React.ReactNode;
}

const defaultValue: IMainContext = {
  loggedIn: false,
};

export const mainContext = createContext<IMainContext>(defaultValue);

const { Provider } = mainContext;

export default function MainContextProvider({ children }: IMainContextProps) {
  const [loggedIn, setLoggedIn] = useState(false);

  return <Provider value={{ loggedIn }}>{children}</Provider>;
}
