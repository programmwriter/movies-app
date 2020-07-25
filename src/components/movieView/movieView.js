import React from 'react';
import PropTypes from "prop-types";
import { Pagination} from "antd";
import MoviesList from "../movies-list";


const MovieView = (props) => {
  const { moviesList, totalResults, onChangePage,currentPage } = props;

  return (
    <>
      <div className="movies">
        <MoviesList moviesList={moviesList} />
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

MovieView.propTypes = {
  moviesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalResults: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};

export default MovieView;