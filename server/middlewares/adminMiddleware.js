// server/middlewares/adminMiddleware.js

module.exports = function (req, res, next) {
  // 1. Red de seguridad: ¿Alguien olvidó el authMiddleware?
  if (!req.user) {
    return res.status(401).json({ 
      message: "Error de sistema: Usuario no identificado. Contacte al administrador." 
    });
  }

  // 2. Validación de Rol
  if (req.user.role === "admin") {
    // Es admin, ¡adelante!
    next();
  } else {
    // Es residente, no tiene permiso aquí
    res.status(403).json({ 
      message: "Acceso restringido: Se requieren permisos de Administrador para realizar esta acción." 
    });
  }
};