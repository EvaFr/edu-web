import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Welcome from './pages/welcome/Welcome';
import Menu from './pages/menu/Menu';

const App = () => {
  return (
    <BrowserRouter>
      <>
        <Route path="/" exact component={Welcome} />
        <Route path="/book/:id" component={Menu} />
      </>
    </BrowserRouter>
  );
};

export default App;
