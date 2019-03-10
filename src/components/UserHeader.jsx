import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import getRandomInt from '../common/get-randomInt';
import { updateUser, removeUser, getUser } from '../common/session-manager';

const loginAsGuest = (setSessionId, setUserName) => {
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
    });
};

const logout = (sessionId, setSessionId) => {
  fetch(`/api/authentication/logout?sessionid=${sessionId}`)
    .then(response => response.json())
    .then(() => {
      removeUser();
      setSessionId(undefined);
    });
};

const UserHeader = ({ sessionId, setSessionId, userName, setUserName }) => {
  useEffect(() => {
    const user = getUser();
    setSessionId(user.sessionId);
    setUserName(user.userName);
  }, []);

  if (sessionId) {
    return (
      <Nav className="ml-auto">
        <Nav.Link className="nav-link">{userName}</Nav.Link>
        <Nav.Link
          className="nav-link"
          onClick={() => logout(sessionId, setSessionId)}
        >
          Logout
        </Nav.Link>
      </Nav>
    );
  }

  return (
    <Nav className="ml-auto">
      <Nav.Link
        className="nav-link"
        onClick={() => loginAsGuest(setSessionId, setUserName)}
      >
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

UserHeader.propTypes = {
  sessionId: PropTypes.string,
  setSessionId: PropTypes.func.isRequired,
  userName: PropTypes.string,
  setUserName: PropTypes.func.isRequired
};

UserHeader.defaultProps = {
  sessionId: null,
  userName: ''
};

export default UserHeader;
