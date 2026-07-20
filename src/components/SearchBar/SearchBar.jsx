import "./SearchBar.css";
import { FiSearch } from "react-icons/fi"

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  onSearch,
  onClear,
  activeSearch
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
      <form className="searchbar" onSubmit={handleSearch}>
        <input
          className="search-input"
          type="text"
          placeholder="Buscar por título..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <button className="search-button" type="submit" aria-label="Buscar">
          <FiSearch size={18} aria-hidden="true" />
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
  );
}

export default SearchBar;
