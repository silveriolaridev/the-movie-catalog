import { useParams } from "react-router-dom";
import MovieDetailsCard from "../../components/MovieDetailsCard/MovieDetailsCard";
import MoviesRecomendations from "../../components/MoviesRecomendations/MoviesRecomendations";
import { getMovieCredits, getMovieDetails } from "../../api/movies";
import "./MovieDetails.css";
import { useEffect, useState } from "react";

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

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

    return (
        <div className="movie-details-page">
            <div className="content-inner">
                {loading ? (
                    <p className="loading">Carregando...</p>
                ) : errorMessage ? (
                    <p>{errorMessage}</p>
                ) : (
                    <>
                        <MovieDetailsCard id={id} movie={movie} credits={credits} />
                        <MoviesRecomendations id={id} />
                    </>
                )}

            </div>
        </div>

    );
}

export default MovieDetails;
