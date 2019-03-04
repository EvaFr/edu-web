import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Welcome from './pages/welcome/Welcome';
import Login from './pages/authentication/Login';
import Registration from './pages/authentication/Registration';
import Menu from './pages/menu/Menu';

const App = () => {
  return (
    <BrowserRouter>
      <>
        <Route path="/" exact component={Welcome} />
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        <Route path="/book/:id" component={Menu} />
      </>
    </BrowserRouter>
  );
};

export default App;
