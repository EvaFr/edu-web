import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
      setMenuData(json.parts);
      setLoading(false);
    })
    .catch(error => {
      setError(error);
      setLoading(false);
    });
};

const renderSubMenu = subMenuPoints => {
  return subMenuPoints.map(subMenuPoint => (
    <li key={subMenuPoint.id}>{subMenuPoint.TITLE}</li>
  ));
};

const renderMainMenu = menuData => {
  if (!menuData) {
    return <p />;
  }

  return menuData.map(mainMenuPoint => (
    <li key={mainMenuPoint.id}>
      {mainMenuPoint.TITLE}
      <ul>{renderSubMenu(mainMenuPoint.pages)}</ul>
    </li>
  ));
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
      {error ? <Error error={error} /> : <ul>{renderMainMenu(menuData)}</ul>}
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
