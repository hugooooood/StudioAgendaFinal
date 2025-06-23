import React, { useState, useEffect } from "react";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [availability, setAvailability] = useState([]);
  const [estudioId, setEstudioId] = useState(null);

  const hours = [
    "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id) {
      fetch(`http://localhost:4000/api/studios/user/${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.studio && data.studio.id) {
            setEstudioId(data.studio.id);
            fetchAvailability(data.studio.id);
          }
        });
    }
  }, []);

  const fetchAvailability = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/availability/by-studio/${id}`);
      const data = await res.json();
      if (data.success) {
        setAvailability(data.disponibilidades);
      }
    } catch (err) {
      console.error("❌ Error cargando disponibilidades:", err);
    }
  };

  const handleAddAvailability = async () => {
    if (!estudioId || !selectedDate || !selectedHour) return;

    if (availability.some(a => a.fecha === selectedDate && a.hora === selectedHour)) {
      alert("Ya existe esa disponibilidad.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          estudio_id: estudioId,
          fecha: selectedDate,
          hora: selectedHour
        }),
      });

      const data = await res.json();
      if (data.success) {
        setAvailability([...availability, data.disponibilidad]);
      } else {
        alert(data.message || "Error.");
      }
    } catch (err) {
      console.error("❌ Error al guardar disponibilidad:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta disponibilidad?")) return;

    try {
      const res = await fetch(`http://localhost:4000/api/availability/${id}`, {
        method: "DELETE"
      });

      const data = await res.json();
      if (data.success) {
        setAvailability(availability.filter(a => a.id !== id));
      } else {
        alert("No se pudo eliminar.");
      }
    } catch (err) {
      console.error("❌ Error al eliminar:", err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📅 Disponibilidad para grabaciones</h2>

      <div style={styles.form}>
        <label>Selecciona un día:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={styles.input}
        />

        <label>Selecciona una hora:</label>
        <select
          value={selectedHour}
          onChange={(e) => setSelectedHour(e.target.value)}
          style={styles.input}
        >
          <option value="">-- Selecciona una hora --</option>
          {hours.map((h) => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>

        <button onClick={handleAddAvailability} style={styles.button}>
          Agregar disponibilidad
        </button>
      </div>

      <h3 style={{ marginTop: "2rem" }}>Horarios disponibles:</h3>
      <ul style={{ padding: 0 }}>
        {availability.map((a) => (
          <li key={a.id} style={styles.item}>
            {a.fecha} - {a.hora}
            <button onClick={() => handleDelete(a.id)} style={styles.deleteButton}>❌</button>
          </li>
        ))}
      </ul>
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
    marginBottom: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.6rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "0.6rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  item: {
    listStyle: "none",
    marginBottom: "0.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "0.3rem 0.6rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Calendar;
