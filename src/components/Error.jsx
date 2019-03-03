import React from 'react';
import PropTypes from 'prop-types';

const Error = props => {
  const { error } = props;

  if (!error) {
    return <p />;
  }

  if (process.env.NODE_ENV === 'production') {
    return (
      <>
        An error occured while loading this page. The error is logged and we
        will fix it ASAP!
      </>
    );
  }

  return (
    <>
      <p>Error: {error.name}</p>
      <p>Message: {error.message}</p>
      <p>Stack: {error.stack}</p>
    </>
  );
};

Error.propTypes = {
  error: PropTypes.shape({
    name: PropTypes.string,
    message: PropTypes.string,
    stack: PropTypes.string
  })
};

Error.defaultProps = {
  error: null
};

export default Error;
