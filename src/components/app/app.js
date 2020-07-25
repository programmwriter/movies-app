import React, { Component } from "react";
import {  Spin } from "antd";
import MovieService from "../../services/movie-service";
import Filter from "../filter";
import Search from "../search";
import ErrorView from '../errorView';
import MovieView from '../movieView';

import "antd/dist/antd.css";
import "./_app.scss";

const moviesServ = new MovieService();

export default class App extends Component {
  state = {
    moviesList: [],
    keyword: "return",
    totalResults: 0,
    currentPage:1,
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
    this.setState({ keyword, currentPage:1});
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

  async searchMovies(keyword, pageNumber = 1) {
    try {
      const {
        listOfResults: movies,
        totalResults,
        page,
      } = await moviesServ.getMoviesList(keyword, pageNumber);

      this.setState(() => {
        return { moviesList: movies, totalResults, currentPage:page,  loading: false };
      });
    } catch (error) {
      this.onError();
    }
  }

  render() {
    const { moviesList, 
            totalResults,
            currentPage, 
            loading, 
            err } = this.state;

    const hasData = !(loading || err || !totalResults);
    const hasError = ((!totalResults|| err)&& !loading);
    const errorView = hasError ? (
      <ErrorView  totalResults = {totalResults}
                  err = {err}
      />      
    ) : null;

    const spinnerView = loading ? (
      <Spin className="app__spinner" tip="Loading..." size="large" />
    ) : null;

    const contentView = hasData ? (
      <MovieView
        moviesList={moviesList}
        totalResults={totalResults}
        currentPage={currentPage}
        onChangePage={this.onChangePage}
      />
    ) : null;

    return (
      <div className="app">
        <div className="app__box">
          <Filter />
          <Search onChangeKeyword={this.onChangeKeyword} />
          {errorView}
          {spinnerView}
          {contentView}
        </div>
      </div>
    );
  }
}
