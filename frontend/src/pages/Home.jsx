import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPopularMovies, searchMovies } from "../services/movieApi";
import { useWishlist } from "../context/WishlistContext";
import { useRecentlyViewed } from "../context/RecentlyViewedContext";
import "./Home.css";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_URL = "https://image.tmdb.org/t/p/original";

const Home = () => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { recentlyViewed } = useRecentlyViewed();

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState(false);
  const [searchPage, setSearchPage] = useState(1);
  const [searchTotalPages, setSearchTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  // Load popular movies
  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await getPopularMovies();
        setMovies(data.movies || []);
      } catch {
        setError("Unable to load movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  // Search first page
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!search.trim()) {
      setSearched(false);
      return;
    }

    try {
      setSearching(true);
      setError("");

      const data = await searchMovies(search.trim(), 1);

      setMovies(data.movies || []);
      setSearchPage(data.page || 1);
      setSearchTotalPages(data.totalPages || 1);
      setSearched(true);
    } catch {
      setError("Unable to search movies. Please try again.");
    } finally {
      setSearching(false);
    }
  };

  // Load more search results
  const loadMoreSearch = async () => {
    if (searchPage >= searchTotalPages) return;

    try {
      setLoadingMore(true);
      setError("");

      const nextPage = searchPage + 1;
      const data = await searchMovies(search.trim(), nextPage);

      setMovies((prev) => [...prev, ...(data.movies || [])]);
      setSearchPage(nextPage);
    } catch {
      setError("Unable to load more results.");
    } finally {
      setLoadingMore(false);
    }
  };

  // Restore popular movies
  const handleClearSearch = async () => {
    try {
      setSearch("");
      setSearched(false);
      setSearchPage(1);
      setSearchTotalPages(1);
      setLoading(true);
      setError("");

      const data = await getPopularMovies();
      setMovies(data.movies || []);
    } catch {
      setError("Unable to load movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="status">Loading movies...</div>;

  if (error && !searching && movies.length === 0) {
    return <div className="status error">{error}</div>;
  }

  const featured = movies[0];

  return (
    <main className="home">
      {/* Featured movie */}
      {!searched && featured && (
        <section
          className="featured"
          style={{
            backgroundImage: `linear-gradient(90deg, #0d0f13 8%, rgba(13,15,19,.88) 38%, rgba(13,15,19,.48) 68%, rgba(13,15,19,.15)), url(${BACKDROP_URL}${featured.backdrop_path || featured.poster_path})`
          }}
        >
          <div className="featured-content">
            <span className="label">FEATURED</span>

            <h1>{featured.title}</h1>

            <div className="meta">
              <span>{featured.release_date?.slice(0, 4) || "N/A"}</span>

              <span>
                ⭐{" "}
                {featured.vote_average > 0
                  ? featured.vote_average.toFixed(1)
                  : "Not rated"}
              </span>
            </div>

            <p>
              {featured.overview || "Discover something worth watching."}
            </p>

            <Link to={`/movie/${featured.id}`} className="featured-btn">
              View Details
            </Link>
          </div>
        </section>
      )}

      {/* Search */}
      <section className="search-section">
        <span className="label">MOVIE DISCOVERY</span>

        <h2>
          {searched ? (
            <>
              Search results
              <span className="search-query">“{search}”</span>
            </>
          ) : (
            "Find your next favorite movie."
          )}
        </h2>

        <form className="search-box" onSubmit={handleSearch}>
          <span className="search-icon">⌕</span>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search movies..."
          />

          <button type="submit">
            {searching ? "Searching..." : "Search"}
          </button>
        </form>

        {searched && (
          <div className="search-result-note">
            <span>Showing results for “{search}”</span>

            <button className="clear-search" onClick={handleClearSearch}>
              ← Back to popular movies
            </button>
          </div>
        )}
      </section>

      {/* Recently viewed */}
      {!searched && recentlyViewed.length > 0 && (
        <section className="recent-section">
          <div className="section-heading">
            <div>
              <span className="label">YOUR ACTIVITY</span>
              <h2>Recently Viewed</h2>
            </div>

            <span className="result-count">
              {recentlyViewed.length} movies
            </span>
          </div>

          <div className="movie-grid recent-grid">
            {recentlyViewed.map((movie) => (
              <article className="movie-card" key={movie.id}>
                <Link to={`/movie/${movie.id}`} className="movie-link">
                  <div className="poster">
                    {movie.poster_path ? (
                      <img
                        src={`${IMAGE_URL}${movie.poster_path}`}
                        alt={movie.title}
                      />
                    ) : (
                      <div className="no-poster">No Poster</div>
                    )}
                  </div>

                  <div className="movie-info">
                    <h3 title={movie.title}>{movie.title}</h3>

                    <div className="movie-meta">
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
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Movie results */}
      <section className="movie-section">
        <div className="section-heading">
          <div>
            <span className="label">
              {searched ? "SEARCH RESULTS" : "POPULAR"}
            </span>

            <h2>{searched ? "Movies" : "Popular Movies"}</h2>
          </div>

          <span className="result-count">{movies.length} movies</span>
        </div>

        {movies.length === 0 ? (
          <div className="empty-state">
            <h3>No movies found</h3>
            <p>Try searching with another movie title.</p>
          </div>
        ) : (
          <div className="movie-grid">
            {movies.map((movie) => (
              <article className="movie-card" key={movie.id}>
                <Link to={`/movie/${movie.id}`} className="movie-link">
                  <div className="poster">
                    {movie.poster_path ? (
                      <img
                        src={`${IMAGE_URL}${movie.poster_path}`}
                        alt={movie.title}
                      />
                    ) : (
                      <div className="no-poster">No Poster</div>
                    )}

                    <button
                      className={`wishlist-btn ${
                        isInWishlist(movie.id) ? "active" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(movie);
                      }}
                      aria-label={
                        isInWishlist(movie.id)
                          ? `Remove ${movie.title} from wishlist`
                          : `Add ${movie.title} to wishlist`
                      }
                    >
                      {isInWishlist(movie.id) ? "♥" : "♡"}
                    </button>
                  </div>

                  <div className="movie-info">
                    <h3 title={movie.title}>{movie.title}</h3>

                    <div className="movie-meta">
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
              </article>
            ))}
          </div>
        )}

        {/* Continue exploring search results */}
        {searched && searchPage < searchTotalPages && (
          <div className="load-more-wrap">
            <button onClick={loadMoreSearch} disabled={loadingMore}>
              {loadingMore ? "Loading..." : "Load More Results"}
            </button>
          </div>
        )}

        {error && <p className="search-load-error">{error}</p>}
      </section>
    </main>
  );
};

export default Home;