// server/models/Resident.js
const db = require("../config/db");

const Resident = {
  // ==============================
  // OBTENER RESIDENTES (Con Fecha de Registro)
  // ==============================
  getResidents: async () => {
    const [rows] = await db.query(`
    SELECT 
      u.id,
      u.name AS user_name,
      u.email AS user_email,

      r.address,
      r.phone,
      r.house_number,
      r.status,
      r.created_at

    FROM users u

    LEFT JOIN residents r
      ON u.id = r.user_id

    WHERE u.role = 'resident'

    ORDER BY u.created_at DESC
  `);

    return rows;
  },
  // ==============================
  // ACTUALIZAR RESIDENTE
  // ==============================
  updateResident: async (id, data) => {
    const { address, phone, house_number, status } = data;

    await db.query(
      `
    UPDATE residents
    SET
      address = ?,
      phone = ?,
      house_number = ?,
      status = ?
    WHERE id = ?
    `,
      [address, phone, house_number, status, id],
    );

    return { id, ...data };
  },

  // ==============================
  // ELIMINAR RESIDENTE
  // ==============================
  deleteResident: async (id) => {
    await db.query("DELETE FROM residents WHERE id = ?", [id]);

    return true;
  },
  // ==============================
  // CREAR PERFIL DE RESIDENTE
  // ==============================
  createResident: async (data) => {
    const { user_id, address, phone, house_number } = data;

    const [result] = await db.query(
      `INSERT INTO residents (user_id, address, phone, house_number) 
       VALUES (?, ?, ?, ?)`,
      [user_id, address, phone, house_number],
    );

    return {
      id: result.insertId,
      ...data,
      created_at: new Date(), // Devolvemos la fecha actual para el Front
    };
  },

  // ==============================
  // OBTENER PERFIL POR USER_ID
  // ==============================
  getResidentByUserId: async (user_id) => {
    const [rows] = await db.query(
      `
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
  `,
      [user_id],
    );

    return rows[0];
  },
};

module.exports = Resident;
