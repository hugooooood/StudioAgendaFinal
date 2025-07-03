import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PagoSimulado = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { reserva } = location.state || {};

  const confirmarPago = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          estudio_id: reserva.estudio_id,
          artista_id: reserva.artista_id,
          fecha: reserva.fecha,
          hora: reserva.hora,
        }),
      });

      const data = await res.json();

      if (data.success) {
        navigate("/reserva-exitosa", {
          state: {
            reserva: {
              nombre_estudio: reserva.nombre_estudio,
              direccion: reserva.direccion,
              fecha: reserva.fecha,
              hora: reserva.hora,
              precio: reserva.precio,
            },
          },
        });
      } else {
        alert("Error al confirmar la reserva: " + data.message);
        navigate("/estudios");
      }
    } catch (err) {
      console.error("Error al confirmar pago:", err);
      alert("Error al confirmar pago.");
      navigate("/estudios");
    }
  };

  if (!reserva) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2>Error: No hay datos de la reserva</h2>
          <button style={styles.cancel} onClick={() => navigate("/estudios")}>
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Simulación de pago</h2>
        <p><strong>Estudio:</strong> {reserva.nombre_estudio}</p>
        <p><strong>Dirección:</strong> {reserva.direccion}</p>
        <p><strong>Precio:</strong> ${reserva.precio}</p>
        <p><strong>Fecha:</strong> {reserva.fecha}</p>
        <p><strong>Hora:</strong> {reserva.hora}</p>
        <div style={styles.buttons}>
          <button style={styles.confirm} onClick={confirmarPago}>Confirmar pago</button>
          <button style={styles.cancel} onClick={() => navigate("/estudios")}>Volver a ver horarios</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f1f1f1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    width: "350px",
    textAlign: "center",
  },
  buttons: {
    marginTop: "1.5rem",
    display: "flex",
    justifyContent: "space-between",
  },
  confirm: {
    padding: "0.5rem 1rem",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  cancel: {
    padding: "0.5rem 1rem",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default PagoSimulado;
