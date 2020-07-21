import React from "react";
import PropTypes from "prop-types";
import "./_movies-list.scss";

import { v4 as uuidv4 } from "uuid";
import Movie from "../movie";

const MoviesList = ({ moviesList }) => {
  const renderMovies = moviesList.map((movie) => {
    return <Movie key={uuidv4()} movie={movie} />;
  });
  return <>{renderMovies}</>;
};

MoviesList.propTypes = {
  moviesList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MoviesList;
