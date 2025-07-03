import React, { useEffect, useState } from "react";

const ArtistProfile = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/reservas/por-artista/${storedUser.id}`);
        const data = await res.json();
        if (data.success) {
          setReservas(data.reservas);
        }
      } catch (error) {
        console.error("Error al obtener reservas del artista:", error);
      }
    };

    fetchReservas();
  }, [storedUser.id]);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo}>StudioAgenda 🎤</div>
        <div>
          <button style={styles.button} onClick={() => window.location.href = "/estudios"}>
            Buscar Estudios
          </button>
          <button style={styles.button} onClick={() => window.location.href = "/profile"}>
            Volver al Perfil
          </button>
          <button
            style={styles.logoutButton}
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <h1 style={styles.title}>
          Bienvenido, <span style={styles.highlight}>{storedUser?.name}</span> 🎧
        </h1>
        <p style={styles.subtitle}>
          Este es tu espacio como artista. Gestiona tus reservas, tu perfil y conecta con estudios de grabación.
        </p>

        <div style={styles.cardContainer}>
          {/* Tarjeta de Perfil */}
          <div style={styles.profileCard}>
            <img
              src={
                storedUser?.image
                  ? `http://localhost:4000${storedUser.image}`
                  : "https://via.placeholder.com/150"
              }
              alt="Perfil"
              style={styles.profileImage}
            />
            <h3 style={styles.name}>{storedUser?.name}</h3>
            <p style={styles.bio}>{storedUser?.bio || "Sin biografía aún. Agrega una desde tu perfil."}</p>
          </div>

          {/* Tarjeta de Reservas */}
          <div style={styles.reservasCard}>
            <h3 style={{ marginBottom: "1rem" }}>Mis Reservas</h3>
            {reservas.length === 0 ? (
              <p style={{ opacity: 0.7 }}>No tienes reservas activas aún.</p>
            ) : (
              reservas.map((reserva, index) => (
                <div key={index} style={styles.reservaItem}>
                  <p><strong>Estudio:</strong> {reserva.estudio?.nombre_estudio}</p>
                  <p><strong>Dirección:</strong> {reserva.estudio?.direccion}</p>
                  <p><strong>Fecha:</strong> {reserva.fecha}</p>
                  <p><strong>Hora:</strong> {reserva.hora}</p>
                  <p><strong>Estado:</strong> {reserva.estado}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const styles = {
  container: {
    background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
    minHeight: "100vh",
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
  },
  logo: {
    fontWeight: "bold",
    fontSize: "1.7rem",
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
  logoutButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    marginLeft: "0.5rem",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
  },
  main: {
    padding: "3rem 2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "0.5rem",
  },
  highlight: {
    color: "#00d2ff",
  },
  subtitle: {
    fontSize: "1.1rem",
    maxWidth: "600px",
    marginBottom: "2rem",
    opacity: 0.85,
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    justifyContent: "center",
    width: "100%",
  },
  profileCard: {
    backgroundColor: "#ffffff",
    color: "#000",
    borderRadius: "15px",
    padding: "2rem",
    width: "320px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    textAlign: "center",
  },
  reservasCard: {
    backgroundColor: "#ffffff",
    color: "#000",
    borderRadius: "15px",
    padding: "2rem",
    width: "380px",
    maxHeight: "500px",
    overflowY: "auto",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    textAlign: "left",
  },
  profileImage: {
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "1rem",
    border: "4px solid #007bff",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
  },
  name: {
    fontSize: "1.4rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  bio: {
    fontSize: "1rem",
    opacity: 0.8,
  },
  reservaItem: {
    backgroundColor: "#f0f0f0",
    borderRadius: "10px",
    padding: "1rem",
    marginBottom: "1rem",
    fontSize: "0.95rem",
    color: "#000",
  },
};

export default ArtistProfile;
  