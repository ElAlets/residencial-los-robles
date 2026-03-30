// client/src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  // 1. Obtenemos el usuario de forma segura (si no existe, user será null)
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔐 Logout: Limpiamos la casa y cerramos la puerta
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>Los Robles</h2>

      <div style={styles.links}>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/announcements" style={styles.link}>Anuncios</Link>
        <Link to="/payments" style={styles.link}>Pagos</Link>
        <Link to="/emergency" style={styles.link}>Emergencias</Link>
        
        {/* 🛡️ Magia de Roles: Solo el admin ve la pestaña de Residentes */}
        {user?.role === "admin" && (
          <Link to="/residents" style={styles.link}>Residentes</Link>
        )}
      </div>

      <div style={styles.userSection}>
        {/* Usamos user?.name por si acaso el localStorage tarda en cargar */}
        {user && <span style={styles.userName}>👤 {user.name}</span>}
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}

// Estilos mejorados ligeramente para darle formato a los enlaces
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 25px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #ddd",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)" // Un toque de sombra sutil
  },
  logo: {
    margin: 0,
    color: "#2c3e50"
  },
  links: {
    display: "flex",
    gap: "20px"
  },
  link: {
    textDecoration: "none",
    color: "#34495e",
    fontWeight: "500"
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },
  userName: {
    fontWeight: "bold",
    color: "#2c3e50"
  },
  logoutBtn: {
    padding: "8px 15px",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

export default Navbar;