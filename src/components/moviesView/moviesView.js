import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Pagination, Spin } from "antd";
import MoviesList from "../moviesList";
import ErrorView from "../errorView";
import Search from "../search";
import "./_moviesView.scss";
import MovieService from "../../services/movieService";

const moviesServ = new MovieService();

const MoviesView = ({ guestSessionId, loadingGenres }) => {
  const [moviesList, setMoviesList] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState(1);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  const searchMovies = async (queryWord, pageNumber = 1) => {
    const getMoviesResponse = await moviesServ.getMoviesByKeyword(
      queryWord,
      pageNumber
    );

    if (getMoviesResponse === "Failed to fetch") {
      setErr("Sorry, you have problem with network");
      setLoading(false);
    } else {
      const { results: movies, total_results: total, page } = getMoviesResponse;
      if (!total) {
        setErr("Sorry, no results were found for your search.");
        setLoading(false);
      } else {
        setMoviesList(movies);
        setTotalResults(total);
        setCurrentPage(page);
        setLoading(false);
        setErr("");
      }
    }
  };

  useEffect(() => {
    searchMovies();
  }, []);

  const onChangeKeyword = (newKeyword) => {
    searchMovies(newKeyword);
    setKeyword(newKeyword);
    setCurrentPage(1);
    setErr(false);
  };

  const rateMovie = async (movieId, data) => {
    try {
      await moviesServ.rateMovieById(movieId, guestSessionId, data);
    } catch (error) {
      setErr("Error with reate this movie");
    }
  };

  const onChangePage = (page) => {
    searchMovies(keyword, page);
  };

  const hasData = !(loading || loadingGenres || err || !totalResults);

  const hasError = (!totalResults || err) && !loading && !loadingGenres;

  const errorView = hasError ? <ErrorView err={err} /> : null;

  const spinnerView = loading ? (
    <Spin className="app__spinner" tip="Loading..." size="large" />
  ) : null;

  const contentView = hasData ? (
    <>
      <Search onChangeKeyword={onChangeKeyword} />
      <div className="movies">
        <MoviesList moviesList={moviesList} rateMovie={rateMovie} />
      </div>
      <div className="pagination">
        <Pagination
          current={currentPage}
          onChange={onChangePage}
          size="small"
          total={totalResults}
          defaultPageSize={20}
          showSizeChanger={false}
        />
      </div>
    </>
  ) : null;

  return (
    <>
      {errorView}
      {spinnerView}
      {contentView}
    </>
  );
};

MoviesView.propTypes = {
  guestSessionId: PropTypes.string.isRequired,
  loadingGenres: PropTypes.bool.isRequired,
};

export default MoviesView;
