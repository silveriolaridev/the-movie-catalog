import { Link } from "react-router-dom";
import "./MovieCard.css";
import { FiStar } from "react-icons/fi";

function MovieCard({ movie, variant = "default" }) {
  const baseImageUrl = "https://image.tmdb.org/t/p/w500";
  const date = new Date(movie.release_date);
  const year = date.getFullYear();

  return (
    <Link to={`/movie/${movie.id}`} >
    <article className={`movie-card movie-card--${variant}`}>
      <img
        src={`${baseImageUrl}${movie.poster_path}`}
        alt={movie.title}
        loading="lazy"
      />

      <div className="card-body">
        <div className="title-row">
          <h2 className="movie-title">{movie.title}</h2>
          <span className="year-tag" aria-label={`Ano ${year}`}>
            {year}
          </span>
        </div>

        <div className="rating-row">
          <span className="rating" aria-label={`Avaliação ${movie.vote_average.toFixed(1)}`}>
            <FiStar size={16} aria-hidden="true" />
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
      
    </article>
    </Link>
  );
}

export default MovieCard;
