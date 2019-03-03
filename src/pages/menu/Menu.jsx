import React from 'react';
import PropTypes from 'prop-types';

const Menu = ({ match }) => <h1>Menu: {match.params.id}</h1>;

Menu.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node
    })
  }).isRequired
};

export default Menu;
