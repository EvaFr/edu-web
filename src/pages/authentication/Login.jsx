import React, { useState, useEffect } from 'react';
import getRandomInt from './get-randomInt';
import Error from '../../components/Error';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loader from '../../components/Loader';

const isValid = ({ userName, password }) => {
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
  { userName, password },
  setError,
  setLoginResponse,
  setLoading
) => {
  const sessionId = getRandomInt(0, 20000000).toString();
  const url = `/api/authentication/login?password=${password}&username=${userName}&sessionid=${sessionId}`;

  setLoading(true);
  fetch(url)
    .then(response => response.json())
    .then(json => {
      setLoginResponse(json);
      setLoading(false);
    })
    .catch(error => {
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

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginData, setLoginData] = useState({
    userName: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loginResponse, setLoginResponse] = useState(null);
  useEffect(() => {
    if (isValid(loginData)) {
      login(loginData, setError, setLoginResponse, setLoading);
    }
  }, [loginData]);

  const onSubmit = () => {
    setLoginData({ userName, password });
  };

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

      <Button value="Login" onClick={onSubmit} />

      <Loader loading={loading} />
      {showLoginResponse(loginResponse)}
    </>
  );
};

export default Login;
