import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails } from "../services/movieApi";
import { useWishlist } from "../context/WishlistContext";
import { useRecentlyViewed } from "../context/RecentlyViewedContext";
import "./MovieDetails.css";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_URL = "https://image.tmdb.org/t/p/original";

const MovieDetails = () => {
  const { id } = useParams();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addRecentlyViewed } = useRecentlyViewed();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load movie details
  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMovieDetails(id);
        setMovie(data.movie);

        // Save movie to recently viewed
        if (data.movie) {
          addRecentlyViewed(data.movie);
        }
      } catch {
        setError("Unable to load movie details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  if (loading) return <div className="details-status">Loading movie...</div>;
  if (error) return <div className="details-status error">{error}</div>;
  if (!movie) return <div className="details-status">Movie not found.</div>;

  const trailer = movie.videos?.results?.find(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  );

  // Format rating
  const rating =
    movie.vote_average > 0 ? movie.vote_average.toFixed(1) : "Not rated";

  // Format release date
  const releaseDate = movie.release_date
    ? new Date(`${movie.release_date}T00:00:00`).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      })
    : "Release date N/A";

  // Format runtime
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : "Runtime N/A";

  const backdrop = movie.backdrop_path || movie.poster_path;

  return (
    <main
      className="movie-details"
      style={{
        backgroundImage: backdrop
          ? `linear-gradient(90deg, #0d0f13 12%, rgba(13,15,19,.88) 45%, rgba(13,15,19,.55)), url(${BACKDROP_URL}${backdrop})`
          : "none"
      }}
    >
      <section className="details-content">
        <Link to="/" className="back-link">
          ← Back to movies
        </Link>

        <div className="details-layout">
          {/* Poster */}
          <div className="details-poster">
            {movie.poster_path ? (
              <img
                src={`${IMAGE_URL}${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <div className="no-details-poster">No Poster</div>
            )}
          </div>

          {/* Movie information */}
          <div className="details-info">
            <span className="label">MOVIE DETAILS</span>

            <h1>{movie.title}</h1>

            <div className="details-meta">
              <span>{releaseDate}</span>
              <span>⭐ {rating}</span>
              <span>{runtime}</span>
            </div>

            {movie.genres?.length > 0 && (
              <div className="genres">
                {movie.genres.map((genre) => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
              </div>
            )}

            <p className="overview">
              {movie.overview || "No overview available for this movie."}
            </p>

            <div className="details-actions">
              <button
                className={`details-wishlist ${
                  isInWishlist(movie.id) ? "saved" : ""
                }`}
                onClick={() => toggleWishlist(movie)}
              >
                {isInWishlist(movie.id)
                  ? "♥ Saved to Wishlist"
                  : "♡ Add to Wishlist"}
              </button>

              {trailer && (
                <a
                  className="trailer-btn"
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  ▶ Watch Trailer
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Similar movies */}
        {movie.similar?.results?.length > 0 && (
          <section className="similar-section">
            <span className="label">YOU MAY ALSO LIKE</span>
            <h2>Similar Movies</h2>

            <div className="similar-grid">
              {movie.similar.results.slice(0, 6).map((similar) => (
                <Link
                  to={`/movie/${similar.id}`}
                  className="similar-card"
                  key={similar.id}
                >
                  <div className="similar-poster">
                    {similar.poster_path ? (
                      <img
                        src={`${IMAGE_URL}${similar.poster_path}`}
                        alt={similar.title}
                      />
                    ) : (
                      <div className="similar-no-poster">No Poster</div>
                    )}
                  </div>

                  <h3 title={similar.title}>{similar.title}</h3>

                  <div className="similar-meta">
                    <span>
                      {similar.release_date?.slice(0, 4) || "N/A"}
                    </span>

                    <span>
                      ⭐{" "}
                      {similar.vote_average > 0
                        ? similar.vote_average.toFixed(1)
                        : "Not rated"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
};

export default MovieDetails;