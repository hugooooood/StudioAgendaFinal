require('dotenv').config(); // Cargar variables de entorno

const { Pool } = require('pg');

// Verificar que las variables están correctamente cargadas
console.log("🌐 Credenciales cargadas:");
console.log({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Verificar a qué base de datos se conecta
pool.query('SELECT current_database()', (err, res) => {
  if (err) {
    console.error("❌ Error de conexión:", err);
  } else {
    console.log("✅ Conectado a la base de datos:", res.rows[0].current_database);
  }
});

module.exports = pool;
