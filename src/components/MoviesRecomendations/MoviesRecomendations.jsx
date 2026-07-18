import "./MoviesRecomendations.css";
import { getMovieRecommendations } from "../../api/movies";
import { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";

const MoviesRecomendations = ({id}) => {

const [recommendations, setRecommendations] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
 async function getRecommendations(id) {
    try {
        const recommendations = await getMovieRecommendations(id);
        setRecommendations(recommendations.results);
        setLoading(true);
    } catch (error) {
        console.error("Erro ao procurar filmes similares:", error);
        setLoading(false);
    } finally { 
        setLoading(false);
    }
 }
 getRecommendations(id);
},[id])

console.log('Recommendations:', recommendations)

    return (
        <div className="movies-recommendations">
            <h2>Filmes Similares</h2>
            {loading ? <p>Carregando...</p> : 
             recommendations.map((movie)=> (
                <MovieCard key={movie.id} movie={movie} />
             ))}
        </div>
    )
}

export default MoviesRecomendations;