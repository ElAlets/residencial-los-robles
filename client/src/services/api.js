// client/src/services/api.js
import axios from "axios";

// 1. Creamos la instancia base
const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

// ==============================
// 🚀 INTERCEPTOR DE PETICIONES (Request)
// ==============================
// Se ejecuta ANTES de que la petición salga al servidor
api.interceptors.request.use(
  (config) => {
    // Buscamos el token en la mochila (localStorage)
    const token = localStorage.getItem("token");
    
    // Si tenemos token, se lo pegamos a los headers de la petición
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ==============================
// 🛡️ INTERCEPTOR DE RESPUESTAS (Response) - ¡El que tú hiciste!
// ==============================
// Se ejecuta CUANDO el servidor nos responde
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el servidor nos dice que no estamos autorizados (401)...
    if (error.response?.status === 401) {
      console.warn("Sesión expirada o no autorizada. Cerrando sesión...");
      
      // Limpiamos la casa por completo
      localStorage.removeItem("token");
      localStorage.removeItem("user"); // Agregué limpiar el usuario también
      
      // Lo mandamos a la calle (Login)
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;