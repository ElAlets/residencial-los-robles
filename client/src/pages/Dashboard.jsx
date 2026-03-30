// client/src/pages/Dashboard.jsx
import { Link } from "react-router-dom";

function Dashboard() {
  // 1. Recuperamos al usuario de forma segura
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const isAdmin = user.role === "admin";

  return (
    <div style={styles.container}>
      
      {/* 🎯 Bienvenida Personalizada */}
      <div style={styles.header}>
        <h1 style={styles.title}>¡Hola, {user.name || "Vecino"}! 👋</h1>
        <p style={styles.subtitle}>
          Bienvenido al {isAdmin ? "Panel de Administración" : "Portal del Residente"} de Los Robles.
        </p>
      </div>

      {/* 🧩 Cuadrícula de Accesos Rápidos */}
      <div style={styles.grid}>

        <Link to="/announcements" style={{...styles.card, ...styles.cardBlue}}>
          <h2>📢 Anuncios</h2>
          <p>Revisa los últimos avisos y comunicados oficiales de la colonia.</p>
        </Link>

        <Link to="/payments" style={{...styles.card, ...styles.cardGreen}}>
          <h2>💳 Mis Pagos</h2>
          <p>{isAdmin ? "Gestiona el registro de pagos de los vecinos." : "Consulta tu historial de cuotas y referencias."}</p>
        </Link>

        <Link to="/emergency" style={{...styles.card, ...styles.cardRed}}>
          <h2>🚨 Emergencias</h2>
          <p>Directorio rápido de seguridad, bomberos y servicios médicos.</p>
        </Link>

        {/* 🛡️ Tarjeta exclusiva para Administradores */}
        {isAdmin && (
          <Link to="/residents" style={{...styles.card, ...styles.cardPurple}}>
            <h2>👥 Residentes</h2>
            <p>Administra el padrón de vecinos, altas y bajas del residencial.</p>
          </Link>
        )}

      </div>
    </div>
  );
}

// 🎨 Estilos para un Dashboard moderno
const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "20px",
  },
  header: {
    marginBottom: "40px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },
  title: {
    margin: "0 0 10px 0",
    color: "#2c3e50",
    fontSize: "2.2rem",
  },
  subtitle: {
    margin: 0,
    color: "#7f8c8d",
    fontSize: "1.1rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
  card: {
  display: "block",
  padding: "25px",
  borderRadius: "10px",
  textDecoration: "none",
  color: "#fff",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
},

cardHover: {
  transform: "translateY(-5px)",
  boxShadow: "0 8px 15px rgba(0,0,0,0.2)"
},
  // Colores para cada módulo (dan mucha vida visual)
  cardBlue: { backgroundColor: "#3498db" },
  cardGreen: { backgroundColor: "#2ecc71" },
  cardRed: { backgroundColor: "#e74c3c" },
  cardPurple: { backgroundColor: "#9b59b6" },
};

export default Dashboard;