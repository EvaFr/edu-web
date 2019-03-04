import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ name, type, label, onChange }) => {
  return (
    <label htmlFor={name}>
      {label}
      <input id={name} type={type} onChange={onChange} />
    </label>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

Input.defaultProps = {
  type: 'text',
  label: ''
};

export default Input;
