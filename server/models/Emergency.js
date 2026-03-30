// server/models/Emergency.js
const db = require("../config/db");

const Emergency = {
  // OBTENER SERVICIOS
  getEmergencyServices: async () => {
    // Ordenamos alfabéticamente para que sea más fácil de leer en una emergencia
    const [rows] = await db.query("SELECT * FROM emergency_services ORDER BY name ASC");
    return rows;
  }
};

module.exports = Emergency;