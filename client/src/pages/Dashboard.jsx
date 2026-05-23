// client/src/pages/Dashboard.jsx
import { Link } from "react-router-dom";

function Dashboard() {
  // 1. Recuperamos al usuario de forma segura
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const isAdmin = user.role === "admin";
  /*const residentCount = JSON.parse(localStorage.getItem("residentCount")) || 0;*/

  return (
    <div style={styles.container}>
      {/* 🎯 Bienvenida Personalizada */}
      <div style={styles.header}>
        <h1 style={styles.title}>¡Hola, {user.name || "Vecino"}! 👋</h1>
        <p style={styles.subtitle}>
          Bienvenido al{" "}
          {isAdmin ? "Panel de Administración" : "Portal del Residente"} de Los
          Robles.
        </p>
      </div>

      {/* 🧩 Cuadrícula de Accesos Rápidos */}
      <div style={styles.grid}>
        <Link
          to="/announcements"
          style={{ ...styles.card, ...styles.cardBlue }}
        >
          <h2>📢 Anuncios</h2>
          <p>
            Revisa los últimos avisos y comunicados oficiales de la colonia.
          </p>
        </Link>

        <Link to="/payments" style={{ ...styles.card, ...styles.cardGreen }}>
          <h2>💳 Mis Pagos</h2>
          <p>
            {isAdmin
              ? "Gestiona el registro de pagos de los vecinos."
              : "Consulta tu historial de cuotas y referencias."}
          </p>
        </Link>

        <Link to="/emergency" style={{ ...styles.card, ...styles.cardRed }}>
          <h2>🚨 Emergencias</h2>
          <p>Directorio rápido de seguridad, bomberos y servicios médicos.</p>
        </Link>

        {/* 🛡️ Tarjeta exclusiva para Administradores */}
        {isAdmin && (
          <Link
            to="/residents"
            style={{ ...styles.card, ...styles.cardPurple }}
          >
            <h2>👥 Residentes</h2>
            <p>
              Administra el padrón de vecinos, altas y bajas del residencial.
            </p>
          </Link>
        )}
      </div>
      {/* 📊 Resumen rápido */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>{isAdmin ? "👥" : "🏠"}</h2>

          <p style={styles.statTitle}>
            {isAdmin ? "Administración" : "Mi Comunidad"}
          </p>

          <span style={styles.statText}>
            {isAdmin
              ? "Panel administrativo activo"
              : "Acceso residente habilitado"}
          </span>
        </div>

        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>📢</h2>

          <p style={styles.statTitle}>Comunicados</p>

          <span style={styles.statText}>Sistema de anuncios activo</span>
        </div>

        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>🔐</h2>

          <p style={styles.statTitle}>Cuenta</p>

          <span style={styles.statText}>Sesión protegida por JWT</span>
        </div>

        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>{isAdmin ? "🛡️" : "👤"}</h2>

          <p style={styles.statTitle}>Rol</p>

          <span style={styles.statText}>
            {isAdmin ? "Administrador" : "Residente"}
          </span>
        </div>
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
    boxShadow: "0 8px 15px rgba(0,0,0,0.2)",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "35px",
  },

  statCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  statNumber: {
    fontSize: "2rem",
    margin: "0 0 10px 0",
  },

  statTitle: {
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: "5px",
  },

  statText: {
    color: "#7f8c8d",
    fontSize: "0.95rem",
  },
  // Colores para cada módulo (dan mucha vida visual)
  cardBlue: { backgroundColor: "#3498db" },
  cardGreen: { backgroundColor: "#2ecc71" },
  cardRed: { backgroundColor: "#e74c3c" },
  cardPurple: { backgroundColor: "#9b59b6" },
};

export default Dashboard;
