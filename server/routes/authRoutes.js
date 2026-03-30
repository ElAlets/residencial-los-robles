// server/routes/authRoutes.js
const express = require("express");
const router = express.Router();

// 1. Importamos el controlador correcto
const authController = require("../controllers/authController");

// 2. Importamos el middleware para la ruta protegida /me
const authMiddleware = require("../middlewares/authMiddleware");

// ==============================
// RUTAS PÚBLICAS (Sin token)
// ==============================

// Registro de nuevos usuarios -> POST /api/auth/register
router.post("/register", authController.register);

// Inicio de sesión -> POST /api/auth/login
router.post("/login", authController.login);


// ==============================
// RUTAS PROTEGIDAS (Requieren token)
// ==============================

// 3. Obtener el usuario actual 
// GET /api/auth/me
router.get("/me", authMiddleware, (req, res) => {
  // Como el authMiddleware ya validó el token y guardó los datos en req.user...
  res.json(req.user);
});

module.exports = router;