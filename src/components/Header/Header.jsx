
import { Link } from "react-router-dom";
import "./Header.css";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo" aria-label="Ir para a página inicial">
          <picture>
            <source
              srcSet="/logo-dark-theme.png"
              media="(prefers-color-scheme: dark)"
            />
            <img
              src="/logo-light-theme.png"
              alt="The Movie Catalog"
              width="200"
              height="70"
            />
          </picture>
        </Link>

        <nav className="header-nav" aria-label="Navegação principal">
          <a
            href="https://github.com/silveriolaridev/react-movie-catalog"
            target="_blank"
            rel="noreferrer"
            className="github-link"
          >
            <FaGithub size={20} aria-hidden="true" />
            <span className="github-link-text">Ver projeto no GitHub</span>
            <FiExternalLink className="external-link-icon" size={16} aria-hidden="true" />

          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;