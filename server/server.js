// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Constante para el prefijo de la API
const API = "/api";

// Rutas
const authRoutes = require("./routes/authRoutes");
const residentRoutes = require("./routes/residentRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");

app.use(`${API}/auth`, authRoutes);
app.use(`${API}/residents`, residentRoutes);
app.use(`${API}/payments`, paymentRoutes);
app.use(`${API}/announcements`, announcementRoutes);
app.use(`${API}/emergency`, emergencyRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({
    message: "API Residencial Los Robles funcionando 🚀"
  });
});

// Middleware de manejo de errores global 
// ¡Importante! Siempre debe ir DESPUÉS de todas las rutas
app.use((err, req, res, next) => {
  console.error("❌ Error detectado:", err.stack);
  res.status(500).json({ 
    message: "Error interno del servidor",
    error: err.message 
  });
});

// Servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  // Log claro y visible (Mejora Pro 3)
  console.log(`🚀 Server running on port ${PORT}`);
});