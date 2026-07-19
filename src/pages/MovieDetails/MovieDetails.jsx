import { useParams } from "react-router-dom";
import MovieDetailsCard from "../../components/MovieDetailsCard/MovieDetailsCard";
import MoviesRecommendations from "../../components/MoviesRecommendations/MoviesRecommendations";
import { getMovieCredits, getMovieDetails, getMovieRecommendations } from "../../api/movieRequests";
import Loading from "../../components/Loading/Loading";
import "./MovieDetails.css";
import { useEffect, useState } from "react";

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [recommendations, setRecommendations] = useState([]);


    useEffect(() => {
        async function movieDetails() {
            try {
                setLoading(true);
                const [details, creditsData, recommendationsData] = await Promise.all([
                    getMovieDetails(id),
                    getMovieCredits(id),
                    getMovieRecommendations(id)
                ]);
                setMovie(details);
                setCredits(creditsData);
                setRecommendations(recommendationsData.results);
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
                    <Loading />
                ) : (
                    <>
                        <MovieDetailsCard id={id} movie={movie} credits={credits} />
                        <MoviesRecommendations id={id} recommendations={recommendations} loading={loading} />
                    </>
                )}

            </div>
        </div>

    );
}

export default MovieDetails;
