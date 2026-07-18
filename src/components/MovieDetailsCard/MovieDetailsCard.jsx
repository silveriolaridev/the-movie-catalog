import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "./MovieDetailsCard.css";
import {
    Calendar,
    Star,
    Clapperboard,
    Clock,
    Video,
    Users,
    ChevronLeft
} from "lucide-react";


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
    const cast = credits?.cast?.filter((person) => person.known_for_department === "Acting").map((person) => person.name).slice(0, 3).join(", ") || "Elenco indisponível";


    return (
        <>
            <div className="back-button-container">
                <Link to="/" className="back-button" aria-label="Voltar para a página inicial">
                    <ChevronLeft size={18} aria-hidden="true" />
                    Voltar
                </Link>
            </div>
            <section className="movie-details" aria-label="Detalhes do filme">

                <div className="details-container">
                    <h2>{movie.title}</h2>

                    <div className="overview-container">
                        <p>{movie.overview || "Sem sinopse disponível."}</p>
                    </div>

                    <p className="movie-info-item">
                        <Calendar size={18} aria-hidden="true" />
                        <span>
                            <strong>Data de lançamento:</strong> {formattedDate}
                        </span>
                    </p>

                    <p className="movie-info-item">
                        <Star size={18} aria-hidden="true" />
                        <span>
                            <strong>Nota:</strong> {movie.vote_average?.toFixed(1) ?? "-"}
                        </span>
                    </p>

                    <p className="movie-info-item">
                        <Clapperboard size={18} aria-hidden="true" />
                        <span>
                            <strong>Gêneros:</strong>{" "}
                            {movie.genres?.map((genre) => genre.name).join(", ") || "Indisponível"}
                        </span>
                    </p>

                    <p className="movie-info-item">
                        <Clock size={18} aria-hidden="true" />
                        <span>
                            <strong>Duração:</strong>{" "}
                            {movie.runtime ? `${movie.runtime} minutos` : "Duração indisponível"}
                        </span>
                    </p>

                    <p className="movie-info-item">
                        <Video size={18} aria-hidden="true" />
                        <span>
                            <strong>Diretor:</strong> {director || "Indisponível"}
                        </span>
                    </p>

                    <p className="movie-info-item">
                        <Users size={18} aria-hidden="true" />
                        <span>
                            <strong>Atores principais:</strong> {cast || "Indisponível"}
                        </span>
                    </p>
                </div>

                <div className="poster-container">
                    <img src={posterUrl} alt={movie.title} loading="lazy" />
                </div>
            </section>
        </>
    )

}

export default MovieDetailsCard;