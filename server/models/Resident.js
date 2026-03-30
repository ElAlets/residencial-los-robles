// server/models/Resident.js
const db = require("../config/db");

const Resident = {

  // ==============================
  // OBTENER RESIDENTES (Con Fecha de Registro)
  // ==============================
  getResidents: async () => {
    const [rows] = await db.query(`
      SELECT 
        r.id,
        r.address,
        r.phone,
        r.house_number,
        r.status,
        r.created_at, 
        u.name AS user_name,
        u.email AS user_email
      FROM residents r
      INNER JOIN users u ON r.user_id = u.id
      ORDER BY r.created_at DESC
    `);

    return rows;
  },

  // ==============================
  // CREAR PERFIL DE RESIDENTE
  // ==============================
  createResident: async (data) => {
    const { user_id, address, phone, house_number } = data;

    const [result] = await db.query(
      `INSERT INTO residents (user_id, address, phone, house_number) 
       VALUES (?, ?, ?, ?)`,
      [user_id, address, phone, house_number]
    );

    return {
      id: result.insertId,
      ...data,
      created_at: new Date() // Devolvemos la fecha actual para el Front
    };
  },

  // ==============================
// OBTENER PERFIL POR USER_ID
// ==============================
getResidentByUserId: async (user_id) => {
  const [rows] = await db.query(`
    SELECT 
      r.id,
      r.address,
      r.phone,
      r.house_number,
      r.status,
      u.name AS user_name,
      u.email AS user_email
    FROM residents r
    JOIN users u ON r.user_id = u.id
    WHERE r.user_id = ?
  `, [user_id]);

  return rows[0];
},

};

module.exports = Resident;