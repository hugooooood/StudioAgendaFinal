import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../components/Calendar";

const StudioLoged = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/reservas/por-productor/${storedUser.id}`);
        const data = await res.json();
        if (data.success) {
          setReservas(data.reservas);
        }
      } catch (error) {
        console.error("Error al obtener reservas:", error);
      }
    };

    fetchReservas();
  }, [storedUser.id]);

  return (
    <>
      <header style={styles.header}>
        <div style={styles.logo}>🎵StudioAgenda</div>
        <div>
          <button style={styles.navButton} onClick={() => navigate("/profile")}>
            Volver al Perfil
          </button>
        </div>
      </header>

      <div style={styles.background}>
        <div style={styles.container}>
          <div style={styles.card}>
            <h1 style={styles.title}>🎙️ Estudio registrado correctamente</h1>
            <p style={styles.subtitle}>¡Bienvenido al panel de tu estudio!</p>

            <Calendar />

            <h2 style={styles.reservasTitle}>Reservas recibidas</h2>
            {reservas.length === 0 ? (
              <p style={styles.noReservas}>Aún no tienes reservas.</p>
            ) : (
              <div style={styles.reservaList}>
                {reservas.map((reserva) => (
  <div key={reserva.id} style={styles.reservaItem}>
    <p><strong>Artista:</strong> {reserva.nombre_artista || "Nombre no disponible"}</p>
    <p><strong>Fecha:</strong> {reserva.fecha.split("T")[0]} - {reserva.hora}</p>
    <p><strong>Estado:</strong> {reserva.estado}</p>
    <button
      onClick={async () => {
        if (window.confirm("¿Estás seguro de cancelar esta reserva?")) {
          try {
            const res = await fetch(`http://localhost:4000/api/reservas/${reserva.id}`, {
              method: "DELETE",
            });
            const data = await res.json();
            if (data.success) {
              setReservas(prev => prev.filter(r => r.id !== reserva.id));
            }
          } catch (err) {
            console.error("Error al cancelar reserva:", err);
          }
        }
      }}
      style={styles.cancelButton}
    >
      Cancelar Reserva
    </button>
  </div>
))}
              </div>
            )}
          </div>
        </div>
      </div>
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
  navButton: {
    backgroundColor: "#6c757d",
    border: "none",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    cursor: "pointer",
    marginLeft: "0.5rem",
  },
  background: {
    background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },
  container: {
    width: "100%",
    maxWidth: "800px",
  },
  card: {
    backgroundColor: "#ffffffee",
    borderRadius: "16px",
    padding: "2rem",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "1rem",
  },
  subtitle: {
    fontSize: "1.1rem",
    textAlign: "center",
    marginBottom: "2rem",
  },
  reservasTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginTop: "2rem",
    marginBottom: "1rem",
    borderBottom: "1px solid #ccc",
    paddingBottom: "0.5rem",
  },
  noReservas: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#555",
  },
  reservaList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  reservaItem: {
    backgroundColor: "#f9f9f9",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  cancelButton: {
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  padding: "0.5rem 1rem",
  borderRadius: "6px",
  cursor: "pointer",
  marginTop: "0.5rem"
},

};


export default StudioLoged;
