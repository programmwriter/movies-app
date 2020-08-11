export default class MovieService {
  apiUrl = "https://api.themoviedb.org/3/";

  apiImgUrl = "https://image.tmdb.org/t/p/w200";

  async request(...params) {
    const [url, data] = params;
    let response = "";
    let requestResult = "";

    try {
      response = data
        ? await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(data),
          })
        : await fetch(url);

      requestResult = await response.json();
    } catch (err) {
      requestResult = err.message;
    }

    return requestResult;
  }

  async getMoviesByKeyword(keyword = "game", pageNumber = 1) {
    const res = await this.request(
      `${this.apiUrl}search/movie?${process.env.REACT_APP_APIKEY}&query=${keyword}&page=${pageNumber}&include_adult=false`
    );
    return res;
  }

  async getRatedMovies(guestSessionId) {
    const res = await this.request(
      `${this.apiUrl}guest_session/${guestSessionId}/rated/movies?${process.env.REACT_APP_APIKEY}&language=en-US&sort_by=created_at.asc`
    );

    return res;
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
      throw new Error("Can`t create guest session");
    }
    return res;
  }

  async rateMovieById(movieId, guestSessionId, data) {
    const res = await this.request(
      `${this.apiUrl}movie/${movieId}/rating?${process.env.REACT_APP_APIKEY}&guest_session_id=${guestSessionId}`,
      data
    );
    // if (res.status_code !== 1) {
    //   throw new Error(res.status_message);
    // }
    return res.status_message;
  }
}
