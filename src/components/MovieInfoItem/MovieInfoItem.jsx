import "./MovieInfoItem.css";

const MovieInfoItem = ({ label, value, icon }) => {

    return (
        <div className="movie-info-item">
            {icon}
            <span>
               {label && <strong>{label}:</strong>} {value || "Indisponível"}
            </span>
        </div>
    )
}

export default MovieInfoItem;