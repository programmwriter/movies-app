import React from "react";
import PropTypes from "prop-types";
import { format } from 'date-fns'
import "./_movie.scss";

import { Card } from "antd";

const { Meta } = Card;

const cropText = (text) => {
  let str = text.slice(0, 207);
  const array = str.split(" ");
  array.splice(array.length - 1, 1);
  str = array.join(" ");
  return `${str}...`;
};

const Movie = ({ movie }) => {
  const { originalTitle, imgUrl, overview, releaseDate, genres } = movie;

  return (
    <Card
      className="movie"
      style={{ width: 454, display: "flex" }}
      cover={<img alt="poster" className="movie__cover" src={imgUrl} />}
    >
      <Meta title={originalTitle} description={format(new Date(releaseDate), 'MMMM dd, yyyy')} />
      <div className="movie__genres">
        <div className="movie__genre">{genres[0].name}</div>
      </div>
      <div className="movie__description">
      {cropText(overview)}
      </div>
      {/* <Meta className="movie__description" style={{ color:'black' }} description={cropText(overview)} /> */}
    </Card>
  );
};

Movie.propTypes = {
  movie: PropTypes.shape({
    originalTitle: PropTypes.string,
    imgUrl: PropTypes.string,
    overview: PropTypes.string,
    releaseDate: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default Movie;
