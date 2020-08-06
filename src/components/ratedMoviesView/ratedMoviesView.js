import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Pagination } from "antd";
import MoviesList from "../moviesList";
import "./_ratedMoviesView.scss";
import MovieService from "../../services/movieService";

// import "./_ratedMoviesList.scss";

const moviesServ = new MovieService();

const RatedMoviesView = ({ guestSessionId }) => {
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
      // this.setState(() => {
      //   return {
      //     moviesList: movies,
      //     totalResults,
      //     currentPage: page,
      //     loading: false,
      //   };
      // });
    } catch (error) {
      // this.onError();
    }
  };

  useEffect(() => {
    searchRatedMovies();
  });
  const rateMovie = async (movieId, data) => {
    try {
      await moviesServ.rateMovieById(movieId, guestSessionId, data);
    } catch (error) {
      // setErr(true);
      // this.onError();
    }
  };

  return (
    <>
      <div className="movies">
        <MoviesList moviesList={moviesList} rateMovie={rateMovie} />
      </div>
      <div className="pagination">
        <Pagination
          current={currentPage}
          // onChange={onChangePage}
          size="small"
          total={totalResults}
          defaultPageSize={20}
          showSizeChanger={false}
        />
      </div>
    </>
  );
};

RatedMoviesView.propTypes = {
  guestSessionId: PropTypes.string.isRequired,
  // totalResults: PropTypes.number.isRequired,
  // currentPage: PropTypes.number.isRequired,
  // onChangePage: PropTypes.func.isRequired,
  // rateMovie: PropTypes.func.isRequired,
};

export default RatedMoviesView;
