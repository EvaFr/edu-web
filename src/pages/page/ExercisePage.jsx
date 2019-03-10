import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loader from '../../components/Loader';
import Error from '../../components/Error';

const getPage = (
  sessionId,
  book,
  part,
  page,
  setLoading,
  setError,
  setPageData
) => {
  if (!sessionId) {
    return;
  }

  const url = `/api/book/page?partId=${part}&pageId=${page}&itemId=-1&sessionId=11682319&bookId=${book}`;

  setLoading(true);
  fetch(url)
    .then(response => response.json())
    .then(json => {
      setPageData(json);
      setLoading(false);
    })
    .catch(error => {
      setError(error);
      setLoading(false);
    });
};

const renderPage = pageData => {
  return <p>{JSON.stringify(pageData)}</p>;
};

const ExercisePage = ({ match, sessionId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    getPage(
      sessionId,
      match.params.book,
      match.params.part,
      match.params.page,
      setLoading,
      setError,
      setPageData
    );
  }, [sessionId]);

  return (
    <>
      <Loader loading={loading} />
      {error ? <Error error={error} /> : renderPage(pageData)}
    </>
  );
};

ExercisePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      book: PropTypes.node,
      part: PropTypes.node,
      page: PropTypes.node
    })
  }).isRequired,
  sessionId: PropTypes.string
};

ExercisePage.defaultProps = {
  sessionId: ''
};

export default ExercisePage;
