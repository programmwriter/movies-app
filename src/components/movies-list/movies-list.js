import React from "react";
import PropTypes from "prop-types";
import "./_movies-list.scss";

import { v4 as uuidv4 } from "uuid";
// import { Row, Col, Space } from "antd";
import Movie from "../movie";

// const { Meta } = Card;

const MoviesList = ({ moviesList }) => {
  const renderMovies = moviesList.map((movie) => {
    return (
      // <Row key={uuidv4()}>
      //   <Col span={24}>
      //     <Movie movie = { movie }/>
      //   </Col>
      // </Row>

      <Movie key={uuidv4()} movie={movie} />
    );
  });
  return <>{renderMovies}</>;
};

MoviesList.propTypes = {
  moviesList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MoviesList;
