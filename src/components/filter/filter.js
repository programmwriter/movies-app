import React from "react";
import "./_filter.scss";

const Filter = () => {
  return (
    <div className="filter">
      <div className="filter__list">
        <div className="filter__item filter__item--active">
          <a href="/dfdf" className="filter__link filter__link--active">
            Search
          </a>
        </div>
        <div className="filter__item">
          <a href="/dfdf" className="filter__link">
            Rated
          </a>
        </div>
      </div>
    </div>
  );
};

export default Filter;
