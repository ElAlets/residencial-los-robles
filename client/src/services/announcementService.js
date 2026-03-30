// client/src/services/announcementService.js
import api from "./api";

// ==============================
// 📢 OBTENER TODOS LOS ANUNCIOS
// ==============================
export const getAnnouncements = async () => {
  const response = await api.get("/announcements");
  return response.data;
};

// ==============================
// ✍️ CREAR UN NUEVO ANUNCIO (Solo Admin)
// ==============================
export const createAnnouncement = async (announcementData) => {
  // announcementData debería ser algo como { title: "Aviso", content: "..." }
  const response = await api.post("/announcements", announcementData);
  return response.data;
};

// ==============================
// 🗑️ ELIMINAR UN ANUNCIO (Solo Admin)
// ==============================
export const deleteAnnouncement = async (id) => {
  const response = await api.delete(`/announcements/${id}`);
  return response.data;
};