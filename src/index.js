import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
// import MovieService from './services/movie-service';

// const movies = new MovieService();
// const classof = function(object){
// 	return Object.prototype.toString.call(object).slice(8,-1);
// }
// movies.getMovieById(550).then(movies => {
//   console.log(movies);
// })
// movies.getMoviesByKeyword('return').then(movies => {
//   console.log(classof(movies));

//   movies.map(element => {
//     console.log(element.id);
//   });

// })
// movies.getMoviesList().then(res => {
//   console.log(res);
// })
// movies.getMoviesList().then(movies => {
//   console.log(movies);
// })

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

