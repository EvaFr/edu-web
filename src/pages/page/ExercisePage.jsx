import React from 'react';
import PropTypes from 'prop-types';

const ExercisePage = ({ match }) => {
  return (
    <p>
      Page for book {match.params.book}, part {match.params.part}, page{' '}
      {match.params.page}
    </p>
  );
};

ExercisePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      book: PropTypes.node,
      part: PropTypes.node,
      page: PropTypes.node
    })
  }).isRequired
};

export default ExercisePage;
