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

  async requestPost(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Error in in function getMovies ${response.status}`);
    }
    const requestResult = await response.json();

    return requestResult;
  }

  async getMoviesByKeyword(keyword = "return", pageNumber = 1) {
    const res = await this.request(
      `${this.apiUrl}search/movie?${this.apiKey}&query=${keyword}&page=${pageNumber}&include_adult=false`
    );
    const { results: moviesByKeyWord, total_results: totalResults, page } = res;
    return {
      moviesByKeyWord,
      totalResults,
      page,
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

  async getMoviesList(keyword, pageNumber = 1) {
    const {totalResults, moviesByKeyWord, page} = await this.getMoviesByKeyword(keyword, pageNumber);

    const moviesPromisses = moviesByKeyWord.map((movie) => {
      return this.getMovieById(movie.id);
    });
    const movies = await Promise.allSettled(moviesPromisses);

    const listOfResults = movies.map((movie) => {
      return movie.status === "fulfilled" ? movie.value : false;
    });

    return {listOfResults, totalResults, page };
  }

  async getGenres(){
    const res = await this.request(
      `${this.apiUrl}genre/movie/list?${this.apiKey}&language=en-US`
    );
    
    return res;
  }

  async createGuestSession(){
    const res = await this.request(
      `${this.apiUrl}authentication/guest_session/new?api_key=${this.apiKey}`
    );
    if(!res.success){
      throw new Error('Tern of your addblock');
    }
    return res.guest_session_id;
  }

  async rateMovieById(movieId, guestSessionId, data){
    const res = await this.requestPost(
      `${this.apiUrl}movie/${movieId}/rating?api_key=${this.apiKey}&guest_session_id=${guestSessionId}`,
      data
    );
    if(res.status_code !== 1){
      throw new Error(res.status_message);
    }
    return res.status_message;
  }

  async getRatedMovies(guestSessionId){
    const res = await this.request(
      `${this.apiUrl}guest_session/${guestSessionId}/rated/movies?api_key=${this.apiKey}=en-US&sort_by=created_at.asc`
    );
    const { results: ratedMovies, total_results: totalResults, page } = res;
    return {
      ratedMovies,
      totalResults,
      page,
    };

  }
}
