import Card from "./components/Card";
import { useEffect, useState } from "react";
import { getPopularMovies } from "./service/movieApi";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);
        const data = await getPopularMovies(page);

        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((currentPage) => currentPage + 1);
    }
  }

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((currentPage) => currentPage - 1);
    }
  }



  return (
    <main className="catalog-page">
      <h1>Filmes populares</h1>
      {loading ? (
        <div className="loading">Carregando...</div>
      ) : (
      <>
      <section className="movie-grid" aria-label="Catálogo de filmes">
        {movies.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </section>
        <div>
          <button onClick={handlePreviousPage} disabled={page === 1}>
            Anterior
          </button>

          <span>
            Página {page} de {totalPages}
          </span>

          <button onClick={handleNextPage} disabled={page === totalPages}>
            Próxima
          </button>
        </div>
      </>
    )}

    </main>
  );
}

export default App;