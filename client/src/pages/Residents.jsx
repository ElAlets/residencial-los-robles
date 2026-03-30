// client/src/pages/Residents.jsx
import { useEffect, useState } from "react";
import { getResidents } from "../services/residentService"; // ⚠️ A punto de crearlo

function Residents() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const isAdmin = user.role === "admin";

  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadResidents = async () => {
      try {
        const data = await getResidents();
        setResidents(data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar el padrón de residentes.");
      } finally {
        setLoading(false);
      }
    };

    // 🛡️ Solo hacemos la petición si es administrador
    if (isAdmin) {
      loadResidents();
    } else {
      setLoading(false);
    }
  }, [isAdmin]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>👥 Directorio de Residentes</h2>
        <p style={styles.subtitle}>Gestión del padrón oficial de la colonia.</p>
      </div>

      {/* 🔐 Protección frontend */}
      {!isAdmin && (
        <div style={styles.unauthorized}>
          <h3>🛑 Acceso Denegado</h3>
          <p>No tienes los permisos necesarios para visualizar el directorio de vecinos.</p>
        </div>
      )}

      {/* 🔄 Loading */}
      {isAdmin && loading && <p style={styles.statusText}>Cargando residentes...</p>}

      {/* ❌ Error */}
      {isAdmin && error && <p style={styles.errorText}>❌ {error}</p>}

      {/* 📭 Sin datos */}
      {isAdmin && !loading && !error && residents.length === 0 && (
        <p style={styles.statusText}>Aún no hay residentes registrados.</p>
      )}

      {/* 📋 Lista (Grid) */}
      {isAdmin && (
        <div style={styles.grid}>
          {residents.map((r) => (
            <div key={r.id} style={styles.card}>
              {/* Título de la tarjeta con el nombre */}
              <h3 style={styles.name}>👤 {r.user_name}</h3>
              <p style={styles.email}>{r.user_email}</p>
              
              <div style={styles.details}>
                <p><strong>🔢 Casa:</strong> {r.house_number}</p>
                <p><strong>🏠 Dirección:</strong> {r.address}</p>
                <p><strong>📞 Teléfono:</strong> {r.phone || "No registrado"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 🎨 Estilos limpios y consistentes
const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "20px",
    borderBottom: "2px solid #9b59b6", // Tono púrpura para identificar el área de Admin
    paddingBottom: "10px"
  },
  subtitle: {
    color: "#7f8c8d",
    margin: 0
  },
  unauthorized: {
    backgroundColor: "#fadbd8",
    color: "#c0392b",
    padding: "20px",
    borderRadius: "8px",
    borderLeft: "5px solid #e74c3c",
    marginTop: "20px"
  },
  statusText: { color: "#7f8c8d", fontStyle: "italic" },
  errorText: { color: "#d63031", fontWeight: "bold" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "20px"
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    borderTop: "4px solid #9b59b6" // Línea superior púrpura
  },
  name: {
    margin: "0 0 5px 0",
    color: "#2c3e50"
  },
  email: {
    margin: "0 0 15px 0",
    color: "#7f8c8d",
    fontSize: "0.9rem",
    borderBottom: "1px solid #ecf0f1",
    paddingBottom: "10px"
  },
  details: {
    fontSize: "0.95rem",
    color: "#34495e",
    lineHeight: "1.6"
  }
};

export default Residents;