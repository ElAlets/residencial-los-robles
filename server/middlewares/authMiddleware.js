// server/middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // 1. Obtener el encabezado de autorización
  const authHeader = req.header("Authorization");

  // 2. Validar que exista el encabezado y que empiece con "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ 
      message: "Acceso denegado. No se proporcionó un token válido." 
    });
  }

  // 3. Extraer el token puro
  const token = authHeader.split(" ")[1];

  try {
    // 4. Verificar el secreto (Seguridad extra para el desarrollador)
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET no está definido en las variables de entorno");
    }

    // 5. Verificar el token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // 6. Inyectar los datos del usuario en la petición (id, role, etc.)
    req.user = verified;

    // 7. ¡Todo bien! Dar paso al siguiente controlador
    next();

  } catch (error) {
    // Si el token expiró o es falso, devolvemos 401
    return res.status(401).json({ 
      message: "Token inválido o expirado",
      error: error.message // Opcional: solo para desarrollo
    });
  }
};