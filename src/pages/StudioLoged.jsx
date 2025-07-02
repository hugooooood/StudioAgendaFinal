import React from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../components/Calendar";

const StudioLoged = () => {
  const navigate = useNavigate();

  return (
    <>
      <header style={styles.header}>
        <div style={styles.logo}>🎵StudioAgenda</div>
        <div>
          <button style={styles.button} onClick={() => navigate("/profile")}>
            Volver al Perfil
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <h1 style={styles.title}>🎙️ Estudio registrado correctamente</h1>
        <p style={styles.subtitle}>¡Bienvenido al panel de tu estudio!</p>

        <Calendar />
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
    color: "#fff",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  main: {
    padding: "2rem",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "0.5rem",
  },
  subtitle: {
    fontSize: "1.1rem",
    textAlign: "center",
    marginBottom: "2rem",
  },
};

export default StudioLoged;
