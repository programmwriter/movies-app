import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MovieService from "../../services/movieService";

import "./_RatedMoviesList.scss";

import Movie from "../movie";

const moviesServ = new MovieService();
// const RatedMoviesList = ({ moviesList, rateMovie }) => {
const RatedMoviesList = ({ guestSessionId, changeLoading }) => {
  const [moviesList, setMoviesList] = useState([]);
  // const [totalResults, setTotalResults] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);

  const searchRatedMovies = async () => {
    try {
      const {
        ratedMovies: movies,
        // totalResults:total,
        // page,
      } = await moviesServ.getRatedMovies(guestSessionId);

      setMoviesList(movies);
      // setTotalResults(total);
      // setCurrentPage(page)
      changeLoading();
    } catch (error) {
      // this.onError();
    }
  };
  useEffect(() => {
    searchRatedMovies();
  });

  // useEffect(() => {
  //   searchRatedMovies()
  //   return () => {
  //     cleanup
  //   }
  // }, [input]);
  const renderMovies = moviesList.map((movie) => {
    return <Movie key={`${movie.id}${movie.popularity}`} movie={movie} />;
  });
  return <>{renderMovies}</>;
};

RatedMoviesList.propTypes = {
  guestSessionId: PropTypes.string.isRequired,
  changeLoading: PropTypes.func.isRequired,
};

export default RatedMoviesList;
