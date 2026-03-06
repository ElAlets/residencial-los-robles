const express = require("express");
const router = express.Router();

const residentController = require("../controllers/residentController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, residentController.getAllResidents);
router.post("/", authMiddleware, residentController.createResident);

module.exports = router;