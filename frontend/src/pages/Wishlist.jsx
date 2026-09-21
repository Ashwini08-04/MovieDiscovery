import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import "./Wishlist.css";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <main className="wishlist-page">
      {/* Header */}
      <section className="wishlist-header">
        <span className="label">WATCH LATER</span>
        <h1>My Wishlist</h1>
        <p>
          {wishlist.length}{" "}
          {wishlist.length === 1 ? "movie" : "movies"} saved for later
        </p>
      </section>

      {wishlist.length === 0 ? (
        <div className="wishlist-empty">
          <span className="wishlist-empty-icon">♡</span>
          <h2>Your watchlist is waiting</h2>
          <p>
            Save movies you want to watch later and find them here anytime.
          </p>
          <Link to="/" className="browse-btn">
            Browse Movies
          </Link>
        </div>
      ) : (
        <section className="wishlist-content">
          {/* Saved movies */}
          <div className="wishlist-grid">
            {wishlist.map((movie) => (
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
                      className="wishlist-btn active"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(movie);
                      }}
                      aria-label={`Remove ${movie.title} from wishlist`}
                    >
                      ♥
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
        </section>
      )}
    </main>
  );
};

export default Wishlist;