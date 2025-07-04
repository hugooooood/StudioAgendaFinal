import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ReservarEstudio = () => {
  const [estudios, setEstudios] = useState([]);
  const [reservas, setReservas] = useState([]);
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch("http://localhost:4000/api/studios/all")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setEstudios(data.estudios);
      })
      .catch((error) => {
        console.error("Error al obtener estudios:", error);
      });
  }, []);

  const handleReservar = (estudioId, disponibilidad) => {
    const estudio = estudios.find((e) => e.id === estudioId);

    const reservaConEstudio = {
      estudio_id: estudioId,
      artista_id: storedUser.id,
      fecha: disponibilidad.fecha,
      hora: disponibilidad.hora,
      nombre_estudio: estudio?.nombre_estudio,
      precio: estudio?.precio_hora,
    };

    navigate("/pago", { state: { reserva: reservaConEstudio } });
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo}>StudioAgenda 🎧</div>
        <div>
          <button style={styles.button} onClick={() => navigate("/artist-profile")}>
            Volver al Perfil
          </button>
          
        </div>
      </header>

      <h2 style={styles.title}>Estudios Disponibles</h2>
      <div style={styles.grid}>
        {estudios.map((estudio) => (
          <div key={estudio.id} style={styles.card}>
            <img
              src={`http://localhost:4000${estudio.fotos[0]}`}
              alt="Estudio"
              style={styles.image}
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/300x150?text=Sin+imagen")
              }
            />
            <h4 style={styles.name}>{estudio.nombre_estudio}</h4>
            <p style={styles.componentes}>{estudio.componentes}</p>
            <p style={styles.precio}>Precio por hora: ${estudio.precio_hora}</p>
            <p style={styles.subtitulo}>Disponibilidades:</p>
            {estudio.disponibilidades.length > 0 ? (
              estudio.disponibilidades.map((disp) => (
                <div key={disp.id} style={styles.dispBox}>
                  <span>{disp.fecha.split("T")[0]} - {disp.hora}</span>
                  <button
                    style={styles.reserveButton}
                    onClick={() => handleReservar(estudio.id, disp)}
                  >
                    Reservar
                  </button>
                </div>
              ))
            ) : (
              <p style={styles.sinDisponibles}>Sin horas disponibles</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
    minHeight: "100vh",
    padding: "2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#fff",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem 2rem",
    backgroundColor: "#111",
    color: "#fff",
    alignItems: "center",
    borderBottom: "2px solid #333",
    borderRadius: "8px",
    marginBottom: "2rem",
  },
  logo: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    letterSpacing: "1px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    marginLeft: "0.5rem",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
  },
  title: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "1.5rem",
    fontWeight: "bold",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "2rem",
  },
  card: {
    backgroundColor: "#fff",
    color: "#000",
    borderRadius: "15px",
    padding: "1.5rem",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "1rem",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  },
  name: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "0.3rem",
  },
  componentes: {
    fontStyle: "italic",
    color: "#555",
    marginBottom: "0.5rem",
  },
  precio: {
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  subtitulo: {
    fontWeight: "bold",
    borderTop: "1px solid #ddd",
    paddingTop: "0.5rem",
    marginBottom: "0.5rem",
  },
  dispBox: {
    backgroundColor: "#f0f0f0",
    color: "#000",
    borderRadius: "10px",
    padding: "0.5rem 1rem",
    marginBottom: "0.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reserveButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "0.3rem 0.8rem",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  sinDisponibles: {
    fontStyle: "italic",
    color: "#ccc",
  },
};

export default ReservarEstudio;
