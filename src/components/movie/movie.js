import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import "./_movie.scss";

import { Card, Rate } from "antd";

const { Meta } = Card;

const cropText = (text, maxLength = 1000) => {
  if (text.length <= maxLength) {
    return text;
  }

  let str = text.slice(0, maxLength);
  const array = str.split(" ");
  array.splice(array.length - 1, 1);
  str = array.join(" ");
  return `${str}...`;
};

const Movie = ({ movie }) => {
  const {
    originalTitle = "title",
    imgUrl = "https://image.tmdb.org/t/p/w200/c9siOypFgzsKL4LQI1d3EkDN6U3.jpg",
    overview = "overview",
    releaseDate = "2003-02-25",
    genres = [{ name: "genre" }, { name: "genre" }],
    voteAverage,
  } = movie;

  return (
    <Card
      className="movie"
      style={{ width: 454, display: "flex" }}
      cover={<img alt="poster" className="movie__cover" src={imgUrl} />}
    >
      <Meta
        title={cropText(originalTitle, 23)}
        description={releaseDate? format(new Date(releaseDate), "MMMM dd, yyyy"): null}
      />
      <div className="movie__vote">{voteAverage}</div>
      <div className="movie__genres">
        <div className="movie__genre">{genres[0]?genres[0].name : null}</div>
      </div>
      <div className="movie__description">{cropText(overview, 200)}</div>
      <Rate count = {10} allowHalf style={{ fontSize: 15 }}/>
    </Card>
  );
};

Movie.propTypes = {
  movie: PropTypes.shape({
    originalTitle: PropTypes.string,
    imgUrl: PropTypes.string,
    overview: PropTypes.string,
    releaseDate: PropTypes.string,
    voteAverage: PropTypes.number,
    genres: PropTypes.arrayOf(PropTypes.object),
  }),
};

Movie.defaultProps = {
  movie: {
    releaseDate: "2003-02-25",
    originalTitle: "originalTitle",
    genres: [{ name: "genre" }],
    overview: "overview",
    voteAverage: 0,
    imgUrl: "https://image.tmdb.org/t/p/w200/c9siOypFgzsKL4LQI1d3EkDN6U3.jpg",
  },
};

export default Movie;
