import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import { getPopularMovies, searchMovies } from "../../api/movies";
import "./Home.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Home() {
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
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((currentPage) => currentPage - 1);
    }
  };

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

    return b.vote_average - a.vote_average;
  });

  return (

    <main className="catalog-page">
        <div className="content-inner">
          <h1 className="page-title">The Movie Catalog</h1>
          <p className="page-description">Descubra novos filmes para assistir, explore detalhes e encontre recomendações.</p>

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
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </section>

              <div className="pagination-controls">
                <button
                  className="pagination-button prev"
                  onClick={handlePreviousPage}
                  disabled={page === 1}
                  aria-label="Anterior"
                >
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>

                <span className="pagination-info">
                  Página {page} de {totalPages}
                </span>

                <button
                  className="pagination-button next"
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                  aria-label="Próxima"
                >
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              </div>
            </>
          )}
        </div>
    </main>
  );
}

export default Home;
