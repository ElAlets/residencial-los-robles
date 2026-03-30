// client/src/services/emergencyService.js
import api from "./api";

// ==============================
// 🚨 OBTENER DIRECTORIO DE EMERGENCIAS
// ==============================
export const getEmergencyServices = async () => {
  try {
    const response = await api.get("/emergency");
    return response.data;
  } catch (error) {
    // Normalizamos el error para que el Frontend lo consuma fácilmente
    throw new Error(
      error.response?.data?.message || "Error al obtener los servicios de emergencia. Verifica tu conexión."
    );
  }
};