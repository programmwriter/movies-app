import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Pagination, Spin } from "antd";
import MoviesList from "../moviesList";
import ErrorView from "../errorView";
import "./_ratedMoviesView.scss";
import MovieService from "../../services/movieService";

const moviesServ = new MovieService();

const RatedMoviesView = ({ guestSessionId, loadingGenres }) => {
  const [moviesList, setMoviesList] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(true);

  const searchRatedMovies = async () => {
    try {
      const {
        ratedMovies: movies,
        totalResults: total,
        page,
      } = await moviesServ.getRatedMovies(guestSessionId);
      setMoviesList(movies);
      setTotalResults(total);
      setCurrentPage(page);
      setLoading(false);
    } catch (error) {
      setErr(true);
    }
  };

  useEffect(() => {
    searchRatedMovies();
  }, []);

  const hasData = !(loading || loadingGenres || err || !totalResults);

  const hasError = (!totalResults || err) && !loading && !loadingGenres;

  const errorView = hasError ? (
    <ErrorView totalResults={totalResults} err={err} />
  ) : null;

  const spinnerView = loading ? (
    <Spin className="app__spinner" tip="Loading..." size="large" />
  ) : null;

  const contentView = hasData ? (
    <>
      <div className="movies">
        <MoviesList moviesList={moviesList} />
      </div>
      <div className="pagination">
        <Pagination
          current={currentPage}
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

RatedMoviesView.propTypes = {
  guestSessionId: PropTypes.string.isRequired,
  loadingGenres: PropTypes.bool.isRequired,
};

export default RatedMoviesView;
