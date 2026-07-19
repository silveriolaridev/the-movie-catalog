import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "./MovieDetailsCard.css";
import MovieInfoItem from "../MovieInfoItem/MovieInfoItem";
import {
    FiSearch,
    FiChevronLeft,
    FiChevronRight,
    FiCalendar,
    FiStar,
    FiClock,
    FiUsers,
    FiVideo,
    FiFilm
} from "react-icons/fi";


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
                    <FiChevronLeft size={18} aria-hidden="true" />
                    Voltar
                </Link>
            </div>
            <section className="movie-details" aria-label="Detalhes do filme">

                <div className="details-container">
                    <h2>{movie.title}</h2>

                    <div className="overview-container">
                        <p>{movie.overview || "Sem sinopse disponível."}</p>
                    </div>

                    <MovieInfoItem label="Data de lançamento" value={formattedDate} icon={<FiCalendar size={18} aria-hidden="true" />} />
                    <MovieInfoItem label="Nota" value={movie.vote_average?.toFixed(1) ?? "-"} icon={<FiStar size={18} aria-hidden="true" />} />
                    <MovieInfoItem label="Gêneros" value={movie.genres?.map((genre) => genre.name).join(", ") || "Indisponível"} icon={<FiFilm size={18} aria-hidden="true" />} />
                    <MovieInfoItem label="Duração" value={movie.runtime ? `${movie.runtime} minutos` : "Duração indisponível"} icon={<FiClock size={18} aria-hidden="true" />} />
                    <MovieInfoItem label="Diretor" value={director || "Indisponível"} icon={<FiUsers size={18} aria-hidden="true" />} />
                    <MovieInfoItem label="Atores principais" value={cast || "Indisponível"} icon={<FiUsers size={18} aria-hidden="true" />} />
                </div>

                <div className="poster-container">
                    <img src={posterUrl} alt={movie.title} loading="lazy" />
                </div>
            </section>
        </>
    )

}

export default MovieDetailsCard;