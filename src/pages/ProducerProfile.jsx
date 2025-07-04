import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProducerProfile = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [nombreEstudio, setNombreEstudio] = useState("");
  const [images, setImages] = useState([]);
  const [components, setComponents] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");

  const handleImageChange = (e) => {
    const selected = Array.from(e.target.files).slice(0, 3);
    setImages(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre_estudio", nombreEstudio);
    formData.append("componentes", components);
    formData.append("precio_hora", pricePerHour);
    formData.append("user_id", storedUser.id);
    images.forEach((img) => formData.append("images", img));

    try {
      const res = await fetch("http://localhost:4000/api/studios", {
        method: "POST",
        body: formData,
      });

      const text = await res.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Respuesta no válida del servidor: " + text);
      }

      if (data.success) {
        alert("🎉 Estudio registrado correctamente");
        setNombreEstudio("");
        setComponents("");
        setPricePerHour("");
        setImages([]);
        navigate("/studio-loged");
      } else {
        alert("⚠️ Error al registrar el estudio: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Fallo al conectar con el servidor:\n" + error.message);
    }
  };

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
            <h2 style={styles.title}>Registrar Estudio</h2>
            <form onSubmit={handleSubmit}>
              <label style={styles.label}>Nombre del Estudio:</label>
              <input
                type="text"
                value={nombreEstudio}
                onChange={(e) => setNombreEstudio(e.target.value)}
                style={styles.input}
                placeholder="Ej: Estudio Underground"
                required
              />

              <label style={styles.label}>Fotos del estudio:</label>
              <input type="file" accept="image/*" multiple onChange={handleImageChange} />
              <div style={styles.preview}>
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(img)}
                    alt={`preview-${i}`}
                    style={styles.image}
                  />
                ))}
              </div>

              <label style={styles.label}>Componentes del estudio:</label>
              <textarea
                style={styles.input}
                value={components}
                onChange={(e) => setComponents(e.target.value)}
                placeholder="Micrófonos, interfaz de audio, monitores, etc."
              />

              <label style={styles.label}>Precio por hora (CLP):</label>
              <input
                type="number"
                style={styles.input}
                value={pricePerHour}
                onChange={(e) => setPricePerHour(e.target.value)}
                placeholder="Ej: 15000"
              />

              <button type="submit" style={styles.submitButton}>
                Guardar Estudio
              </button>
            </form>
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
  logo: { fontSize: "1.5rem", fontWeight: "bold" },
  navButton: {
    backgroundColor: "#6c757d",
    border: "none",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "0.5rem",
  },
  background: {
    background: "url('./src/assets/studio-bg.jpg') center/cover no-repeat",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    padding: "2rem",
    width: "100%",
    maxWidth: "600px",
  },
  card: {
    backgroundColor: "#ffffffee",
    borderRadius: "16px",
    padding: "2rem",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    textAlign: "center",
  },
  label: {
    fontWeight: "bold",
    marginTop: "1rem",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginTop: "0.3rem",
  },
  preview: {
    display: "flex",
    gap: "10px",
    marginTop: "0.5rem",
    marginBottom: "1rem",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  submitButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "0.8rem",
    width: "100%",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "1rem",
    transition: "background-color 0.3s ease",
  },
};

export default ProducerProfile;
