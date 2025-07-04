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
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.logo}>StudioAgenda 🎵</div>
        <div>
          <button style={styles.button} onClick={() => navigate("/artist-profile")}>
            Perfil Artista
          </button>
          {!hasStudio && (
            <button style={styles.button} onClick={() => navigate("/producer-profile")}>
              Crear Estudio
            </button>
          )}
          {hasStudio && (
            <button style={styles.button} onClick={() => navigate("/studio-loged")}>
              Mi Estudio
            </button>
          )}
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.card}>
          <h2 style={styles.title}>Perfil del Usuario</h2>

          <div style={styles.imageWrapper}>
            <img
              src={
                formData.file
                  ? URL.createObjectURL(formData.file)
                  : formData.image
                  ? `http://localhost:4000${formData.image}`
                  : "https://via.placeholder.com/150"
              }
              alt="Foto de perfil"
              style={styles.image}
            />
            {editing && <input type="file" accept="image/*" onChange={handleFileChange} />}
          </div>

          <label style={styles.label}>Nombre:</label>
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

          <label style={styles.label}>Biografía:</label>
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
              <button onClick={handleSave} style={styles.saveButton}>
                Guardar
              </button>
              <button onClick={handleCancel} style={styles.cancelButton}>
                Cancelar
              </button>
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
    </div>
  );
};

const styles = {
  page: {
    background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#000",
  },
  header: {
    backgroundColor: "#111",
    color: "#fff",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid #444",
  },
  logo: {
    fontSize: "1.6rem",
    fontWeight: "bold",
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
  main: {
    display: "flex",
    justifyContent: "center",
    padding: "2rem",
  },
  card: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    width: "100%",
    maxWidth: "500px",
  },
  title: {
    textAlign: "center",
    marginBottom: "1.5rem",
    fontSize: "1.8rem",
    fontWeight: "bold",
  },
  imageWrapper: {
    textAlign: "center",
    marginBottom: "1rem",
  },
  image: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "0.5rem",
  },
  label: {
    fontWeight: "bold",
    marginTop: "1rem",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "0.6rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginTop: "0.3rem",
  },
  textarea: {
    width: "100%",
    padding: "0.6rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginTop: "0.3rem",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1.5rem",
    gap: "1rem",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "0.8rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#ffc107",
    color: "#fff",
    padding: "0.8rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  editButton: {
    width: "100%",
    backgroundColor: "#17a2b8",
    color: "#fff",
    padding: "0.8rem",
    border: "none",
    borderRadius: "8px",
    marginTop: "1.5rem",
    cursor: "pointer",
  },
  logoutButton: {
    width: "100%",
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: "0.8rem",
    border: "none",
    borderRadius: "8px",
    marginTop: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Profile;
