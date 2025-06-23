import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Estudios = () => {
  const [estudios, setEstudios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/api/studios/all")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setEstudios(data.estudios);
        }
      })
      .catch(err => console.error("❌ Error al cargar estudios:", err));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🎙️ Estudios disponibles</h2>
      <div style={styles.grid}>
        {estudios.map(estudio => (
          <div key={estudio.id} style={styles.card}>
            <img src={`http://localhost:4000${estudio.fotos[0]}`} alt="Estudio" style={styles.image} />
            <h4>{estudio.nombre_estudio}</h4>
            <p>💲 {estudio.precio_hora} CLP / hora</p>
            <button
              style={styles.button}
              onClick={() => navigate(`/estudio/${estudio.id}`)}
            >
              Ver detalles
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "1rem",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    borderRadius: "6px",
    marginBottom: "1rem",
  },
  button: {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Estudios;
