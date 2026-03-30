// client/src/pages/Payments.jsx
import { useEffect, useState } from "react";
import api from "../services/api"; 
function Payments() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const isAdmin = user.role === "admin";

  const [form, setForm] = useState({
    resident_id: "",
    amount: "",
    method: "simulated_online"
  });

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true); // ⏳ Estado de carga añadido
  const [message, setMessage] = useState({ text: "", type: "" }); // 💬 Mejor manejo de mensajes

  // 🔄 Cargar pagos al montar el componente
  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      const res = await api.get("/payments");
      setPayments(res.data);
    } catch (error) {
      console.error("Error cargando pagos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "Procesando...", type: "info" });

    try {
      await api.post("/payments", {
        ...form,
        payment_date: new Date().toISOString().slice(0, 10),
        status: "paid"
      });

      setMessage({ text: "✅ Pago registrado correctamente", type: "success" });
      setForm({ resident_id: "", amount: "", method: "simulated_online" });
      loadPayments(); // Recargamos la lista automáticamente

      // Limpiamos el mensaje de éxito después de 3 segundos
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);

    } catch (error) {
      console.error(error);
      setMessage({ text: "❌ Error al registrar pago. Verifica los datos.", type: "error" });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>💳 {isAdmin ? "Control de Pagos" : "Mis Pagos"}</h2>
        <p style={styles.subtitle}>
          {isAdmin ? "Registra cobros manuales y revisa el historial de la colonia." : "Historial de cuotas de mantenimiento."}
        </p>
      </div>

      {/* 🛡️ SOLO ADMIN VE EL FORMULARIO DE REGISTRO */}
      {isAdmin && (
        <div style={styles.adminPanel}>
          <h3>Registrar Nuevo Pago</h3>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="number"
              name="resident_id"
              placeholder="ID del Residente (ej. 1)"
              value={form.resident_id}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <input
              type="number"
              name="amount"
              placeholder="Monto ($)"
              value={form.amount}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <select name="method" value={form.method} onChange={handleChange} style={styles.input}>
              <option value="simulated_online">Online (Simulado)</option>
              <option value="cash">Efectivo</option>
              <option value="transfer">Transferencia</option>
            </select>

            <button type="submit" style={styles.button}>Registrar</button>
          </form>

          {message.text && (
            <p style={{ color: message.type === "error" ? "red" : "green", marginTop: "10px", fontWeight: "bold" }}>
              {message.text}
            </p>
          )}
        </div>
      )}

      {/* 📊 LISTA DE PAGOS */}
      <h3>Historial de Transacciones</h3>
      
      {loading ? (
        <p>Cargando historial...</p>
      ) : payments.length === 0 ? (
        <p>No hay pagos registrados aún.</p>
      ) : (
        <div style={styles.list}>
          {payments.map((p) => (
            <div key={p.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <span style={styles.amount}>${p.amount}</span>
                <span style={styles.status}>
                  {p.status === 'paid' ? '✅ Pagado' : p.status}
                </span>
              </div>
              
              <div style={styles.cardBody}>
                {/* Mostramos el nombre del residente (muy útil para el admin) */}
                {p.resident_name && <p><strong>👤 Vecino:</strong> {p.resident_name}</p>}
                
                <p><strong>💳 Método:</strong> {
                  p.method === 'cash' ? 'Efectivo' : 
                  p.method === 'transfer' ? 'Transferencia' : 'Online'
                }</p>
                
                {/* Formateamos la fecha para que se vea bonita */}
                <p><strong>📅 Fecha:</strong> {new Date(p.payment_date).toLocaleDateString()}</p>
                
                <p><strong>🧾 Ref:</strong> {p.reference_number || 'N/A'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 🎨 Estilos
const styles = {
  container: { maxWidth: "900px", margin: "0 auto" },
  header: { marginBottom: "20px", borderBottom: "2px solid #ecf0f1", paddingBottom: "10px" },
  subtitle: { color: "#7f8c8d" },
  adminPanel: { 
    background: "#f8f9fa", 
    padding: "20px", 
    borderRadius: "8px", 
    marginBottom: "30px",
    border: "1px solid #dfe6e9"
  },
  form: { display: "flex", flexWrap: "wrap", gap: "15px", alignItems: "center" },
  input: { padding: "10px", borderRadius: "4px", border: "1px solid #ccc", minWidth: "150px" },
  button: { padding: "10px 20px", backgroundColor: "#27ae60", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" },
  list: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" },
  card: { background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", borderLeft: "5px solid #2ecc71" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px", borderBottom: "1px solid #eee", paddingBottom: "10px" },
  amount: { fontSize: "1.5rem", fontWeight: "bold", color: "#2c3e50" },
  status: { fontSize: "0.9rem", color: "#27ae60", backgroundColor: "#e8f8f5", padding: "4px 8px", borderRadius: "12px" },
  cardBody: { color: "#555", fontSize: "0.95rem", lineHeight: "1.6" }
};

export default Payments;