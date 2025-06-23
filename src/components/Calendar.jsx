import React, { useState } from "react";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [availability, setAvailability] = useState([]);

  const hours = [
    "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  const handleAddAvailability = () => {
    if (!selectedDate || !selectedHour) return;

    const exists = availability.some(
      (a) => a.date === selectedDate && a.hour === selectedHour
    );
    if (exists) return alert("Ya has agregado esta disponibilidad.");

    setAvailability([...availability, { date: selectedDate, hour: selectedHour }]);
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
      <ul>
        {availability.map((a, i) => (
          <li key={i}>
            {a.date} - {a.hour}
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
};

export default Calendar;
