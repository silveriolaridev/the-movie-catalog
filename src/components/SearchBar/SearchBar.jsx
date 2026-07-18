import "./SearchBar.css";

function SearchBar({
  searchTerm,
  setSearchTerm,
  onSearch,
  onClear,
  activeSearch,
  sortBy,
  setSortBy,
}) {
  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim() !== "") onSearch(searchTerm.trim());
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    onClear();
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <input
        className="search-input"
        type="text"
        placeholder="Buscar filme..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <button className="search-button" type="submit" aria-label="Buscar">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M21 21L16.65 16.65M18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
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
      |
      <div className="sort-inline" aria-label="Ordenar filmes">
        <p className="select-title">Ordenar por:</p>
        <div className="select-wrap">
          <select
            id="sort-select-inline"
            className="sort-select-inline"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="rating">Maior avaliação</option>
            <option value="title">Ordem alfabética</option>
            <option value="year">Ano de lançamento</option>
          </select>
          <span className="arrow">▾</span>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
