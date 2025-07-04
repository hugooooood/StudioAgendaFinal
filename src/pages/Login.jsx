import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate(); // ✅ ahora está dentro del componente
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = { email, password };

    try {
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate("/profile"); // ✅ redirección a la vista del perfil
      } else {
        alert(result.error || "Correo o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error al conectar:", error);
      alert("No se pudo conectar con el servidor");
    }
  };

  return (
    <>
      
      <main style={styles.main}>
        <div style={styles.card}>
          <h2 style={styles.title}>Iniciar Sesión</h2>
          <form style={styles.form} onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
            <button type="submit" style={styles.button}>Entrar</button>
          </form>
        </div>
      </main>
    </>
  );
};

const styles = {
  main: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
    padding: "1rem"
  },
  card: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    maxWidth: "800px",
    width: "100%"
  },
  title: {
    textAlign: "center",
    marginBottom: "1.5rem",
    fontSize: "1.8rem",
    color: "#333"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  },
  input: {
    padding: "0.8rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "6px"
  },
  button: {
    padding: "0.8rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default Login;
