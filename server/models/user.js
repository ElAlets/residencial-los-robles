// server/models/user.js
const db = require("../config/db");

const User = {

  // ==============================
  // BUSCAR POR EMAIL (Para Login/Auth)
  // ==============================
  findByEmail: async (email) => {
    // Aquí necesitamos * para obtener el password y compararlo en el login
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    return rows[0]; // Retorna el objeto usuario o undefined
  },

  // ==============================
  // BUSCAR POR ID (Para Middleware/Perfil)
  // ==============================
  findById: async (id) => {
    // Por seguridad, aquí NO traemos el password
    const [rows] = await db.query(
      "SELECT id, name, email, role FROM users WHERE id = ?",
      [id]
    );

    return rows[0];
  },

  // ==============================
  // CREAR USUARIO (Registro)
  // ==============================
  createUser: async (userData) => {
    const { name, email, password, role } = userData;

    const [result] = await db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, password, role]
    );

    // Retornamos los datos limpios (sin password) para el controlador
    return {
      id: result.insertId,
      name,
      email,
      role
    };
  }

};

module.exports = User;