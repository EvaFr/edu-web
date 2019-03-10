import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import Button from '../../components/Button';

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

const renderExercise = exercises => {
  return exercises.map(exercise => {
    switch (exercise.type) {
      case 'definition':
        return <p key={exercise.id}>{exercise.title}</p>;
      case 'content':
        return <p key={exercise.id}>{exercise.title}</p>;
      case 'example':
        return (
          <div key={exercise.id}>
            <h1>{exercise.title}</h1>
            {exercise.LABELS.map(label => (
              <div
                key={label.id}
                style={{
                  position: 'relative',
                  width: `${label.width}px`,
                  height: `${label.height}px`
                }}
              >
                {label.iLabels.map(iLabel => (
                  <span
                    key={iLabel.id}
                    style={{
                      fontSize: `${iLabel.fontSize}px`,
                      left: `${iLabel.topLeftX}px`,
                      position: 'absolute',
                      top: `${iLabel.topLeftY}px`
                    }}
                  >
                    {iLabel.value}
                  </span>
                ))}
              </div>
            ))}
          </div>
        );
      default:
        return JSON.stringify(exercise);
    }
  });
};

const renderPage = pageData => {
  if (!pageData) {
    return <p />;
  }

  return (
    <>
      <Button onClick={() => {}} value="Previous page" />
      <Button onClick={() => {}} value="Next page" />
      <Button onClick={() => {}} value="Go to menu" />
      {renderExercise(pageData.items)}
    </>
  );
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
