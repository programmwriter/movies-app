import React from "react";
import PropTypes from "prop-types";
import "./_moviesList.scss";

import Movie from "../movie";

const MoviesList = ({ moviesList, rateMovie }) => {
  const renderMovies = moviesList.map((movie) => {
    return (
      <Movie
        key={`${movie.id}${movie.popularity}`}
        movie={movie}
        rateMovie={rateMovie}
      />
    );
  });
  return <>{renderMovies}</>;
};

MoviesList.propTypes = {
  moviesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  rateMovie: PropTypes.func.isRequired,
};

export default MoviesList;
