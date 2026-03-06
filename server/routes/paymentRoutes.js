const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, paymentController.getPayments);
router.post("/", authMiddleware, paymentController.createPayment);

module.exports = router;