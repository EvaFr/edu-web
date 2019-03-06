import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import getRandomInt from '../pages/authentication/get-randomInt';

const loginAsGuest = (setIsLoggedIn, setIsLoggingIn) => {
  const sessionId = getRandomInt(0, 20000000).toString();
  fetch(`/api/authentication/login?password=&username=&sessionid=${sessionId}`)
    .then(response => response.json())
    .then(loginData => {
      if (loginData.message === 'OK') {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

      setIsLoggingIn(false);
    });
};

const UserHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const firstUpdate = useRef(true);

  const onLoginAsGuest = () => setIsLoggingIn(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (isLoggedIn) {
      return;
    }

    loginAsGuest(setIsLoggedIn, setIsLoggingIn);
  }, [isLoggingIn]);

  if (isLoggedIn) {
    return (
      <Nav className="ml-auto">
        <Nav.Link className="nav-link">Guest</Nav.Link>
        <Nav.Link className="nav-link">Logout</Nav.Link>
      </Nav>
    );
  }

  return (
    <Nav className="ml-auto">
      <Nav.Link className="nav-link" onClick={onLoginAsGuest}>
        Login as Guest
      </Nav.Link>
      <NavLink to="/login" className="nav-link">
        Login
      </NavLink>
      <NavLink to="/registration" className="nav-link">
        Register
      </NavLink>
    </Nav>
  );
};

export default UserHeader;
