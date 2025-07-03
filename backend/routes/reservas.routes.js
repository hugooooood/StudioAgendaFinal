const express = require("express");
const router = express.Router();
const pool = require("../db");

// POST: Crear una nueva reserva (y eliminar la disponibilidad tomada)
router.post("/", async (req, res) => {
  const { estudio_id, artista_id, fecha, hora } = req.body;

  if (!estudio_id || !artista_id || !fecha || !hora) {
    return res.status(400).json({
      success: false,
      message: "Faltan campos requeridos.",
    });
  }

  try {
    // Validar que exista disponibilidad
    const disponibilidad = await pool.query(
      `SELECT * FROM disponibilidades WHERE estudio_id = $1 AND fecha = $2 AND hora = $3`,
      [estudio_id, fecha, hora]
    );

    if (disponibilidad.rows.length === 0) {
      return res.status(409).json({
        success: false,
        message: "La hora ya fue tomada o no existe.",
      });
    }

    // Insertar reserva
    const result = await pool.query(
      `INSERT INTO reservas (estudio_id, artista_id, fecha, hora, estado)
       VALUES ($1, $2, $3, $4, 'confirmada')
       RETURNING *`,
      [estudio_id, artista_id, fecha, hora]
    );

    // Eliminar disponibilidad tomada
    await pool.query(
      `DELETE FROM disponibilidades WHERE estudio_id = $1 AND fecha = $2 AND hora = $3`,
      [estudio_id, fecha, hora]
    );

    res.status(201).json({ success: true, reserva: result.rows[0] });
  } catch (error) {
    console.error("❌ Error al crear reserva:", error);
    res.status(500).json({
      success: false,
      message: "Error del servidor al crear reserva.",
    });
  }
});

// GET: Obtener reservas por ID de artista
router.get("/usuario/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT r.*, e.nombre_estudio, e.precio_hora
       FROM reservas r
       JOIN estudios e ON r.estudio_id = e.id
       WHERE r.artista_id = $1
       ORDER BY r.fecha, r.hora`,
      [id]
    );

    res.json({ success: true, reservas: result.rows });
  } catch (error) {
    console.error("❌ Error al obtener reservas del usuario:", error);
    res.status(500).json({ success: false, message: "Error del servidor." });
  }
});

// GET: Reservas resumen
router.get("/por-artista/:id", async (req, res) => {
  const artistaId = req.params.id;

  try {
    const result = await pool.query(
      `SELECT r.*, e.nombre_estudio
       FROM reservas r
       JOIN estudios e ON r.estudio_id = e.id
       WHERE r.artista_id = $1
       ORDER BY r.fecha DESC, r.hora ASC`,
      [artistaId]
    );

    const reservas = result.rows.map((r) => ({
      id: r.id,
      fecha: r.fecha,
      hora: r.hora,
      estado: r.estado,
      estudio: {
        nombre_estudio: r.nombre_estudio,
      },
    }));

    res.json({ success: true, reservas });
  } catch (error) {
    console.error("❌ Error al obtener reservas del artista:", error.message);
    res.status(500).json({ success: false, message: "Error al obtener reservas del artista" });
  }
});

module.exports = router;
