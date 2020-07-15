import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./movies-list.css";
import PropTypes from 'prop-types';

import { Row, Col, Card } from "antd";

const { Meta } = Card;

 
  const MoviesList = ({ moviesList }) =>{

    

    const renderMovies = moviesList.map((movie) => {

      const { originalTitle, imgUrl, overview, releaseDate, genres } = movie;
      return (
        <Row key={uuidv4()}>
          <Col span={24}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src={imgUrl} />}
            >
              <Meta title={originalTitle} description={overview} />
              <Meta title={releaseDate} description={genres[0].name} />
            </Card>
          </Col>
        </Row>
      );
    });
    return <>{renderMovies}</>;
  
}

MoviesList.propTypes = {
  moviesList: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default  MoviesList;