import React from 'react';
import PropTypes from 'prop-types';

const MovieFooter = (props) => {
  const { totalMovies } = props;

  return (
    <div className="clearfix footer">
      <div className="hint-text">Showing <b>{totalMovies}</b> entries</div>
    </div>
  );
}

MovieFooter.propTypes = {
  totalMovies: PropTypes.number.isRequired
};

export default MovieFooter;

