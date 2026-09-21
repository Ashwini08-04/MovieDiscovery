const {
  getPopularMovies,
  getTrendingMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getMovieGenres,
  discoverMovies,
  searchMovies,
  getMovieDetails
} = require("../services/movieService");

const handleTMDBError = require("./errorHandler");

// Format movie list response
const movieListResponse = (res, data) => {
  res.json({
    success: true,
    page: data.page,
    totalPages: data.total_pages,
    totalResults: data.total_results,
    movies: data.results
  });
};

// Get popular movies
const popularMovies = async (req, res) => {
  try {
    const data = await getPopularMovies(Number(req.query.page) || 1);
    movieListResponse(res, data);
  } catch (error) {
    console.error("TMDB Popular Error:", error.message);
    handleTMDBError(error, res, "Failed to fetch movies.");
  }
};

// Get trending movies
const trendingMovies = async (req, res) => {
  try {
    const data = await getTrendingMovies(Number(req.query.page) || 1);
    movieListResponse(res, data);
  } catch (error) {
    console.error("TMDB Trending Error:", error.message);
    handleTMDBError(error, res, "Failed to fetch trending movies.");
  }
};

// Get top-rated movies
const topRatedMovies = async (req, res) => {
  try {
    const data = await getTopRatedMovies(Number(req.query.page) || 1);
    movieListResponse(res, data);
  } catch (error) {
    console.error("TMDB Top Rated Error:", error.message);
    handleTMDBError(error, res, "Failed to fetch top-rated movies.");
  }
};

// Get now-playing movies
const nowPlayingMovies = async (req, res) => {
  try {
    const data = await getNowPlayingMovies(Number(req.query.page) || 1);
    movieListResponse(res, data);
  } catch (error) {
    console.error("TMDB Now Playing Error:", error.message);
    handleTMDBError(error, res, "Failed to fetch now-playing movies.");
  }
};

// Get movie genres
const movieGenres = async (req, res) => {
  try {
    const data = await getMovieGenres();
    res.json({ success: true, genres: data.genres });
  } catch (error) {
    console.error("TMDB Genres Error:", error.message);
    handleTMDBError(error, res, "Failed to fetch genres.");
  }
};

// Discover movies by genre
const discoverByGenre = async (req, res) => {
  try {
    const genre = Number(req.query.genre);
    const page = Number(req.query.page) || 1;

    if (!genre) {
      return res.status(400).json({
        success: false,
        message: "Genre ID is required"
      });
    }

    const data = await discoverMovies(genre, page);
    movieListResponse(res, data);
  } catch (error) {
    console.error("TMDB Discover Error:", error.message);
    handleTMDBError(error, res, "Failed to discover movies.");
  }
};

// Search movies
const searchMovieResults = async (req, res) => {
  try {
    const query = req.query.query?.trim();
    const page = Number(req.query.page) || 1;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required"
      });
    }

    const data = await searchMovies(query, page);
    movieListResponse(res, data);
  } catch (error) {
    console.error("TMDB Search Error:", error.message);
    handleTMDBError(error, res, "Failed to search movies.");
  }
};

// Get movie details
const movieDetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Movie ID is required"
      });
    }

    const movie = await getMovieDetails(id);

    res.json({ success: true, movie });
  } catch (error) {
    console.error("TMDB Details Error:", error.message);
    handleTMDBError(error, res, "Failed to fetch movie details.");
  }
};

module.exports = {
  popularMovies,
  trendingMovies,
  topRatedMovies,
  nowPlayingMovies,
  movieGenres,
  discoverByGenre,
  searchMovieResults,
  movieDetails
};