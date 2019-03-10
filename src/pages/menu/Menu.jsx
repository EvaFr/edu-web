import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loader from '../../components/Loader';
import Error from '../../components/Error';

const getMenu = (sessionId, bookId, setLoading, setError, setMenuData) => {
  if (!sessionId) {
    return;
  }

  const url = `/api/Book/Menu?sessionId=${sessionId}&bookId=${bookId}`;

  setLoading(true);
  fetch(url)
    .then(response => response.json())
    .then(json => {
      setMenuData(json);
      setLoading(false);
    })
    .catch(error => {
      setError(error);
      setLoading(false);
    });
};

const Menu = ({ match, sessionId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [menuData, setMenuData] = useState(null);

  useEffect(() => {
    getMenu(sessionId, match.params.id, setLoading, setError, setMenuData);
  }, [sessionId]);

  return (
    <>
      <Loader loading={loading} />
      {error ? <Error error={error} /> : <p>{JSON.stringify(menuData)}</p>}
    </>
  );
};

Menu.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node
    })
  }).isRequired,
  sessionId: PropTypes.string
};

Menu.defaultProps = {
  sessionId: ''
};

export default Menu;
