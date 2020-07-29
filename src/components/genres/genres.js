import React from 'react';
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import './_genres.scss';

import {GenresConsumer} from '../genres-context';

const Genres = ({genres}) => {

  return(
    <div className="genres">
        <GenresConsumer>
          {(genresList) => {
            
            const [first, second] = genres.map((genreId) => {
              const [one] = genresList.filter(item => item.id === genreId)
              const { name } = one;
              return (<div key={uuidv4()}   className="genres__item">{name}</div>)
            });

            return(
              <>
                {first}
                {second}
              </>
            )
          }}
        </GenresConsumer>
      </div>
  )
}

Genres.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default Genres;
