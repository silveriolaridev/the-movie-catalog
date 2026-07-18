import { useParams } from "react-router-dom";
import MovieDetailsCard from "../../components/MovieDetailsCard/MovieDetailsCard";
import MoviesRecomendations from "../../components/MoviesRecomendations/MoviesRecomendations";

function MovieDetails() {
    const { id } = useParams();

    return (
        <>
            <MovieDetailsCard id={id} />
            <MoviesRecomendations id={id} />
        </>

    );
}

export default MovieDetails;
