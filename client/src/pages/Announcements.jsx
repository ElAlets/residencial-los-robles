// client/src/pages/Announcements.jsx
import { useEffect, useState } from "react";
import { getAnnouncements } from "../services/announcementService";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 👤 Obtenemos el usuario del localStorage para saber si es Admin
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        const data = await getAnnouncements();
        setAnnouncements(data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los anuncios. Por favor, intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    loadAnnouncements();
  }, []);

  return (
    <div style={styles.container}>
      
      {/* 🛠️ Cabecera con botón condicional */}
      <div style={styles.header}>
        <h2>📢 Avisos de la Colonia</h2>
        
        {/* Solo el Admin ve este botón (la lógica de crear la haremos después) */}
        {isAdmin && (
          <button style={styles.createBtn}>+ Nuevo Aviso</button>
        )}
      </div>

      {/* 🔄 Loading */}
      {loading && <p style={styles.statusText}>Cargando avisos...</p>}

      {/* ❌ Error */}
      {error && <p style={styles.errorText}>❌ {error}</p>}

      {/* 📭 Sin datos */}
      {!loading && !error && announcements.length === 0 && (
        <p style={styles.statusText}>No hay avisos disponibles por el momento.</p>
      )}

      {/* 📢 Lista de Tarjetas */}
      <div style={styles.list}>
        {announcements.map((a) => (
          <div key={a.id} style={styles.card}>
            <h3 style={styles.title}>{a.title}</h3>
            <p style={styles.content}>{a.content}</p>
            
            <div style={styles.footer}>
              {a.author_name && <span>👤 Por: {a.author_name}</span>}
              
              {/* Transformamos la fecha de la base de datos a un formato legible */}
              {a.created_at && (
                <span>📅 {new Date(a.created_at).toLocaleDateString()}</span>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

// 🎨 Estilos enriquecidos
const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto", // Centra el contenido en pantallas grandes
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    borderBottom: "2px solid #ecf0f1",
    paddingBottom: "10px"
  },
  createBtn: {
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
  },
  statusText: {
    color: "#7f8c8d",
    fontStyle: "italic"
  },
  errorText: {
    color: "#e74c3c",
    fontWeight: "bold",
    backgroundColor: "#fadbd8",
    padding: "10px",
    borderRadius: "4px"
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
    borderLeft: "5px solid #3498db" // Un acento de color a la izquierda
  },
  title: {
    marginTop: 0,
    marginBottom: "10px",
    color: "#2c3e50"
  },
  content: {
    color: "#555",
    lineHeight: "1.5",
    marginBottom: "15px"
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.85rem",
    color: "#95a5a6",
    borderTop: "1px solid #ecf0f1",
    paddingTop: "10px"
  }
};

export default Announcements;