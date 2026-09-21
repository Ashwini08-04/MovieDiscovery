import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getPopularMovies,
  getTrendingMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getMovieGenres,
  discoverMovies
} from "../services/movieApi";
import "./Discover.css";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const POPULAR_GENRE_IDS = [28, 35, 18, 27, 10749];

const Discover = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [category, setCategory] = useState("popular");
  const [genre, setGenre] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  // Load genres
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await getMovieGenres();
        setGenres(data.genres || []);
      } catch {
        setGenres([]);
      }
    };

    loadGenres();
  }, []);

  // Load movies
  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        setError("");
        setPage(1);

        const data = genre
          ? await discoverMovies(genre, 1)
          : category === "trending"
            ? await getTrendingMovies(1)
            : category === "top-rated"
              ? await getTopRatedMovies(1)
              : category === "now-playing"
                ? await getNowPlayingMovies(1)
                : await getPopularMovies(1);

        setMovies(data.movies || []);
        setTotalPages(data.totalPages || 1);
      } catch {
        setError("Unable to load movies. Please try again.");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [category, genre]);

  // Load next page
  const loadMore = async () => {
    if (page >= totalPages) return;

    try {
      setLoadingMore(true);
      setError("");

      const nextPage = page + 1;

      const data = genre
        ? await discoverMovies(genre, nextPage)
        : category === "trending"
          ? await getTrendingMovies(nextPage)
          : category === "top-rated"
            ? await getTopRatedMovies(nextPage)
            : category === "now-playing"
              ? await getNowPlayingMovies(nextPage)
              : await getPopularMovies(nextPage);

      setMovies((prev) => [...prev, ...(data.movies || [])]);
      setPage(nextPage);
    } catch {
      setError("Unable to load more movies.");
    } finally {
      setLoadingMore(false);
    }
  };

  // Change category
  const handleCategory = (value) => {
    setCategory(value);
    setGenre("");
  };

  // Change genre
  const handleGenre = (id) => {
    setGenre(String(id));
    setCategory("popular");
  };

  // Clear genre
  const clearGenre = () => {
    setGenre("");
    setCategory("popular");
  };

  const selectedGenre = genres.find((item) => item.id === Number(genre));

  const popularGenres = genres.filter((item) =>
    POPULAR_GENRE_IDS.includes(item.id)
  );

  const moreGenres = genres.filter(
    (item) => !POPULAR_GENRE_IDS.includes(item.id)
  );

  if (loading) {
    return <div className="status">Loading movies...</div>;
  }

  if (error && movies.length === 0) {
    return <div className="status error">{error}</div>;
  }

  return (
    <main className="discover-page">
      {/* Header */}
      <section className="discover-header">
        <div>
          <span className="label">EXPLORE</span>
          <h1>Discover Movies</h1>
          <p>Explore movies by category, genre and popularity.</p>
        </div>
      </section>

      {/* Discovery categories */}
      <div className="category-tabs">
        {[
          ["popular", "Popular"],
          ["trending", "Trending"],
          ["top-rated", "Top Rated"],
          ["now-playing", "Now Playing"]
        ].map(([value, label]) => (
          <button
            key={value}
            className={!genre && category === value ? "active" : ""}
            onClick={() => handleCategory(value)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Genre */}
      <section className="genre-section">
        <div className="genre-heading">
          <span className="label">GENRE</span>

          {selectedGenre && (
            <button className="clear-genres" onClick={clearGenre}>
              Clear
            </button>
          )}
        </div>

        <div className="genre-group">
          <span className="genre-group-title">Popular Genres</span>

          <div className="genre-list">
            {popularGenres.map((item) => (
              <button
                key={item.id}
                className={Number(genre) === item.id ? "selected" : ""}
                onClick={() => handleGenre(item.id)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <div className="genre-group">
          <span className="genre-group-title">More Genres</span>

          <div className="genre-list">
            {moreGenres.map((item) => (
              <button
                key={item.id}
                className={Number(genre) === item.id ? "selected" : ""}
                onClick={() => handleGenre(item.id)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected genre */}
        {selectedGenre && (
          <div className="selected-genres">
            <span>Showing:</span>
            <strong>{selectedGenre.name} Movies</strong>
          </div>
        )}
      </section>

      {/* Movie grid */}
      <section className="discover-grid">
        {movies.length === 0 ? (
          <div className="discover-empty">
            <h2>No movies found</h2>
            <p>Try another category or genre.</p>
          </div>
        ) : (
          movies.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              className="discover-card"
              key={movie.id}
            >
              <div className="discover-poster">
                {movie.poster_path ? (
                  <img
                    src={`${IMAGE_URL}${movie.poster_path}`}
                    alt={movie.title}
                  />
                ) : (
                  <div className="discover-no-poster">No Poster</div>
                )}
              </div>

              <div className="discover-info">
                <h3 title={movie.title}>{movie.title}</h3>

                <div className="discover-meta">
                  <span>
                    {movie.release_date?.slice(0, 4) || "N/A"}
                  </span>

                  <span>
                    ⭐{" "}
                    {movie.vote_average > 0
                      ? movie.vote_average.toFixed(1)
                      : "Not rated"}
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </section>

      {error && <p className="discover-error">{error}</p>}

      {/* Load more */}
      {page < totalPages && (
        <div className="load-more-wrap">
          <button onClick={loadMore} disabled={loadingMore}>
            {loadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </main>
  );
};

export default Discover;