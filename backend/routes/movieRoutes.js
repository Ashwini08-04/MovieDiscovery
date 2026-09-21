const express = require("express");
const {
  popularMovies,
  trendingMovies,
  topRatedMovies,
  nowPlayingMovies,
  movieGenres,
  discoverByGenre,
  searchMovieResults,
  movieDetails
} = require("../controllers/movieController");

const router = express.Router();

router.get("/popular", popularMovies);
router.get("/trending", trendingMovies);
router.get("/top-rated", topRatedMovies);
router.get("/now-playing", nowPlayingMovies);
router.get("/genres", movieGenres);
router.get("/discover", discoverByGenre);
router.get("/search", searchMovieResults);
router.get("/:id", movieDetails);

module.exports = router;