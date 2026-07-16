function Card({ movie }) {
    const baseImageUrl = "https://image.tmdb.org/t/p/w500";
    const year = movie.release_date ? movie.release_date.slice(0, 4) : "-";

    return (
        <article className="movie-card">
            <img
                src={`${baseImageUrl}${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
            />

            <div className="card-body">
                <div className="title-row">
                    <h2 className="movie-title">{movie.title}</h2>
                    <span className="year-tag" aria-label={`Ano ${year}`}>{year}</span>
                </div>

                <div className="rating-row">
                    <span className="rating"><strong>Nota:</strong>{'\u00A0'}{movie.vote_average.toFixed(1)}</span>
                </div>
            </div>
        </article>
    );
}

export default Card;