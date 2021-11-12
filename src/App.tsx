import React from 'react';
import loadable from '@loadable/component';
import { Route } from 'react-router-dom';

import { GlobalStyle } from './styles/global-styles';
import Menu from './components/Menu';

const BluePage = loadable(() => import('./pages/BluePage'));
const RedPage = loadable(() => import('./pages/RedPage'));
const UsersPage = loadable(
  () => import(/* webpackPrefetch: true */ './pages/UsersPage'),
);
// const UsersPage = loadable(() => import('./pages/UsersPage'), { ssr: false });
const TestPage = loadable(() => import('./pages/Test'));

const App = () => {
  // const [key, setKey] = React.useState('react1');
  return (
    <div>
      <Menu />
      <hr />
      <Route path="/hello" component={RedPage} />
      <Route path="/style" component={BluePage} />
      <Route path="/request" component={UsersPage} />
      <Route path="/saga" component={TestPage} />
      <GlobalStyle />
    </div>
  );
};

export default App;
