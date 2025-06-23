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

  const handleReservar = async (estudioId, disponibilidad) => {
    try {
      const res = await fetch("http://localhost:4000/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          estudio_id: estudioId,
          artista_id: storedUser.id,
          fecha: disponibilidad.fecha,
          hora: disponibilidad.hora,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Reserva realizada con éxito.");
        setReservas((prev) => [...prev, data.reserva]);
      } else {
        alert("Error al reservar: " + data.message);
      }
    } catch (error) {
      console.error("Error al reservar:", error);
      alert("Ocurrió un error.");
    }
  };

  return (
    <div style={styles.container}>
      {/* Header personalizado */}
      <header style={styles.header}>
        <div style={styles.logo}>StudioAgenda 🎧</div>
        <div>
          <button style={styles.button} onClick={() => navigate("/artist-profile")}>
            Volver al Perfil
          </button>
          <button
            style={styles.button}
            onClick={() => {
              if (reservas.length === 0) {
                alert("No tienes reservas registradas.");
              } else {
                console.table(reservas);
                alert("Reservas cargadas en consola.");
              }
            }}
          >
            Ver Reservas
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
              <p style={{ fontStyle: "italic" }}>Sin horas disponibles</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "1rem 2rem",
    background: "#f8f9fa",
    minHeight: "100vh",
  },
  header: {
    backgroundColor: "#111",
    color: "#fff",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    borderRadius: "5px",
  },
  logo: {
    fontWeight: "bold",
    fontSize: "1.3rem",
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
  title: {
    textAlign: "center",
    marginBottom: "1.5rem",
    fontSize: "1.8rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    background: "#fff",
    borderRadius: "8px",
    padding: "1rem",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "6px",
    marginBottom: "1rem",
  },
  name: { margin: 0 },
  componentes: { fontStyle: "italic", color: "#555" },
  precio: { fontWeight: "bold", marginTop: "0.5rem" },
  subtitulo: {
    marginTop: "1rem",
    fontWeight: "bold",
    borderTop: "1px solid #ddd",
    paddingTop: "0.5rem",
  },
  dispBox: {
    marginTop: "0.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reserveButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "0.3rem 0.7rem",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ReservarEstudio;
