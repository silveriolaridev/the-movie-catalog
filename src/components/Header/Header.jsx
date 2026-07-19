
import { Link } from "react-router-dom";
import "./Header.css";
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
      </div>
    </header>
  );
};

export default Header;