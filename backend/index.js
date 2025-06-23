const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const pool = require('./db');

pool.query('SELECT current_database()', (err, res) => {
  if (err) {
    console.error('❌ Error al conectar con la base de datos:', err);
  } else {
    console.log('✅ Conectado a la base de datos:', res.rows[0].current_database);
  }
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir imágenes
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Rutas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user.routes');
const availabilityRoutes = require('./routes/availability.routes');
const studioRoutes = require('./routes/studio.routes');
const reservaRoutes = require('./routes/reservas.routes'); // ✅ nueva

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', availabilityRoutes);
app.use('/api', studioRoutes);
app.use('/api', reservaRoutes); // ✅ nueva

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
