import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import getRandomInt from '../../common/get-randomInt';
import Error from '../../components/Error';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import { updateUser } from '../../common/session-manager';

const isValid = (userName, password) => {
  if (
    userName != null &&
    userName.length > 0 &&
    password != null &&
    password.length > 0
  ) {
    return true;
  }

  return false;
};

const login = (
  userName,
  password,
  setError,
  setLoginResponse,
  setLoading,
  setSessionId
) => {
  if (!isValid(userName, password)) {
    return;
  }

  const sessionId = getRandomInt(0, 20000000).toString();
  const url = `/api/authentication/login?password=${password}&username=${userName}&sessionid=${sessionId}`;

  setLoading(true);
  fetch(url)
    .then(response => response.json())
    .then(json => {
      if (json.message === 'OK') {
        updateUser(userName, sessionId, false);
        setSessionId(sessionId);
      } else {
        setSessionId(null);
      }

      setLoading(false);
      setLoginResponse(json);
    })
    .catch(error => {
      updateUser('', undefined, false);
      setError(error);
      setLoading(false);
    });
};

const showLoginResponse = loginResponse => {
  if (!loginResponse) {
    return <p />;
  }

  return <>{loginResponse.message}</>;
};

const Login = ({ setSessionId, userName, setUserName }) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loginResponse, setLoginResponse] = useState(null);

  if (loginResponse && loginResponse.message === 'OK') {
    return <Redirect to="/" />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <>
      <Input
        name="userName"
        type="text"
        label="User name:"
        onChange={event => setUserName(event.target.value)}
      />

      <Input
        name="password"
        type="password"
        label="Password:"
        onChange={event => setPassword(event.target.value)}
      />

      <Button
        value="Login"
        onClick={() =>
          login(
            userName,
            password,
            setError,
            setLoginResponse,
            setLoading,
            setSessionId
          )
        }
      />

      <Loader loading={loading} />
      {showLoginResponse(loginResponse)}
    </>
  );
};

Login.propTypes = {
  setSessionId: PropTypes.func.isRequired,
  userName: PropTypes.string,
  setUserName: PropTypes.func.isRequired
};

Login.defaultProps = {
  userName: ''
};

export default Login;
