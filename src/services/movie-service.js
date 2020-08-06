export default class MovieService {
  apiUrl = "https://api.themoviedb.org/3/";

  apiImgUrl = "https://image.tmdb.org/t/p/w200";

  async request(...params) {
    const [url, data] = params;

    const response = data
      ? await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(data),
        })
      : await fetch(url);

    if (!response.ok) {
      throw new Error(`Error in function getMovies ${response.status}`);
      
    }
    const requestResult = await response.json();

    return requestResult;
  }

  async getMoviesByKeyword(keyword = "return", pageNumber = 1) {
    const res = await this.request(
      `${this.apiUrl}search/movie?${process.env.REACT_APP_APIKEY}&query=${keyword}&page=${pageNumber}&include_adult=false`
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
      `${this.apiUrl}movie/${id}?${process.env.REACT_APP_APIKEY}`
    );

    const {
      original_title: originalTitle,
      release_date: releaseDate,
      genres,
      overview,
      poster_path: posterPath,
      vote_average: voteAverage,
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
    const {
      totalResults,
      moviesByKeyWord,
      page,
    } = await this.getMoviesByKeyword(keyword, pageNumber);

    const moviesPromisses = moviesByKeyWord.map((movie) => {
      return this.getMovieById(movie.id);
    });
    const movies = await Promise.allSettled(moviesPromisses);

    const listOfResults = movies.map((movie) => {
      return movie.status === "fulfilled" ? movie.value : false;
    });
    

    return { listOfResults, totalResults, page };
  }

  async getGenres() {
    const res = await this.request(
      `${this.apiUrl}genre/movie/list?${process.env.REACT_APP_APIKEY}&language=en-US`
    );

    return res;
  }

  async getGuestSession() {
    const res = await this.request(
      `${this.apiUrl}authentication/guest_session/new?${process.env.REACT_APP_APIKEY}`
    );
    if (!res.success) {
      throw new Error("Tern of your addblock");
    }
    return res;
  }

  async rateMovieById(movieId, guestSessionId, data) {
    const res = await this.request(
      `${this.apiUrl}movie/${movieId}/rating?${process.env.REACT_APP_APIKEY}&guest_session_id=${guestSessionId}`,
      data
    );
    if (res.status_code !== 1) {
      throw new Error(res.status_message);
    }
    return res.status_message;
  }

  async getRatedMovies(guestSessionId) {
    const res = await this.request(
      `${this.apiUrl}guest_session/${guestSessionId}/rated/movies?${process.env.REACT_APP_APIKEY}&language=en-US&sort_by=created_at.asc`
    );
    const { results: ratedMovies, total_results: totalResults, page } = res;
    return {
      ratedMovies,
      totalResults,
      page,
    };
  }
}
