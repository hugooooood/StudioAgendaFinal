import React from "react";

const ArtistProfile = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo}>StudioAgenda 🎤</div>
        <div>
          <button style={styles.button} onClick={() => window.location.href = "/estudios"}>
            Buscar Estudios
          </button>
          <button style={styles.button} onClick={() => window.location.href = "/profile"}>
            Volver al Perfil
          </button>
          <button
            style={styles.logoutButton}
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <h1>Bienvenido, {storedUser?.name} (Artista Urbano)</h1>
        <p>
          Aquí podrás gestionar tus grabaciones, agendar estudios y conectar con
          productores.
        </p>
      </main>
    </div>
  );
};

const styles = {
  container: {
    background: "#f1f2f6",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem 2rem",
    backgroundColor: "#111",
    color: "#fff",
  },
  logo: {
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    marginLeft: "0.5rem",
    cursor: "pointer",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    marginLeft: "0.5rem",
    cursor: "pointer",
  },
  main: {
    padding: "2rem",
  },
};

export default ArtistProfile;
