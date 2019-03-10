import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ loading }) => {
  return loading ? <p>Loader...</p> : <p />;
};

Loader.propTypes = {
  loading: PropTypes.bool
};

Loader.defaultProps = {
  loading: undefined
};

export default Loader;
