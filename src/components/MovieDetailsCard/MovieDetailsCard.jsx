import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./MovieDetailsCard.css";



const MovieDetailsCard = ({ id, movie, credits }) => {

    const navigate = useNavigate();

    const date = movie.release_date ? new Date(movie.release_date) : null;
    const formattedDate = date
        ? new Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).format(date)
        : "Data indisponível";
    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const director = credits?.crew?.find((person) => person.job === "Director")?.name || "Diretor não informado";
    const cast = credits?.cast?.filter((person) => person.known_for_department === "Acting").map((person) => person.name).slice(0, 5).join(", ") || "Elenco indisponível";


    return (
        <>
            <div className="back-button-container">
                <button className="back-button" onClick={() => navigate("/")} aria-label="Voltar para a página inicial">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>Voltar
                </button>
            </div>
            <section className="movie-details" aria-label="Detalhes do filme">
                
                <div className="details-container">
                <h2>{movie.title}</h2>
                <div className="overview-container">
                    <p>{movie.overview || "Sem sinopse disponível."}</p>
                </div>
                <p>
                    <strong>Data de lançamento:</strong> {formattedDate}
                </p>
                <p>
                    <strong>Nota:</strong> {movie.vote_average?.toFixed(1) ?? "-"}
                </p>
                
                <div className="genres-row">
                    <span>
                        <strong>Gêneros:</strong>{"\u00A0"}
                        {movie.genres?.map((genre) => genre.name).join(", ")}
                    </span>
                </div>
                <p>
                    <strong>Duração:</strong> {movie.runtime ? `${movie.runtime} minutos` : "Duração indisponível"}
                </p>
                <p>
                    <strong>Diretor:</strong> {director}
                </p>
                <p>
                    <strong>Atores:</strong> {cast}
                </p>
                </div>
                <div className="poster-container">
                    <img
                        src={posterUrl}
                        alt={movie.title}
                        loading="lazy"
                    />
                </div>
            </section>
        </>
    )

}

export default MovieDetailsCard;