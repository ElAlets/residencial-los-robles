// client/src/services/paymentService.js
import api from "./api";

// ==============================
// 📊 OBTENER HISTORIAL DE PAGOS
// ==============================
export const getPayments = async () => {
  try {
    const response = await api.get("/payments");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener el historial de pagos"
    );
  }
};

// ==============================
// 💵 REGISTRAR UN NUEVO PAGO (Solo Admin)
// ==============================
export const createPayment = async (paymentData) => {
  try {
    const response = await api.post("/payments", paymentData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al registrar el pago. Verifica los datos."
    );
  }
};