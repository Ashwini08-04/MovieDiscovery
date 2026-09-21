import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

// Get popular movies
export const getPopularMovies = async (page = 1) => {
  const response = await api.get("/movies/popular", { params: { page } });
  return response.data;
};

// Get trending movies
export const getTrendingMovies = async (page = 1) => {
  const response = await api.get("/movies/trending", { params: { page } });
  return response.data;
};

// Get top-rated movies
export const getTopRatedMovies = async (page = 1) => {
  const response = await api.get("/movies/top-rated", { params: { page } });
  return response.data;
};

// Get now-playing movies
export const getNowPlayingMovies = async (page = 1) => {
  const response = await api.get("/movies/now-playing", { params: { page } });
  return response.data;
};

// Get movie genres
export const getMovieGenres = async () => {
  const response = await api.get("/movies/genres");
  return response.data;
};

// Discover movies by genre
export const discoverMovies = async (genre, page = 1) => {
  const response = await api.get("/movies/discover", {
    params: { genre, page }
  });
  return response.data;
};

// Search movies
export const searchMovies = async (query, page = 1) => {
  const response = await api.get("/movies/search", {
    params: { query, page }
  });
  return response.data;
};

// Get complete movie details
export const getMovieDetails = async (id) => {
  const response = await api.get(`/movies/${id}`);
  return response.data;
};