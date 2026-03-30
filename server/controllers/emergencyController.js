// server/controllers/emergencyController.js
const Emergency = require("../models/Emergency");

// OBTENER SERVICIOS DE EMERGENCIA
exports.getEmergencyServices = async (req, res, next) => {
  try {
    const services = await Emergency.getEmergencyServices();
    res.json(services);
  } catch (error) {
    next(error);
  }
};