import Card from "./components/Card";
import { useEffect, useState } from "react";
import { getPopularMovies, searchMovies } from "./service/movieApi";
import "./App.css";
import SearchBar from "./components/SearchBar";

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("null");
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      const results = await searchMovies(query);
      setMovies(results);
      setTotalPages(1);
      setPage(1);
      setActiveSearch(true);
    } catch (error) {
      console.error("Erro na busca:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = async () => {
    setSearchTerm("");
    setActiveSearch(false);
    setPage(1);
    try {
      setLoading(true);
      const data = await getPopularMovies(1);
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Erro ao recarregar filmes:", error);
    } finally {
      setLoading(false);
    }
  };

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
      <div className="content-inner">
        <h1 className="page-title">Filmes populares</h1>

        <div className="top-controls">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
            onClear={handleClearSearch}
            activeSearch={activeSearch}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
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

            <div className="pagination-controls">
              <button
                className="pagination-button prev"
                onClick={handlePreviousPage}
                disabled={page === 1}
                aria-label="Anterior"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="sr-only">Anterior</span>
              </button>

              <span className="pagination-info">Página {page} de {totalPages}</span>

              <button
                className="pagination-button next"
                onClick={handleNextPage}
                disabled={page === totalPages}
                aria-label="Próxima"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="sr-only">Próxima</span>
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default App;