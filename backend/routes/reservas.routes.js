const express = require("express");
const router = express.Router();
const pool = require("../db"); // ✅ subir un nivel desde /routes

// POST: Crear una nueva reserva
router.post("/reservas", async (req, res) => {
  const { estudio_id, artista_id, fecha, hora } = req.body;

  if (!estudio_id || !artista_id || !fecha || !hora) {
    return res.status(400).json({
      success: false,
      message: "Faltan campos requeridos.",
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO reservas (estudio_id, artista_id, fecha, hora)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (estudio_id, artista_id, fecha, hora) DO NOTHING
       RETURNING *`,
      [estudio_id, artista_id, fecha, hora]
    );

    if (result.rows.length === 0) {
      return res.status(409).json({
        success: false,
        message: "Ya existe una reserva para ese horario.",
      });
    }

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
router.get("/reservas/usuario/:id", async (req, res) => {
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

module.exports = router;
