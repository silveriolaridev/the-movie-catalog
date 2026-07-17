import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails } from "../../api/movies";
import "./MovieDetails.css";

function MovieDetails() {
    const { id } = useParams();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function movieDetails() {
            try {
                setLoading(true);
                const details = await getMovieDetails(id);
                setMovie(details);
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

    const year = movie.release_date ? movie.release_date.slice(0, 4) : "-";
    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

    return (
        <section className="movie-details" aria-label="Detalhes do filme">
            <h2>{movie.title}</h2>
            <p>
                <strong>Ano:</strong> {year}
            </p>
            <p>
                <strong>Nota:</strong> {movie.vote_average?.toFixed(1) ?? "-"}
            </p>
            <p>{movie.overview || "Sem sinopse disponível."}</p>
        </section>
    );
}

export default MovieDetails;
