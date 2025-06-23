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

        // Limpieza del formulario
        setNombreEstudio("");
        setComponents("");
        setPricePerHour("");
        setImages([]);

        // ✅ Redirigir a StudioLoged.jsx
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
        <div style={styles.logo}>StudioAgenda</div>
        <div>
          <button style={styles.button} onClick={() => navigate("/")}>
            Inicio
          </button>
          <button style={styles.button} onClick={() => navigate("/profile")}>
            Volver al Perfil
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <form style={styles.form} onSubmit={handleSubmit}>
          <h2 style={{ marginBottom: "1rem" }}>Registrar Estudio</h2>

          <label>Nombre del Estudio:</label>
          <input
            type="text"
            value={nombreEstudio}
            onChange={(e) => setNombreEstudio(e.target.value)}
            style={styles.input}
            placeholder="Ej: Estudio Underground"
            required
          />

          <label>Fotos del estudio :</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
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

          <label>Componentes del estudio:</label>
          <textarea
            style={styles.input}
            value={components}
            onChange={(e) => setComponents(e.target.value)}
            placeholder="Ej: Micrófonos, interfaz de audio, monitores, etc."
          />

          <label>Precio por hora (CLP):</label>
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
  logo: { fontSize: "1.5rem", fontWeight: "bold" },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "5px",
    marginLeft: "10px",
    cursor: "pointer",
  },
  main: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f0f2f5",
    padding: "2rem",
  },
  form: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "500px",
  },
  input: {
    width: "100%",
    padding: "0.6rem",
    marginBottom: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
    marginRight: "10px",
  },
  preview: {
    display: "flex",
    gap: "10px",
    marginBottom: "1rem",
  },
  submitButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "0.8rem",
    width: "100%",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default ProducerProfile;
