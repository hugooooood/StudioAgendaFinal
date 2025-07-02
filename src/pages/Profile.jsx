import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser);
  const [editing, setEditing] = useState(false);
  const [hasStudio, setHasStudio] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    image: user?.image || "",
    file: null,
  });

  useEffect(() => {
    const checkIfUserHasStudio = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/studios/user/${storedUser.id}`);
        const data = await res.json();
        if (data?.studio) {
          setHasStudio(true);
        }
      } catch (error) {
        console.error("Error al verificar estudio:", error);
      }
    };

    if (storedUser?.id) {
      checkIfUserHasStudio();
    }
  }, [storedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, file }));
  };

  const handleSave = async () => {
    const body = new FormData();
    body.append("name", formData.name);
    body.append("bio", formData.bio);
    if (formData.file) body.append("image", formData.file);

    try {
      const res = await fetch(`http://localhost:4000/api/users/${user.id}/profile`, {
        method: "PUT",
        body,
      });

      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        setEditing(false);
      } else {
        alert("Error al guardar cambios");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error en el servidor");
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      bio: user.bio || "",
      image: user.image || "",
      file: null,
    });
    setEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <>
      <header style={styles.header}>
        <div style={styles.logo}>🎵StudioAgenda</div>
        <div>
          <button onClick={() => navigate("/artist-profile")} style={styles.navButton}>
            Perfil Artista
          </button>
          <button onClick={() => navigate("/producer-profile")} style={styles.navButton}>
            Perfil Productor
          </button>
          <button onClick={() => navigate("/")} style={styles.homeButton}>
            Inicio
          </button>
          {hasStudio && (
            <button onClick={() => navigate("/studio-loged")} style={styles.studioButton}>
              Mi Estudio
            </button>
          )}
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.card}>
          <h2>Perfil del Usuario</h2>

          <div style={{ textAlign: "center" }}>
            <img
              src={
                formData.file
                  ? URL.createObjectURL(formData.file)
                  : formData.image
                    ? `http://localhost:4000${formData.image}`
                    : "https://via.placeholder.com/150"
              }
              alt="Foto de perfil"
              style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover" }}
            />
            {editing && (
              <input type="file" accept="image/*" onChange={handleFileChange} />
            )}
          </div>

          <label>Nombre:</label>
          {editing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
            />
          ) : (
            <p>{user.name}</p>
          )}

          <label>Biografía:</label>
          {editing ? (
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              style={styles.textarea}
            />
          ) : (
            <p>{user.bio || "Sin biografía"}</p>
          )}

          {editing ? (
            <div style={styles.buttonGroup}>
              <button onClick={handleSave} style={styles.saveButton}>Guardar</button>
              <button onClick={handleCancel} style={styles.cancelButton}>Cancelar</button>
            </div>
          ) : (
            <button onClick={() => setEditing(true)} style={styles.editButton}>
              Editar Perfil
            </button>
          )}

          <button onClick={handleLogout} style={styles.logoutButton}>
            Cerrar Sesión
          </button>
        </div>
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
    color: "#fff"
  },
  logo: { fontSize: "1.5rem", fontWeight: "bold" },
  homeButton: {
    backgroundColor: "#007bff",
    border: "none",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "0.5rem",
  },
  navButton: {
    backgroundColor: "#6c757d",
    border: "none",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "0.5rem"
  },
  studioButton: {
    backgroundColor: "#17a2b8",
    border: "none",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "0.5rem"
  },
  main: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f0f2f5",
  },
  card: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
    width: "100%",
  },
  input: {
    width: "100%",
    padding: "0.6rem",
    marginBottom: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "0.6rem",
    height: "100px",
    marginBottom: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  editButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "0.8rem",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    width: "100%",
    cursor: "pointer",
    marginBottom: "1rem",
  },
  saveButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "0.8rem",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    width: "48%",
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#ffc107",
    color: "#fff",
    padding: "0.8rem",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    width: "48%",
    cursor: "pointer",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
    marginBottom: "1rem",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: "0.8rem",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    width: "100%",
    cursor: "pointer",
  },
};

export default Profile;
