import React from "react";
import PropTypes from "prop-types";
import "./_genres.scss";

import { GenresConsumer } from "../genresContext";

const Genres = ({ genres }) => {
  return (
    <div className="genres">
      <GenresConsumer>
        {() => {
          // {(genresList) => {
          const [first, second] = genres.map((genreId, idd) => {
            // const [one] = genresList.filter((item) => item.id === genreId);
            // const { id, name } = one;

            return (
              <div key={`${idd * 3}`} className="genres__item">
                {/* {name} */}
                {"name"}
              </div>
            );
          });

          return (
            <>
              {first}
              {second}
            </>
          );
        }}
      </GenresConsumer>
    </div>
  );
};

Genres.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Genres;
