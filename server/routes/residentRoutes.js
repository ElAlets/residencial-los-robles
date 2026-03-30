const express = require("express");
const router = express.Router();

const residentController = require("../controllers/residentController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

// ==============================
// RUTAS PROTEGIDAS
// ==============================

/**
 * @route   GET /api/residents
 * @desc    Obtener todos los residentes
 * @access  Privado (Solo Administradores)
 */
router.get("/", authMiddleware, adminMiddleware, residentController.getAllResidents);

/**
 * @route   POST /api/residents
 * @desc    Crear perfil de residente
 * @access  Privado (Solo Administradores)
 */
router.post("/", authMiddleware, adminMiddleware, residentController.createResident);

// Obtener mi propio perfil
router.get("/me", authMiddleware, residentController.getMyProfile);

module.exports = router;