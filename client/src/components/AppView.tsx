import React from 'react';
import { useContext } from 'react';
import { mainContext } from '../MainContext';
import Authentication from './Authentication';
import MainView from './MainView';

export default function AppView() {
  const { loggedIn } = useContext(mainContext);

  return (
    <div className="App">{loggedIn ? <MainView /> : <Authentication />}</div>
  );
}
