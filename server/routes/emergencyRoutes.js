// server/routes/emergencyRoutes.js
const express = require("express");
const router = express.Router();

const emergencyController = require("../controllers/emergencyController");

// ==============================
// RUTAS PROTEGIDAS
// ==============================

/**
 * @route   GET /api/emergency
 * @desc    Obtener directorio de servicios de emergencia
 * @access  Público
 */
router.get("/", emergencyController.getEmergencyServices);

module.exports = router;