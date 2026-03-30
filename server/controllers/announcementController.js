
const Announcement = require("../models/Announcement");

// Obtener todos los anuncios
exports.getAnnouncements = async (req, res, next) => {
  try {
    const announcements = await Announcement.getAnnouncements();
    res.json(announcements); 
  } catch (error) {
    next(error); 
  }
};

// Crear un nuevo anuncio 
exports.createAnnouncement = async (req, res, next) => {
  try {
    // Programación Defensiva: Aseguramos que el usuario exista, 
    // por si alguien borró el middleware por accidente.
    if (!req.user?.id) {
      return res.status(401).json({ message: "No autorizado. Token inválido o faltante." });
    }

    const { title, content } = req.body;
    const created_by = req.user.id;

    // Validación fina de datos
    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({ message: "El título y el contenido son obligatorios y no pueden estar vacíos" });
    }

    // Pasamos los datos limpios al modelo
    await Announcement.createAnnouncement({ 
      title: title.trim(), 
      content: content.trim(), 
      created_by 
    });

    // Respuesta exitosa con el código HTTP correcto
    res.status(201).json({
      message: "Announcement created successfully"
    });
  } catch (error) {
    next(error);
  }
};
// Eliminar un anuncio
exports.deleteAnnouncement = async (req, res, next) => {
  try {
    const { id } = req.params; // Extraemos el :id de la URL

    // 1. Validación rápida
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ message: "ID de anuncio inválido" });
    }

    // 2. Llamamos al modelo
    const result = await Announcement.deleteAnnouncement(id);

    // 3. Verificamos si realmente se borró algo (por si el ID no existía)
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Anuncio no encontrado" });
    }

    res.json({ message: "Announcement deleted successfully" });

  } catch (error) {
    next(error);
  }
};