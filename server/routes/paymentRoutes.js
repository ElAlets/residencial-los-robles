const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

// ==============================
// RUTAS PROTEGIDAS
// ==============================

/**
 * @route   GET /api/payments
 * @desc    Obtener todos los pagos
 * @access  Privado (Usuarios autenticados)
 */
router.get("/", authMiddleware, paymentController.getPayments);

/**
 * @route   POST /api/payments
 * @desc    Registrar un nuevo pago
 * @access  Privado (Solo Administradores)
 */
router.post("/", authMiddleware, adminMiddleware, paymentController.createPayment);

module.exports = router;