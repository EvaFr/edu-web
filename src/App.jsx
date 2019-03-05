import React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Welcome from './pages/welcome/Welcome';
import Login from './pages/authentication/Login';
import Registration from './pages/authentication/Registration';
import Menu from './pages/menu/Menu';

const App = () => {
  return (
    <BrowserRouter>
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Mathpractice</Navbar.Brand>
          <Nav className="ml-auto">
            <NavLink to="/" className="nav-link">
              Login as Guest
            </NavLink>
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
            <NavLink to="/registration" className="nav-link">
              Register
            </NavLink>
          </Nav>
        </Navbar>
        <Route path="/" exact component={Welcome} />
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        <Route path="/book/:id" component={Menu} />
      </>
    </BrowserRouter>
  );
};

export default App;
