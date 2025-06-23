import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EstudioDetalle = () => {
  const { id } = useParams();
  const [estudio, setEstudio] = useState(null);
  const [disponibilidades, setDisponibilidades] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/studios/${id}/detalle`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEstudio(data.estudio);
          setDisponibilidades(data.disponibilidades);
        }
      })
      .catch((err) => console.error("❌ Error:", err));
  }, [id]);

  const agendarHora = async (fecha, hora) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      alert("Debes iniciar sesión como artista.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          estudio_id: estudio.id,
          artista_id: user.id,
          fecha,
          hora
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Reserva realizada con éxito. Pendiente de pago.");
      } else {
        alert("⚠️ " + (data.message || "No se pudo reservar."));
      }
    } catch (err) {
      console.error("❌ Error al reservar:", err);
      alert("❌ Error al intentar reservar.");
    }
  };

  if (!estudio) return <p style={styles.loading}>Cargando estudio...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{estudio.nombre_estudio}</h2>
      <img
        src={`http://localhost:4000${estudio.foto}`}
        alt="Estudio"
        style={styles.image}
      />
      <p><strong>Precio por hora:</strong> {estudio.precio_hora} CLP</p>
      <p><strong>Componentes:</strong> {estudio.componentes}</p>

      <h3 style={{ marginTop: "2rem" }}>🗓️ Disponibilidades:</h3>
      {disponibilidades.length === 0 ? (
        <p>No hay horas disponibles aún.</p>
      ) : (
        <ul style={styles.list}>
          {disponibilidades.map((d) => (
            <li key={d.id} style={styles.item}>
              {d.fecha} - {d.hora}
              <button onClick={() => agendarHora(d.fecha, d.hora)} style={styles.button}>
                Agendar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "2rem",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "1rem",
  },
  image: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "1rem",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.5rem",
    borderBottom: "1px solid #ddd",
    paddingBottom: "0.5rem",
  },
  button: {
    padding: "0.4rem 0.8rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  loading: {
    textAlign: "center",
    marginTop: "3rem",
    fontSize: "1.2rem",
  },
};

export default EstudioDetalle;
