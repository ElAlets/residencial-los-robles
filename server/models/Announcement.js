const db = require("../config/db");

// ==============================
// OBTENER ANUNCIOS
// ==============================
exports.getAnnouncements = async () => {
  const sql = `
    SELECT 
      a.id,
      a.title,
      a.content,
      a.created_at,
      u.name AS author_name
    FROM announcements a
    LEFT JOIN users u ON a.created_by = u.id
    ORDER BY a.created_at DESC
  `;

  const [rows] = await db.query(sql);

  return rows; // [] si no hay datos (correcto)
};


// ==============================
// CREAR ANUNCIO
// ==============================
exports.createAnnouncement = async (announcement) => {
  const { title, content, created_by } = announcement;

  const sql = `
    INSERT INTO announcements (title, content, created_by)
    VALUES (?, ?, ?)
  `;

  const [result] = await db.query(sql, [
    title,
    content,
    created_by
  ]);

  // ELIMINAR ANUNCIO
exports.deleteAnnouncement = async (id) => {
  const sql = "DELETE FROM announcements WHERE id = ?";
  const [result] = await db.query(sql, [id]);
  return result;
};

  // Retornamos el objeto creado con su ID
  return {
    id: result.insertId,
    title,
    content,
    created_by
  };
};