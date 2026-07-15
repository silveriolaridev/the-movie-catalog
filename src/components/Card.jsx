function Card({ movie }) {
    const baseImageUrl = "https://image.tmdb.org/t/p/w500";

    return (
        <article className="movie-card">
            <img
                src={`${baseImageUrl}${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
            />
            <h2>{movie.title}</h2>
            <p>{movie.release_date.slice(0, 4)}</p>
            <p>{movie.vote_average.toFixed(1)}</p>
        </article>
    );
}

export default Card;