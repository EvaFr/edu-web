import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import getRandomInt from '../common/get-randomInt';
import { updateUser, removeUser, getUser } from '../common/session-manager';

const loginAsGuest = (setSessionId, setUserName, setIsLoggingIn) => {
  const sessionId = getRandomInt(0, 20000000).toString();
  fetch(`/api/authentication/login?password=&username=&sessionid=${sessionId}`)
    .then(response => response.json())
    .then(loginData => {
      if (loginData.message === 'OK') {
        updateUser('Guest', sessionId, 'true');
        setSessionId(sessionId);
        setUserName('Guest');
      } else {
        setSessionId(undefined);
      }

      setIsLoggingIn(false);
    });
};

const logout = (sessionId, setSessionId, setIsLoggingOut) => {
  fetch(`/api/authentication/logout?sessionid=${sessionId}`)
    .then(response => response.json())
    .then(() => {
      removeUser();
      setSessionId(undefined);
    });

  setIsLoggingOut(false);
};

const UserHeader = () => {
  const [sessionId, setSessionId] = useState(undefined);
  const [userName, setUserName] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const firstLogin = useRef(true);
  const firstLogout = useRef(true);

  const onLoginAsGuest = () => setIsLoggingIn(true);
  const onLogout = () => setIsLoggingOut(true);

  useEffect(() => {
    const user = getUser();
    setSessionId(user.sessionId);
    setUserName(user.userName);
  }, []);

  useEffect(() => {
    if (firstLogin.current) {
      firstLogin.current = false;
      return;
    }

    loginAsGuest(setSessionId, setUserName, setIsLoggingIn);
  }, [isLoggingIn]);

  useEffect(() => {
    if (firstLogout.current) {
      firstLogout.current = false;
      return;
    }

    logout(sessionId, setSessionId, setIsLoggingOut);
  }, [isLoggingOut]);

  if (sessionId) {
    return (
      <Nav className="ml-auto">
        <Nav.Link className="nav-link">{userName}</Nav.Link>
        <Nav.Link className="nav-link" onClick={onLogout}>
          Logout
        </Nav.Link>
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
