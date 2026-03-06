const express = require("express");
const router = express.Router();

const announcementController = require("../controllers/announcementController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, announcementController.getAnnouncements);

router.post("/", authMiddleware, announcementController.createAnnouncement);

module.exports = router;