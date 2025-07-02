import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ReservaExitosa = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reserva = location.state?.reserva;

  if (!reserva) {
    return (
      <div style={styles.container}>
        <h2>Error: No hay datos de la reserva</h2>
        <button onClick={() => navigate("/estudios")} style={styles.button}>Volver</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>✅ ¡Reserva Exitosa!</h1>
      <p>Tu sesión fue reservada correctamente.</p>
      <div style={styles.details}>
        <p><strong>Estudio ID:</strong> {reserva.estudio_id}</p>
        <p><strong>Artista ID:</strong> {reserva.artista_id}</p>
        <p><strong>Fecha:</strong> {reserva.fecha}</p>
        <p><strong>Hora:</strong> {reserva.hora}</p>
      </div>
      <div style={styles.buttons}>
        <button onClick={() => navigate("/estudios")} style={styles.button}>Reservar otra hora</button>
        <button onClick={() => navigate("/artist-profile")} style={styles.button}>Volver al perfil</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    textAlign: "center",
    background: "#f4f4f4",
    minHeight: "100vh",
  },
  details: {
    background: "#fff",
    padding: "1rem",
    margin: "1rem auto",
    borderRadius: "8px",
    width: "300px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  buttons: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ReservaExitosa;
