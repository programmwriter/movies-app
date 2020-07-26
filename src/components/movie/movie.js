import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import "./_movie.scss";
import { Card, Rate } from "antd";

import {GenresConsumer} from '../genres-context';


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
    original_title:originalTitle = "title",
    poster_path:imgUrl,
    overview = "overview",
    release_date:releaseDate = "2003-02-25",
    genre_ids:genres = [{ name: "genre" }, { name: "genre" }],
    vote_average:voteAverage = 0,
  } = movie;

  return (
    <Card
      className="movie"
      style={{ width: 454, display: "flex" }}
      cover={<img alt="poster" className="movie__cover" src={imgUrl?`https://image.tmdb.org/t/p/w200${imgUrl}`:"https://image.tmdb.org/t/p/w200/8QGF0PtMlTK1cU30WjNItVbO1Jd.jpg"} />}
    >
      <Meta
        title={cropText(originalTitle, 23)}
        description={releaseDate? format(new Date(releaseDate), "MMMM dd, yyyy"): null}
      />
      <div className="movie__vote">{voteAverage}</div>
     
      <div className="movie__genres">
      <GenresConsumer>
        {(genresList) => {
          
          const genresView = genres.map((genreId) => {
            // const name = genresList.filter(item => item.id === genreId)
            let genre = '';


            for (const item in genresList){
              
              if (item.id === genreId){
                genre = item.name;
              }
              
            }

          return (<div className="movie__genre">{genre}</div>)
          });
          return(
            genresView
          )
        }}
    </GenresConsumer>
        {/* <div className="movie__genre">{genres[0]?genres[0].name : null}</div> */}
      </div>
      <div className="movie__description">{cropText(overview, 200)}</div>
      <Rate count = {10} allowHalf style={{ fontSize: 15 }}/>
    </Card>
  );
};



Movie.propTypes = {
  movie: PropTypes.shape({
    id:PropTypes.number,
    original_title: PropTypes.string,
    poster_path: PropTypes.string,
    overview: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
    genre_ids: PropTypes.arrayOf(PropTypes.number),
  }),
};

Movie.defaultProps = {
  movie: {
    id:8965,
    release_date: "2003-02-25",
    original_title: "originalTitle",
    genres: [{ name: "genre" }],
    overview: "overview",
    vote_average: 0,
    poster_path: "/c9siOypFgzsKL4LQI1d3EkDN6U3.jpg",
  },
};

export default Movie;
