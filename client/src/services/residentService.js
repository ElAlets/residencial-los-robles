// client/src/services/residentService.js
import api from "./api";

// ==============================
// 👥 OBTENER DIRECTORIO DE RESIDENTES (Solo Admin)
// ==============================
export const getResidents = async () => {
  try {
    const response = await api.get("/residents");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener el padrón de residentes"
    );
  }
};

// ==============================
// 📝 REGISTRAR NUEVO RESIDENTE (Solo Admin)
// ==============================
export const createResident = async (residentData) => {
  try {
    const response = await api.post("/residents", residentData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al registrar un nuevo residente"
    );
  }
};