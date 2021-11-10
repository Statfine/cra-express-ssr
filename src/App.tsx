import React from 'react';
import loadable from '@loadable/component';
import { Route } from 'react-router-dom';
import Menu from './components/Menu';

// import { Test } from 'pages/Test/Loadable';

const BluePage = loadable(() => import('./pages/BluePage'));
const RedPage = loadable(() => import('./pages/RedPage'));
const UsersPage = loadable(() => import('./pages/UsersPage'));
const TestPage = loadable(() => import('./pages/Test'));

const App = () => {
  return (
    <div>
      <Menu />
      <hr />
      <Route path="/red" component={RedPage} />
      <Route path="/blue" component={BluePage} />
      <Route path="/users" component={UsersPage} />
      <Route path="/test" component={TestPage} />
    </div>
  );
};

export default App;
