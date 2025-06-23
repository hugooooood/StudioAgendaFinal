import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css"; // asegúrate de que exista
import studioBg from "../assets/studio2.jpg";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.nombre, // ✅ CORREGIDO AQUÍ
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (data.success || data.user) {
        alert("Registrado correctamente");
        navigate("/login");
      } else {
        alert(`Error al registrar: ${data.message || "undefined"}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error al registrar: conexión fallida");
    }
  };

  return (
    <div
      className="register-container"
      style={{
        backgroundImage: `url(${studioBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        paddingTop: "50px",
      }}
    >
      <div className="form-wrapper">
        <h2>Crear una cuenta</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre completo:</label>
          <input type="text" name="nombre" onChange={handleChange} required />

          <label>Correo electrónico:</label>
          <input type="email" name="email" onChange={handleChange} required />

          <label>Contraseña:</label>
          <input type="password" name="password" onChange={handleChange} required />

          <label>Confirmar contraseña:</label>
          <input type="password" name="confirmPassword" onChange={handleChange} required />

          <button type="submit">Registrarse</button>
        </form>
        <p>
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
