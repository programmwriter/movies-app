import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Pagination } from "antd";
import MoviesList from "../moviesList";
import Search from "../search";
import "./_moviesView.scss";
import MovieService from "../../services/movieService";

const moviesServ = new MovieService();

const MoviesView = ({ guestSessionId }) => {
  // const {
  //   moviesList,
  //   totalResults,
  //   onChangePage,
  //   currentPage,
  //   rateMovie,
  // } = props;
  const [moviesList, setMoviesList] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState(1);
  // const [err, setErr] = useState(false);

  const searchMovies = async (queryWord, pageNumber = 1) => {
    try {
      const {
        moviesByKeyWord: movies,
        totalResults: total,
        page,
      } = await moviesServ.getMoviesByKeyword(queryWord, pageNumber);

      setMoviesList(movies);
      setTotalResults(total);
      setCurrentPage(page);
      // this.setState(() => {
      //   return {
      //     moviesList: movies,
      //     totalResults,
      //     currentPage: page,
      //     loading: false,
      //   };
      // });
    } catch (error) {
      // setErr(true);
      // this.onError();
    }
  };

  useEffect(() => {
    searchMovies();
  }, []);

  const onChangeKeyword = (newKeyword) => {
    searchMovies(newKeyword);
    setKeyword(newKeyword);
    setCurrentPage(1);
    // setErr(false);
  };

  const rateMovie = async (movieId, data) => {
    try {
      await moviesServ.rateMovieById(movieId, guestSessionId, data);
    } catch (error) {
      // setErr(true);
      // this.onError();
    }
  };

  const onChangePage = (page) => {
    searchMovies(keyword, page);
  };

  return (
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
  );
};

MoviesView.propTypes = {
  guestSessionId: PropTypes.string.isRequired,
};

export default MoviesView;
