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

  async getMoviesByKeyword(keyword = "return", page = 1) {
    const res = await this.request(
      `${this.apiUrl}search/movie?${this.apiKey}&query=${keyword}&page=${page}&include_adult=true`
    );
    const { results: movieByKeyWord, total_results: totalResults } = res;
    return {
      movieByKeyWord,
      totalResults,
    };
  }

  async getMovieById(id) {
    const response = await this.request(
      `${this.apiUrl}movie/${id}?${this.apiKey}`
    );

    const { original_title:originalTitle,
            release_date:releaseDate ,
            genres,
            overview,
            poster_path:posterPath,
            vote_average:voteAverage,

    } = response;

    const res = {
      originalTitle,
      releaseDate,
      genres,
      overview,
      voteAverage,
      imgUrl: `${this.apiImgUrl}${posterPath}`,
    };

    return res;
  }

  async getMoviesList(keyword, page = 1) {
    const {totalResults, movieByKeyWord} = await this.getMoviesByKeyword(keyword, page);

    const moviesPromisses = movieByKeyWord.map((movie) => {
      return this.getMovieById(movie.id);
    });
    const movies = await Promise.allSettled(moviesPromisses);

    const listOfResults = movies.map((movie) => {
      return movie.status === "fulfilled" ? movie.value : false;
    });

    return {listOfResults, totalResults };
  }
}
