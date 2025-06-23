import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>StudioAgenda</h2>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Inicio</Link>
        <Link to="/login" style={styles.link}>Ingresar</Link>
        <Link to="/register" style={styles.link}>Registrarse</Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#111",
    color: "#fff",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold"
  },
  links: {
    display: "flex",
    gap: "1rem"
  },
  link: {
    color: "#fff",
    textDecoration: "none"
  }
};

export default Navbar;
