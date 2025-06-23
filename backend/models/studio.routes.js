const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const pool = require("../db");
const { createStudio } = require("../models/estudio");

// Configuración de Multer para almacenar imágenes en /public/uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// 📌 Crear nuevo estudio
router.post("/studios", upload.array("images", 3), async (req, res) => {
  try {
    console.log("📥 Body recibido:", req.body);
    console.log("🖼️ Archivos recibidos:", req.files);

    const { user_id, nombre_estudio, componentes, precio_hora } = req.body;

    if (!user_id || !nombre_estudio || !componentes || !precio_hora) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son requeridos.",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Debes subir al menos una imagen del estudio.",
      });
    }

    const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);

    const newStudio = await createStudio({
      user_id,
      nombre_estudio,
      componentes,
      precio_hora,
      imagePaths,
    });

    console.log("✅ Estudio creado:", newStudio);

    res.status(201).json({ success: true, studio: newStudio });
  } catch (err) {
    console.error("❌ Error al registrar estudio:", err.message);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor. Revisa los logs.",
    });
  }
});

// ✅ Obtener estudio por ID de usuario
router.get("/studios/user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await pool.query(
      "SELECT * FROM estudios WHERE user_id = $1 LIMIT 1",
      [userId]
    );

    if (result.rows.length > 0) {
      res.json({ studio: result.rows[0] });
    } else {
      res.json({ studio: null });
    }
  } catch (error) {
    console.error("Error al obtener estudio:", error);
    res.status(500).json({ message: "Error al buscar el estudio" });
  }
});

// ✅ Nueva ruta: obtener estudio junto con sus fotos
router.get("/studios/user/:id/with-photos", async (req, res) => {
  const userId = req.params.id;

  try {
    const studioResult = await pool.query(
      "SELECT * FROM estudios WHERE user_id = $1 LIMIT 1",
      [userId]
    );

    if (studioResult.rows.length === 0) {
      return res.status(404).json({ message: "Estudio no encontrado" });
    }

    const estudio = studioResult.rows[0];

    const fotosResult = await pool.query(
      "SELECT url FROM fotos_estudio WHERE estudio_id = $1",
      [estudio.id]
    );

    const fotos = fotosResult.rows.map((row) => row.url);

    res.json({ estudio, fotos });
  } catch (error) {
    console.error("Error al obtener estudio con fotos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
