import React from "react";
import { useNavigate } from "react-router-dom";

const ArtistProfile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const handleBackToProfile = () => {
    navigate("/profile");
  };

  const handleGoToStudios = () => {
    navigate("/studios"); // esta ruta la puedes definir luego
  };

  return (
    <>
      <header style={styles.header}>
        <div style={styles.logo}>StudioAgenda 🎤</div>
        <nav style={styles.nav}>
          <button onClick={handleGoToStudios} style={styles.navButton}>
            Buscar Estudios
          </button>
          <button onClick={handleBackToProfile} style={styles.navButton}>
            Volver al Perfil
          </button>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Cerrar Sesión
          </button>
        </nav>
      </header>

      <main style={styles.main}>
        <h1 style={styles.title}>Bienvenido, {user?.name} (Artista Urbano)</h1>
        <p>Aquí podrás gestionar tus grabaciones, agendar estudios y conectar con productores.</p>
        {/* Aquí luego agregaremos cards de estudios o un buscador */}
      </main>
    </>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#1a1a1a",
    color: "#fff"
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold"
  },
  nav: {
    display: "flex",
    gap: "1rem"
  },
  navButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  logoutButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  main: {
    padding: "2rem",
    backgroundColor: "#f4f4f4",
    minHeight: "calc(100vh - 72px)"
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem"
  }
};

export default ArtistProfile;
