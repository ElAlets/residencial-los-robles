// server/controllers/residentController.js
const Resident = require("../models/Resident");

exports.createResident = async (req, res, next) => {
  try {
    let { user_id, address, phone, house_number } = req.body;

    // 1. Sanitización y validación de número
    user_id = Number(user_id);

    // 🛡️ El "Detalle Ultra Fino": Validamos que sea un número REAL de base de datos
    if (isNaN(user_id) || user_id <= 0) {
      return res.status(400).json({ 
        message: "user_id debe ser un número positivo válido" 
      });
    }

    // 2. Validación de campos obligatorios
    if (!address?.trim() || !house_number?.trim()) {
      return res.status(400).json({
        message: "address y house_number son obligatorios"
      });
    }

    // 3. Validación de Teléfono (Longitud + Solo números)
    if (phone?.trim()) {
      const cleanPhone = phone.trim();
      if (cleanPhone.length < 8 || cleanPhone.length > 15 || !/^\d+$/.test(cleanPhone)) {
        return res.status(400).json({ 
          message: "El teléfono debe tener entre 8 y 15 dígitos y solo contener números" 
        });
      }
    }

    // 4. Inserción limpia
    await Resident.createResident({
      user_id,
      address: address.trim(),
      phone: phone?.trim() || null,
      house_number: house_number.trim()
    });

    res.status(201).json({ message: "Resident profile created successfully" });

  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "Este usuario ya tiene un perfil de residente" });
    }
    next(error);
  }
};

// ==============================
// OBTENER MI PERFIL
// ==============================
exports.getMyProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const profile = await Resident.getResidentByUserId(userId);

    if (!profile) {
      return res.status(404).json({
        message: "Perfil de residente no encontrado"
      });
    }

    res.json(profile);

  } catch (error) {
    next(error);
  }
};