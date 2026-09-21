const axios = require("axios");

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 10000
});

// Retry temporary TMDB connection failures
const requestTMDB = async (url, params, retries = 2) => {
  try {
    const response = await tmdb.get(url, { params });
    return response.data;
  } catch (error) {
    const retryable = ["ECONNRESET", "ETIMEDOUT", "ECONNABORTED"].includes(error.code);

    if (retryable && retries > 0) {
      console.log(`TMDB retry... ${retries} attempt(s) left`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return requestTMDB(url, params, retries - 1);
    }

    throw error;
  }
};

// Fetch popular movies
const getPopularMovies = (page = 1) =>
  requestTMDB("/movie/popular", {
    api_key: process.env.TMDB_API_KEY,
    language: "en-US",
    page
  });

// Fetch trending movies
const getTrendingMovies = (page = 1) =>
  requestTMDB("/trending/movie/week", {
    api_key: process.env.TMDB_API_KEY,
    language: "en-US",
    page
  });

// Fetch top-rated movies
const getTopRatedMovies = (page = 1) =>
  requestTMDB("/movie/top_rated", {
    api_key: process.env.TMDB_API_KEY,
    language: "en-US",
    page
  });

// Fetch now-playing movies
const getNowPlayingMovies = (page = 1) =>
  requestTMDB("/movie/now_playing", {
    api_key: process.env.TMDB_API_KEY,
    language: "en-US",
    page
  });

// Fetch movie genres
const getMovieGenres = () =>
  requestTMDB("/genre/movie/list", {
    api_key: process.env.TMDB_API_KEY,
    language: "en-US"
  });

// Discover movies by one or multiple genres
const discoverMovies = (genres, page = 1) =>
  requestTMDB("/discover/movie", {
    api_key: process.env.TMDB_API_KEY,
    language: "en-US",
    with_genres: Array.isArray(genres) ? genres.join(",") : genres,
    page,
    sort_by: "popularity.desc",
    include_adult: false
  });

// Search movies
const searchMovies = (query, page = 1) =>
  requestTMDB("/search/movie", {
    api_key: process.env.TMDB_API_KEY,
    language: "en-US",
    query,
    page,
    include_adult: false
  });

// Fetch complete movie details
const getMovieDetails = (id) =>
  requestTMDB(`/movie/${id}`, {
    api_key: process.env.TMDB_API_KEY,
    language: "en-US",
    append_to_response: "videos,similar"
  });

module.exports = {
  getPopularMovies,
  getTrendingMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getMovieGenres,
  discoverMovies,
  searchMovies,
  getMovieDetails
};