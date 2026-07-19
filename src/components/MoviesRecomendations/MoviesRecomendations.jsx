import "./MoviesRecomendations.css";
import { getMovieRecommendations } from "../../api/movieRequests";
import { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import Loading from "../Loading/Loading";

const MoviesRecomendations = ({id, recommendations, loading}) => {

    return (
        <section className="movies-recommendations">
            {loading ? <Loading /> : <h2>Filmes recomendados</h2>}
            {!loading && recommendations.length > 0 && recommendations.map((movie)=> (
                <div className="movie-card-container" key={movie.id}>
                <MovieCard key={movie.id} movie={movie} variant="compact" /></div>
             ))}
        </section>
    )
}

export default MoviesRecomendations;