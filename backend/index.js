const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const pool = require('./db');

// Verifica conexión
pool.query('SELECT current_database()', (err, res) => {
  if (err) {
    console.error('❌ Error al conectar con la base de datos:', err);
  } else {
    console.log('✅ Conectado a la base de datos:', res.rows[0].current_database);
  }
});

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir imágenes
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Importar rutas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user.routes');
const studioRoutes = require('./models/studio.routes'); // 👈 CORREGIDO según tu estructura

// Usar rutas
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', studioRoutes);

// Servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
