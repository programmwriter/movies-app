import React, { Component } from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import "./_app.scss";
import { Pagination, Spin, Result } from "antd";
import MovieService from "../../services/movie-service";
import Filter from "../filter";
import MoviesList from "../movies-list";
import Search from "../search";

const moviesServ = new MovieService();

export default class App extends Component {
  state = {
    moviesList: [],
    keyword: "return",
    totalResults: 1,
    loading: true,
    err: false,
  };

  async componentDidMount() {
    const { movieList, keyword } = this.state;
    if (!movieList) {
      this.searchMovies(keyword);
    }
  }

  onChangeKeyword = (keyword) => {
    this.searchMovies(keyword);
    this.setState({ keyword });
  };

  onChangePage = (page) => {
    const { keyword } = this.state;
    this.searchMovies(keyword, page);
  };

  onError = () => {
    this.setState({
      err: true,
      loading: false,
    });
  };

  async searchMovies(keyword, page = 1) {
    try {
      const {
        listOfResults: movies,
        totalResults,
      } = await moviesServ.getMoviesList(keyword, page);

      this.setState(() => {
        return { moviesList: movies, totalResults, loading: false };
      });
    } catch (error) {
      this.onError();
    }
  }

  render() {
    const { moviesList, totalResults, loading, err } = this.state;

    const hasData = !(loading || err);
    const errorMsg = err ? (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, you have problem with network."
      />
    ) : null;
    const spinner = loading ? (
      <Spin className="app__spinner" tip="Loading..." size="large" />
    ) : null;
    const content = hasData ? (
      <MovieView
        moviesList={moviesList}
        totalResults={totalResults}
        onChangePage={this.onChangePage}
      />
    ) : null;

    return (
      <div className="app">
        <div className="app__box">
          <Filter />
          <Search onChangeKeyword={this.onChangeKeyword} />
          {errorMsg}
          {spinner}
          {content}
        </div>
      </div>
    );
  }
}

const MovieView = (props) => {
  const { moviesList, totalResults, onChangePage } = props;

  return (
    <>
      <div className="movies">
        <MoviesList moviesList={moviesList} />
      </div>
      <div className="pagination">
        <Pagination
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

MovieView.propTypes = {
  moviesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalResults: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};
