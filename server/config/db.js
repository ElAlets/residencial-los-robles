const mysql = require("mysql2");
require("dotenv").config();

//Creamos el pool de conexiones
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

//Convertimos el pool a Promesas para usar async/await
const db = pool.promise();

//Prueba de conexión REAL
async function probarConexion() {
  try {
    const connection = await db.getConnection();
    console.log("✅ Conexión exitosa a la base de datos MySQL");
    connection.release(); // Liberamos la conexión de vuelta al pool
  } catch (error) {
    console.error("❌ Error conectando a la base de datos COMPLETO:", error);
  }
}

probarConexion();

//Exportamos el pool con promesas para usarlo en el resto del proyecto
module.exports = db;