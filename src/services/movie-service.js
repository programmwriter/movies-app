export default class MovieService {
  _apiUrl = 'https://api.themoviedb.org/3/';
  _apiImgUrl = 'https://image.tmdb.org/t/p/w200'

  _apiKey = "api_key=ecf3c5005e3bff24ebd3d04c9fd02572&";


  async request(url) {
    const res = await fetch(url);

    if(!res.ok){
      throw new Error(`Error in in function getMovies ${res.status}`);
    }

    return await res.json();
  }

  async getMoviesByKeyword(keyword){

    const res = await this.request(`${this._apiUrl}search/keyword?${this._apiKey}&query=${keyword}&page=1`);

    return res.results;
  }

  async getMovieById(id){

    const response = await this.request(`${this._apiUrl}movie/${id}?${this._apiKey}`);

    const res ={
      originalTitle:response.original_title,
      releaseDate:response.release_date,
      genres:response.genres,
      overview:response.overview,
      imgUrl:`${this._apiImgUrl}${response.poster_path}`
    }

    return res;
  }
  async getMovieImage(id){

    const response = await this.request(`${this._apiUrl}movie/${id}?${this._apiKey}`);
    const path = response.poster_path;
    
    return `${this._apiImgUrl}${path}`;
  }

  // async getMoviesList(){

  //   const moviesList = [];

  //   this.getMoviesByKeyword('return').then(movies => {
  //     const arrOfPromisses =  movies.map(movie =>{
        
  //       return this.getMovieById(movie.id);
  //     })
  //     console.log(arrOfPromisses);
  //     Promise.all(arrOfPromisses).then(arr => {
  //       console.log(`fffffff ${arr}`);
  //     });

  //   });

  //   return moviesList;
  // }

}