import "./SearchBar.css";
import { Search } from "lucide-react";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  onSearch,
  onClear,
  activeSearch,
  sortBy,
  setSortBy,
}) => {
  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim() !== "") onSearch(searchTerm.trim());
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    onClear();
  };

  return (
    <>
    <form className="searchbar" onSubmit={handleSearch}>
      <input
        className="search-input"
        type="text"
        placeholder="Buscar por título..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <button className="search-button" type="submit" aria-label="Buscar">
        <Search size={18} aria-hidden="true" />
      </button>

      {activeSearch && (
        <button
          className="clear-button"
          type="button"
          onClick={handleClearSearch}
          aria-label="Limpar busca"
        >
          ✖
        </button>
      )}
    </form>
        <div className="sort-inline" aria-label="Ordenar filmes">
        <p className="select-title">Ordenar por:</p>
        <div className="select-wrap">
          <select
            id="sort-select-inline"
            className="sort-select-inline"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="popularity">Mais populares</option>
            <option value="rating">Maior avaliação</option>
            <option value="title">Ordem alfabética</option>
            <option value="year">Ano de lançamento</option>
          </select>
          <span className="arrow">▾</span>
        </div>
      </div>
      </>
  );
}

export default SearchBar;
