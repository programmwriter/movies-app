import React, { Component } from "react";
import "antd/dist/antd.css";
import "./app.css";
import MovieService from "../../services/movie-service";
import MoviesList from "../movies-list";

const moviesServ = new MovieService();

export default class App extends Component {
  state = {
    moviesList: [],
  };

  async componentDidMount() {
    const movies = await moviesServ.getMoviesList("return");

    movies.forEach((movie) => {
      if (movie.status === "fulfilled") {
        this.setState(({ moviesList }) => {
          const newMoviesList = [...moviesList, movie.value];
          return { moviesList: newMoviesList };
        });
      }
    });
  }

  render() {
    const { moviesList } = this.state;

    return (
      <div className="app">
        <MoviesList moviesList={moviesList} />
      </div>
    );
  }
}
