const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }

    // Aquí podrías generar un token si quieres
    res.status(200).json({ message: 'Inicio de sesión exitoso', user: result.rows[0] });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});



router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    );
    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    console.error('Error al registrar:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
