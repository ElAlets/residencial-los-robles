// client/src/services/authService.js
import api from "./api"; 

// ==============================
// 🔐 INICIAR SESIÓN
// ==============================
export const login = async (email, password) => {
  try {
    // Usamos nuestra instancia 'api', así que automáticamente va a "http://localhost:5000/api"
    const response = await api.post("/auth/login", {
      email,
      password
    });

    // Retorna { token, user }
    return response.data;

  } catch (error) {
    // Mensaje extraído directamente de nuestro Backend o uno genérico si falla la red
    throw new Error(
      error.response?.data?.message || "Error al iniciar sesión. Verifica tu conexión."
    );
  }
};

// ==============================
// 📝 REGISTRAR USUARIO (Opcional, para el futuro)
// ==============================
export const register = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al registrar usuario."
    );
  }
};