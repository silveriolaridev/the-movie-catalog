import { useParams } from "react-router-dom";
import MovieDetailsCard from "../../components/MovieDetailsCard/MovieDetailsCard";
import MoviesRecomendations from "../../components/MoviesRecomendations/MoviesRecomendations";
import "./MovieDetails.css";

function MovieDetails() {
    const { id } = useParams();

    return (
        <div className="movie-details-page">
            <div className="content-inner">
                <MovieDetailsCard id={id} />
                <MoviesRecomendations id={id} />
            </div>
        </div>

    );
}

export default MovieDetails;
