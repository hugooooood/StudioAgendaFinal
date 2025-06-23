const pool = require('../db');

// Actualizar perfil del usuario
const updateUserProfile = async (userId, name, bio, imagePath) => {
  const fields = [];
  const values = [];
  let query = 'UPDATE users SET ';

  if (name !== undefined) {
    fields.push('name');
    values.push(name);
  }
  if (bio !== undefined) {
    fields.push('bio');
    values.push(bio);
  }
  if (imagePath !== undefined) {
    fields.push('image');
    values.push(imagePath);
  }

  if (fields.length === 0) return null; // Nada que actualizar

  fields.forEach((field, index) => {
    query += `${field} = $${index + 1}`;
    if (index < fields.length - 1) query += ', ';
  });

  query += ` WHERE id = $${fields.length + 1} RETURNING *`;
  values.push(userId);

  const result = await pool.query(query, values);
  return result.rows[0];
};

// Obtener perfil por ID
const getUserById = async (userId) => {
  const result = await pool.query('SELECT id, name, email, bio, image FROM users WHERE id = $1', [userId]);
  return result.rows[0];
};

module.exports = {
  updateUserProfile,
  getUserById,
};
