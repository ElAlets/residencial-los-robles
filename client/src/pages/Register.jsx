import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "resident"
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");

    } catch (error) {
      setErrorMsg(error.message || "Error al registrarse");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Registro</h2>
      <p style={styles.subtitle}>Residencial Los Robles</p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          placeholder="Nombre completo"
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          onChange={handleChange}
          required
          style={styles.input}
        />

       {/* Solo para demo
        <select name="role" onChange={handleChange} style={styles.input}>
          <option value="resident">Residente</option>
          <option value="admin">Administrador</option>
        </select> */}

        <button type="submit" style={styles.button} disabled={isLoading}>
          {isLoading ? "Registrando..." : "Registrarse"}
        </button>

        {errorMsg && <p style={styles.error}>❌ {errorMsg}</p>}
      </form>

      <p style={{ marginTop: "15px" }}>
        ¿Ya tienes cuenta?{" "}
        <Link to="/" style={styles.link}>
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f6fa"
  },
  subtitle: {
    color: "#7f8c8d",
    marginBottom: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "300px",
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px"
  },
  button: {
    padding: "10px",
    backgroundColor: "#0984e3",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  error: {
    color: "#e74c3c",
    fontSize: "14px",
    textAlign: "center",
    margin: 0
  },
  link: {
    color: "#0984e3",
    fontWeight: "bold",
    textDecoration: "none"
  }
};

export default Register;