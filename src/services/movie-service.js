export default class MovieService {
  apiUrl = "https://api.themoviedb.org/3/";

  apiImgUrl = "https://image.tmdb.org/t/p/w200";

  apiKey = "api_key=ecf3c5005e3bff24ebd3d04c9fd02572";

  async request(url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error in in function getMovies ${response.status}`);
    }

    const requestResult = await response.json();

    return requestResult;
  }

  async getMoviesByKeyword(keyword) {
    const res = await this.request(
      `${this.apiUrl}search/movie?${this.apiKey}&query=${keyword}&page=1&include_adult=false`
    );

    return res.results;
  }

  async getMovieById(id) {
    const response = await this.request(
      `${this.apiUrl}movie/${id}?${this.apiKey}`
    );

    const res = {
      originalTitle: response.original_title,
      releaseDate: response.release_date,
      genres: response.genres,
      overview: response.overview,
      imgUrl: `${this.apiImgUrl}${response.poster_path}`,
    };

    return res;
  }

  async getMoviesList(keyword) {
    const movieByKeyWord = await this.getMoviesByKeyword(keyword);

    const moviesPromisses = movieByKeyWord.map((movie) => {
      return this.getMovieById(movie.id);
    });
    const movies = await Promise.allSettled(moviesPromisses);

    return movies;
  }
}
