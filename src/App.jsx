import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Welcome from './welcome/Welcome';

const App = () => {
  return (
    <BrowserRouter>
      <Welcome />
    </BrowserRouter>
  );
};

export default App;
