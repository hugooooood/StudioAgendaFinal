const pool = require("../db");

const createStudio = async ({ user_id, nombre_estudio, componentes, precio_hora, imagePaths }) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    console.log("📝 Insertando estudio con:", { user_id, nombre_estudio, componentes, precio_hora });

    const insertStudio = `
      INSERT INTO estudios (user_id, nombre_estudio, componentes, precio_hora)
      VALUES ($1, $2, $3, $4)
      RETURNING id;
    `;
    const result = await client.query(insertStudio, [user_id, nombre_estudio, componentes, precio_hora]);
    const estudio_id = result.rows[0].id;

    const insertPhoto = `
      INSERT INTO fotos_estudio (estudio_id, url)
      VALUES ($1, $2);
    `;

    for (let url of imagePaths) {
      console.log("🖼️ Insertando imagen:", url);
      await client.query(insertPhoto, [estudio_id, url]);
    }

    await client.query("COMMIT");
    return { id: estudio_id };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("❌ Error al crear estudio en DB:", error.message);
    throw error;
  } finally {
    client.release();
  }
};

module.exports = { createStudio };
