import { useEffect, useState } from "react";
import { getPopularMovies } from "./service/movieApi";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await getPopularMovies();
              console.log("Filmes:", data);

        setMovies(data);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    }

    loadMovies();
  }, []);

  return (
    <main>
      <h1>Filmes populares</h1>

      {movies.map((movie) => (
        <article key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
        </article>
      ))}
    </main>
  );
}

export default App;