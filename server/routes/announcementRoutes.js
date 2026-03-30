// server/routes/announcementRoutes.js
const express = require("express");
const router = express.Router();

// Importamos controladores y middlewares
const announcementController = require("../controllers/announcementController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

// ==============================
// RUTAS PROTEGIDAS
// ==============================

/**
 * @route   GET /api/announcements
 * @desc    Obtener todos los anuncios de la colonia
 * @access  Privado (Cualquier usuario logueado)
 */
router.get("/", authMiddleware, announcementController.getAnnouncements);

/**
 * @route   POST /api/announcements
 * @desc    Crear un nuevo comunicado oficial
 * @access  Privado (Solo Administradores)
 */
router.post("/", authMiddleware, adminMiddleware, announcementController.createAnnouncement);

/**
 * @route   DELETE /api/announcements/:id
 * @desc    Eliminar un anuncio
 * @access  Privado (Solo Administradores)
 */
router.delete("/:id", authMiddleware, adminMiddleware, announcementController.deleteAnnouncement);

module.exports = router;