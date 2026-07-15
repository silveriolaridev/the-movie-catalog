import Card from "./components/Card";
import { useEffect, useState } from "react";
import { getPopularMovies } from "./service/movieApi";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("null");

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

  const sortedMovies = [...movies].sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }

    if (sortBy === "rating") {
      return b.vote_average - a.vote_average;
    }

    if (sortBy === "year") {
      return Number(b.release_date?.slice(0, 4) || 0) - Number(a.release_date?.slice(0, 4) || 0);
    }

    if (sortBy === "null") {
      return movies;
    }

    return movies;
  });

  return (
    <main className="catalog-page">
      <h1>Filmes populares</h1>
      <div>
        <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
          <option value="null">Escolha uma opção</option>
          <option value="title">Ordem alfabética</option>
          <option value="rating">Maior avaliação</option>
          <option value="year">Ano de lançamento</option>
        </select>
      </div>
      {loading ? (
        <div className="loading">Carregando...</div>
      ) : (
        <>
          <section className="movie-grid" aria-label="Catálogo de filmes">

            {sortedMovies.map((movie) => (
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