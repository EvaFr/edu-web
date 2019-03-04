import React, { useState, useEffect } from 'react';
import Error from '../../components/Error';

export const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

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

const login = ({ userName, password }, setError, setLoginResponse) => {
  const sessionId = getRandomInt(0, 20000000).toString();
  const url = `/api/authentication/login?password=${password}&username=${userName}&sessionid=${sessionId}`;

  fetch(url)
    .then(response => response.json())
    .then(json => setLoginResponse(json))
    .catch(error => setError(error));
};

const showLoader = loading => (loading ? <p>Loading</p> : <p />);

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
      setLoading(true);
      login(loginData, setError, setLoginResponse);
      setLoading(false);
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
      <label htmlFor="userName">
        User name:
        <input
          id="userName"
          type="text"
          onChange={event => setUserName(event.target.value)}
        />
      </label>

      <label htmlFor="password">
        Password:
        <input
          id="password"
          type="password"
          onChange={event => setPassword(event.target.value)}
        />
      </label>

      <input type="submit" onClick={onSubmit} />

      {showLoader(loading)}
      {showLoginResponse(loginResponse)}
    </>
  );
};

export default Login;
