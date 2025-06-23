const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const { updateUserProfile, getUserById } = require("../models/user");

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

// PUT: Actualizar perfil de usuario
router.put("/users/:id/profile", upload.single("image"), async (req, res) => {
  const { name, bio } = req.body;
  const userId = req.params.id;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const updatedUser = await updateUserProfile(userId, name, bio, imagePath);
    res.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error("Error al actualizar perfil:", err);
    res.status(500).json({ success: false, error: "Error al actualizar el perfil." });
  }
});

// GET: Obtener perfil por ID (opcional, pero útil)
router.get("/users/:id/profile", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "Usuario no encontrado." });
    }
    res.json({ success: true, user });
  } catch (err) {
    console.error("Error al obtener el perfil:", err);
    res.status(500).json({ success: false, error: "Error al obtener el perfil del usuario." });
  }
});

module.exports = router;
