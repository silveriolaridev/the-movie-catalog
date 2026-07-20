
import "./SortMovies.css";

const SortMovies = ({ sortBy, setSortBy }) => {

    return (
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
                <option value="rating">Melhor avaliados</option>
                <option value="title">Título A-Z</option>
                <option value="year">Mais recentes</option>
            </select>
            <span className="arrow">▾</span>
        </div>
    </div>
    );
}

export default SortMovies;