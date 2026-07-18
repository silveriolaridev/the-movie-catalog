import { useNavigate } from "react-router-dom";
import { getMovieCredits, getMovieDetails } from "../../api/movies";
import { useEffect, useState } from "react";
import "./MovieDetailsCard.css";


const MovieDetailsCard = ({ id }) => {
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function movieDetails() {
            try {
                setLoading(true);
                const [details, creditsData] = await Promise.all([
                    getMovieDetails(id),
                    getMovieCredits(id),
                ]);
                setMovie(details);
                setCredits(creditsData);
            } catch (error) {
                console.error("Erro ao buscar detalhes do filme:", error);
                setErrorMessage("Erro ao buscar detalhes do filme.");
            } finally {
                setLoading(false);
            }
        }
        movieDetails();
    }, [id])

    if (loading) {
        return <p className="movie-details empty-state">Carregando detalhes...</p>;
    }

    if (errorMessage) {
        return <p className="movie-details empty-state">{errorMessage}</p>;
    }
    if (!movie) {
        return (
            <p className="movie-details empty-state">
                Selecione um filme para ver os detalhes.
            </p>
        );
    }

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
            <button className="back-button" onClick={() => navigate("/")}>Voltar</button>
            </div>
        <section className="movie-details" aria-label="Detalhes do filme">
           
            <img
                src={posterUrl}
                alt={movie.title}
                loading="lazy"
            />

            <h2>{movie.title}</h2>
            <p>
                <strong>Lançamento:</strong> {formattedDate}
            </p>
            <p>
                <strong>Nota:</strong> {movie.vote_average?.toFixed(1) ?? "-"}
            </p>
            <p>{movie.overview || "Sem sinopse disponível."}</p>
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
        </section>
        </>
    )

}

export default MovieDetailsCard;