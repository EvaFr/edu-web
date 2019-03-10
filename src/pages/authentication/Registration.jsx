import React, { useState } from 'react';
import getRandomInt from '../../common/get-randomInt';
import Error from '../../components/Error';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loader from '../../components/Loader';

const isValid = (userName, password, confirmPassword) => {
  if (
    userName != null &&
    userName.length > 0 &&
    password != null &&
    password.length > 0 &&
    password === confirmPassword
  ) {
    return true;
  }

  return false;
};

const register = (
  userName,
  password,
  confirmPassword,
  setError,
  setRegistrationResponse,
  setLoading
) => {
  if (!isValid(userName, password, confirmPassword)) {
    return;
  }

  const sessionId = getRandomInt(0, 20000000).toString();
  const url = `/api/authentication/register?password=${password}&username=${userName}&sessionid=${sessionId}`;

  setLoading(true);
  fetch(url)
    .then(response => response.json())
    .then(json => {
      setRegistrationResponse(json);
      setLoading(false);
    })
    .catch(error => {
      setError(error);
      setLoading(false);
    });
};

const showRegistrationResponse = registrationResponse => {
  if (!registrationResponse) {
    return <p />;
  }

  return <>{registrationResponse.message}</>;
};

const Registration = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [registrationResponse, setRegistrationResponse] = useState(null);

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

      <Input
        name="confirmPassword"
        type="password"
        label="Confirm password:"
        onChange={event => setConfirmPassword(event.target.value)}
      />

      <Button
        value="Register"
        onClick={() =>
          register(
            userName,
            password,
            confirmPassword,
            setError,
            setRegistrationResponse,
            setLoading
          )
        }
      />

      <Loader loading={loading} />
      {showRegistrationResponse(registrationResponse)}
    </>
  );
};

export default Registration;
