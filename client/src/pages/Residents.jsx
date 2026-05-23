// client/src/pages/Residents.jsx
import { useEffect, useState } from "react";
import { getResidents } from "../services/residentService";

function Residents() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const isAdmin = user.role === "admin";

  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingResident, setEditingResident] = useState(null);

  const [newResident, setNewResident] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    house_number: "",
  });

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

  const handleInputChange = (e) => {
    setNewResident({
      ...newResident,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateResident = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      // ✏️ MODO EDICIÓN
      if (editingResident) {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `http://localhost:5000/api/residents/${editingResident.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              address: newResident.address,
              phone: newResident.phone,
              house_number: newResident.house_number,
              status: newResident.status || "active",
            }),
          },
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        }

        alert("✅ Residente actualizado");

        setEditingResident(null);
        setShowForm(false);

        const refreshed = await getResidents();
        setResidents(refreshed);

        return;
      }
      // 1. Crear usuario
      const userRes = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newResident.name,
          email: newResident.email,
          password: newResident.password,
        }),
      });

      const userData = await userRes.json();

      if (!userRes.ok) {
        throw new Error(userData.message);
      }

      // 2. Crear perfil residente
      const residentRes = await fetch("http://localhost:5000/api/residents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: userData.user.id,
          address: newResident.address,
          phone: newResident.phone,
          house_number: newResident.house_number,
        }),
      });

      const residentData = await residentRes.json();

      if (!residentRes.ok) {
        throw new Error(residentData.message);
      }

      alert("✅ Residente agregado correctamente");

      // reset form
      setNewResident({
        name: "",
        email: "",
        password: "",
        address: "",
        phone: "",
        house_number: "",
      });

      setShowForm(false);

      // 🔥 Recargar padrón
      const data = await getResidents();
      setResidents(data);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleDeleteResident = async (residentId) => {
    const confirmDelete = window.confirm("¿Eliminar este residente?");

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/residents/${residentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      alert("✅ Residente eliminado");

      const updated = await getResidents();
      setResidents(updated);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEditClick = (resident) => {
    setEditingResident(resident);

    setNewResident({
      name: resident.user_name || "",
      email: resident.user_email || "",
      password: "",
      address: resident.address || "",
      phone: resident.phone || "",
      house_number: resident.house_number || "",
      status: resident.status || "active",
    });

    setShowForm(true);
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <div>
          <h2>👥 Directorio de Residentes</h2>
          <p style={styles.subtitle}>
            Gestión del padrón oficial de la colonia.
          </p>
        </div>

        {isAdmin && (
          <button
            style={styles.addButton}
            onClick={() => setShowForm(!showForm)}
          >
            ➕ Agregar vecino
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleCreateResident} style={styles.form}>
          <input
            name="name"
            placeholder="Nombre completo"
            value={newResident.name}
            onChange={handleInputChange}
            required
            style={styles.input}
          />

          <input
            name="email"
            type="email"
            placeholder="Correo"
            value={newResident.email}
            onChange={handleInputChange}
            required={!editingResident}
            disabled={!!editingResident}
            style={styles.input}
          />

          {!editingResident && (
            <input
              name="password"
              type="password"
              placeholder="Contraseña temporal"
              value={newResident.password}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          )}

          <input
            name="house_number"
            placeholder="Número de casa"
            value={newResident.house_number}
            onChange={handleInputChange}
            required
            style={styles.input}
          />

          <input
            name="address"
            placeholder="Dirección"
            value={newResident.address}
            onChange={handleInputChange}
            required
            style={styles.input}
          />

          <input
            name="phone"
            placeholder="Teléfono"
            value={newResident.phone}
            onChange={handleInputChange}
            style={styles.input}
          />

          <button type="submit" style={styles.saveButton}>
            Guardar vecino
          </button>
        </form>
      )}

      {/* 🔐 Protección frontend */}
      {!isAdmin && (
        <div style={styles.unauthorized}>
          <h3>🛑 Acceso Denegado</h3>
          <p>
            No tienes los permisos necesarios para visualizar el directorio de
            vecinos.
          </p>
        </div>
      )}

      {/* 🔄 Loading */}
      {isAdmin && loading && (
        <p style={styles.statusText}>Cargando residentes...</p>
      )}

      {/* ❌ Error */}
      {isAdmin && error && <p style={styles.errorText}>❌ {error}</p>}

      {/* 📭 Sin datos */}
      {isAdmin && !loading && !error && residents.length === 0 && (
        <p style={styles.statusText}>Aún no hay residentes registrados.</p>
      )}

      {/* 📋 Lista (Grid) */}
      <div style={styles.grid}>
        {residents.map((r) => (
          <div key={r.id} style={styles.card}>
            {/* Nombre */}
            <h3 style={styles.name}>👤 {r.user_name}</h3>

            <p style={styles.email}>{r.user_email}</p>

            {/* Datos */}
            <div style={styles.details}>
              <p>
                <strong>🔢 Casa:</strong> {r.house_number || "No registrada"}
              </p>

              <p>
                <strong>🏠 Dirección:</strong> {r.address || "No registrada"}
              </p>

              <p>
                <strong>📞 Teléfono:</strong> {r.phone || "No registrado"}
              </p>
            </div>

            {/* 🛡️ Acciones Admin */}
            {isAdmin && (
              <div style={styles.actions}>
                <button
                  style={styles.editBtn}
                  onClick={() => handleEditClick(r)}
                >
                  ✏️ Editar
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDeleteResident(r.id)}
                >
                  🗑️ Eliminar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// 🎨 Estilos limpios y consistentes
const styles = {
  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  },

  editBtn: {
    flex: 1,
    backgroundColor: "#f39c12",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  deleteBtn: {
    flex: 1,
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "20px",
    borderBottom: "2px solid #9b59b6", // Tono púrpura para identificar el área de Admin
    paddingBottom: "10px",
  },
  subtitle: {
    color: "#7f8c8d",
    margin: 0,
  },
  unauthorized: {
    backgroundColor: "#fadbd8",
    color: "#c0392b",
    padding: "20px",
    borderRadius: "8px",
    borderLeft: "5px solid #e74c3c",
    marginTop: "20px",
  },
  statusText: { color: "#7f8c8d", fontStyle: "italic" },
  errorText: { color: "#d63031", fontWeight: "bold" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    borderTop: "4px solid #9b59b6", // Línea superior púrpura
  },
  name: {
    margin: "0 0 5px 0",
    color: "#2c3e50",
  },
  email: {
    margin: "0 0 15px 0",
    color: "#7f8c8d",
    fontSize: "0.9rem",
    borderBottom: "1px solid #ecf0f1",
    paddingBottom: "10px",
  },
  details: {
    fontSize: "0.95rem",
    color: "#34495e",
    lineHeight: "1.6",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    borderBottom: "2px solid #9b59b6",
    paddingBottom: "10px",
  },

  addButton: {
    backgroundColor: "#9b59b6",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  form: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
    display: "grid",
    gap: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.08)",
  },

  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },

  saveButton: {
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Residents;
