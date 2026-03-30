// server/controllers/paymentController.js
const Payment = require("../models/Payment");

// ==============================
// OBTENER PAGOS (CON CONTROL DE ACCESO)
// ==============================
exports.getPayments = async (req, res, next) => {
  try {

    let payments;

    // 🔐 Si es admin → ve todos
    if (req.user.role === "admin") {
      payments = await Payment.getPayments();
    }

    // 👤 Si es residente → solo sus pagos
    else {
      payments = await Payment.getPaymentsByUser(req.user.id);
    }

    res.json(payments);

  } catch (error) {
    next(error);
  }
};


// ==============================
// CREAR PAGO
// ==============================
exports.createPayment = async (req, res, next) => {
  try {
    let { resident_id, amount, method, reference_number } = req.body;

    resident_id = Number(resident_id);
    amount = Number(amount);

    const validMethods = ["cash", "transfer", "simulated_online"];

    if (!resident_id || !amount || !method) {
      return res.status(400).json({ message: "resident_id, amount and method are required" });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: "El monto debe ser mayor a 0" });
    }

    if (!validMethods.includes(method)) {
      return res.status(400).json({
        message: `Método de pago inválido. Opciones: ${validMethods.join(", ")}`
      });
    }

    await Payment.createPayment({
      resident_id,
      amount,
      payment_date: new Date().toISOString().slice(0, 10),
      method,
      reference_number: reference_number?.trim() || null,
      status: "paid"
    });

    res.status(201).json({
      message: "Payment registered successfully"
    });

  } catch (error) {
    next(error);
  }
};