import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ReservarEstudio = () => {
  const [estudios, setEstudios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEstudios = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/studios/all");
        const data = await response.json();
        if (data.success) setEstudios(data.estudios);
      } catch (error) {
        console.error("Error al obtener estudios:", error);
      }
    };

    fetchEstudios();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Estudios Disponibles</h2>
      <div style={styles.grid}>
        {estudios.map((estudio) => (
          <div key={estudio.id} style={styles.card}>
            <img
              src={`http://localhost:4000${estudio.fotos[0]}`}
              alt="Estudio"
              style={styles.image}
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/300x150?text=Sin+imagen")
              }
            />
            <h4 style={styles.name}>{estudio.nombre_estudio}</h4>
            <p style={styles.componentes}>{estudio.componentes}</p>
            <p style={styles.precio}>
              Precio por hora: ${estudio.precio_hora}
            </p>
            <p style={styles.subtitulo}>Disponibilidades:</p>
            {estudio.disponibilidades.length > 0 ? (
              estudio.disponibilidades.map((disp) => (
                <div key={disp.id} style={styles.dispBox}>
                  <span>
                    {disp.fecha.split("T")[0]} - {disp.hora}
                  </span>
                  <button
                    style={styles.button}
                    onClick={() => navigate(`/reservar/${estudio.id}`)}
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
    padding: "2rem",
    background: "#f8f9fa",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    background: "#fff",
    borderRadius: "8px",
    padding: "1rem",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
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
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ReservarEstudio;
