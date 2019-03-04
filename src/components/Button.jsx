import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ value, onClick }) => {
  return (
    <button type="button" onClick={onClick}>
      {value}
    </button>
  );
};

Button.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

Button.defaultProps = {
  value: 'Submit'
};

export default Button;
