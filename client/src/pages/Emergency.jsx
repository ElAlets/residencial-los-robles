// client/src/pages/Emergency.jsx
import { useEffect, useState } from "react";
import { getEmergencyServices } from "../services/emergencyService"; 


function Emergency() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await getEmergencyServices();
        setServices(data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar el directorio de emergencias. Verifica tu conexión.");
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>🚨 Directorio de Emergencia</h2>
        <p style={styles.subtitle}>Toca el número para llamar inmediatamente</p>
      </div>

      {/* 🔄 Loading */}
      {loading && <p style={styles.statusText}>Cargando servicios...</p>}

      {/* ❌ Error */}
      {error && <p style={styles.errorText}>❌ {error}</p>}

      {/* 📭 Sin datos */}
      {!loading && !error && services.length === 0 && (
        <p style={styles.statusText}>No hay servicios disponibles en este momento.</p>
      )}

      {/* 📋 Lista (Grid) */}
      <div style={styles.grid}>
        {services.map((s) => (
          <div key={s.id} style={styles.card}>
            <h3 style={styles.cardTitle}>{s.name}</h3>
            
            <p style={styles.phoneLine}>
              <strong>📞 Tel:</strong>{" "}
              {/* 🛡️ El súper poder: Enlace tipo 'tel' para marcar directo */}
              <a href={`tel:${s.phone}`} style={styles.phoneLink}>
                {s.phone}
              </a>
            </p>

            {s.address && (
              <p style={styles.addressLine}>
                <strong>📍 Dir:</strong> {s.address}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// 🎨 Estilos ajustados
const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "20px",
    paddingBottom: "10px",
    borderBottom: "2px solid #ff7675" // Acento rojo/rosado por ser emergencias
  },
  subtitle: {
    color: "#636e72",
    margin: 0,
    fontSize: "0.95rem"
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
    borderTop: "4px solid #d63031" // Línea roja arriba de cada tarjeta
  },
  cardTitle: {
    marginTop: 0,
    marginBottom: "15px",
    color: "#2d3436"
  },
  phoneLine: {
    fontSize: "1.1rem",
    margin: "10px 0"
  },
  phoneLink: {
    color: "#0984e3",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "1.2rem", // Un poco más grande para que sea fácil tocarlo
  },
  addressLine: {
    fontSize: "0.9rem",
    color: "#636e72",
    margin: "10px 0 0 0"
  }
};

export default Emergency;