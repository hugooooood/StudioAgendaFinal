const express = require("express");
const router = express.Router();
const pool = require("../db");
const multer = require("multer");
const path = require("path");

// Configuración de almacenamiento con multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

// Crear estudio con fotos usando multipart/form-data
router.post("/studios", upload.array("images"), async (req, res) => {
  try {
    console.log("BODY RECIBIDO:", req.body);
    const { nombre_estudio, componentes, precio_hora, user_id } = req.body;

    if (!nombre_estudio || !componentes || !precio_hora || !user_id) {
      return res.status(400).json({
        success: false,
        message: "Faltan datos requeridos para registrar el estudio.",
      });
    }

    const result = await pool.query(
      `INSERT INTO estudios (nombre_estudio, componentes, precio_hora, user_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nombre_estudio, componentes, precio_hora, user_id]
    );

    const estudio = result.rows[0];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const url = `/uploads/${file.filename}`;
        await pool.query(
          `INSERT INTO fotos_estudio (estudio_id, url) VALUES ($1, $2)`,
          [estudio.id, url]
        );
      }
    }

    res.status(201).json({ success: true, estudio });
  } catch (error) {
    console.error("❌ Error al registrar estudio:", error);
    res.status(500).json({ success: false, message: "Error al registrar estudio." });
  }
});

// Obtener todos los estudios con fotos y disponibilidades
router.get("/studios/all", async (req, res) => {
  try {
    const estudios = await pool.query(`
      SELECT e.*, ARRAY_AGG(f.url) AS fotos
      FROM estudios e
      LEFT JOIN fotos_estudio f ON f.estudio_id = e.id
      GROUP BY e.id
    `);

    const estudiosConDisponibilidad = await Promise.all(
      estudios.rows.map(async (estudio) => {
        const disp = await pool.query(
          `SELECT * FROM disponibilidades WHERE estudio_id = $1`,
          [estudio.id]
        );
        return {
          ...estudio,
          disponibilidades: disp.rows,
        };
      })
    );

    res.json({ success: true, estudios: estudiosConDisponibilidad });
  } catch (error) {
    console.error("❌ Error al obtener estudios:", error);
    res.status(500).json({ success: false, message: "Error al obtener estudios." });
  }
});

// Obtener detalle de estudio por ID
router.get("/studios/:id/detalle", async (req, res) => {
  const { id } = req.params;

  try {
    const estudio = await pool.query(
      `SELECT e.*, ARRAY_AGG(f.url) AS fotos
       FROM estudios e
       LEFT JOIN fotos_estudio f ON f.estudio_id = e.id
       WHERE e.id = $1
       GROUP BY e.id`,
      [id]
    );

    const disponibilidades = await pool.query(
      `SELECT * FROM disponibilidades WHERE estudio_id = $1`,
      [id]
    );

    if (estudio.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Estudio no encontrado" });
    }

    res.json({
      success: true,
      estudio: estudio.rows[0],
      disponibilidades: disponibilidades.rows,
    });
  } catch (error) {
    console.error("❌ Error al obtener detalle:", error);
    res.status(500).json({ success: false, message: "Error del servidor." });
  }
});

// Obtener estudio de un usuario
router.get("/studios/user/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM estudios WHERE user_id = $1 LIMIT 1`,
      [user_id]
    );

    if (result.rows.length === 0) {
      return res.json({ success: true, studio: null });
    }

    res.json({ success: true, studio: result.rows[0] });
  } catch (error) {
    console.error("❌ Error al buscar estudio del usuario:", error);
    res.status(500).json({ success: false, message: "Error en el servidor." });
  }
});

module.exports = router;
