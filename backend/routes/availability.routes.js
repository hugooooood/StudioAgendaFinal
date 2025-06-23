const express = require("express");
const router = express.Router();
const pool = require("../db");

// POST: Guardar una nueva disponibilidad
router.post("/availability", async (req, res) => {
  const { estudio_id, fecha, hora } = req.body;

  console.log("📥 Recibido en backend:", req.body);

  if (!estudio_id || !fecha || !hora) {
    return res.status(400).json({
      success: false,
      message: "Faltan campos requeridos.",
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO disponibilidades (estudio_id, fecha, hora)
       VALUES ($1, $2, $3)
       ON CONFLICT (estudio_id, fecha, hora) DO NOTHING
       RETURNING *`,
      [estudio_id, fecha, hora]
    );

    if (result.rows.length === 0) {
      return res.status(200).json({ success: false, message: "La disponibilidad ya existe." });
    }

    res.status(201).json({ success: true, disponibilidad: result.rows[0] });
  } catch (error) {
    console.error("❌ Error al guardar disponibilidad:", error);
    res.status(500).json({ success: false, message: "Error en el servidor." });
  }
});

// GET: Obtener disponibilidades por estudio
router.get("/availability/by-studio/:id", async (req, res) => {
  const estudioId = req.params.id;

  try {
    const result = await pool.query(
      "SELECT * FROM disponibilidades WHERE estudio_id = $1 ORDER BY fecha, hora",
      [estudioId]
    );

    res.json({ success: true, disponibilidades: result.rows });
  } catch (error) {
    console.error("❌ Error al obtener disponibilidades:", error);
    res.status(500).json({ success: false, message: "Error al cargar disponibilidades." });
  }
});

// DELETE: Eliminar disponibilidad por ID
router.delete("/availability/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await pool.query("DELETE FROM disponibilidades WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: "Disponibilidad no encontrada." });
    }

    res.json({ success: true, message: "Disponibilidad eliminada.", deleted: result.rows[0] });
  } catch (error) {
    console.error("❌ Error al eliminar disponibilidad:", error);
    res.status(500).json({ success: false, message: "Error al eliminar disponibilidad." });
  }
});

module.exports = router;
