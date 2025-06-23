import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold fs-4">
          StudioAgenda
        </Link>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav gap-3">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link text-white">
                Ingresar
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link text-white">
                Registrarse
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
