// client/src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false); // ⏳ Nuevo estado de carga

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Bloqueamos el botón
    setErrorMsg(""); // Limpiamos errores anteriores

    try {
      const data = await login(email, password);

      // 🔐 Guardamos token y usuario
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // 🚀 Redirigir sin recargar
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      // Mostramos error (podríamos leer error.response.data.message si viene del backend)
      setErrorMsg("Email o contraseña incorrectos");
    } finally {
      setIsLoading(false); // Desbloqueamos el botón siempre, pase lo que pase
    }
  };

  return (
    <div style={styles.container}>
      <h2>Iniciar Sesión</h2>
      <p style={styles.subtitle}>Residencial Los Robles</p>

      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorMsg(""); // Limpia el error al escribir
          }}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMsg(""); // Limpia el error al escribir
          }}
          required
          style={styles.input}
        />

        <button
          type="submit"
          style={styles.button}
          disabled={isLoading} // Se deshabilita si está cargando
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </button>

        {errorMsg && <p style={styles.error}>❌ {errorMsg}</p>}
      </form>
      <p style={{ marginTop: "15px" }}>
        ¿No tienes cuenta?{" "}
        <Link to="/register" style={{ color: "#0984e3", fontWeight: "bold" }}>
          Regístrate
        </Link>
      </p>
    </div>
  );
}

// 🎨 Estilos un poco más pulidos
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f6fa",
  },
  subtitle: {
    color: "#7f8c8d",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "300px",
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#0984e3",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  error: {
    color: "#e74c3c",
    fontSize: "14px",
    textAlign: "center",
    margin: 0,
  },
};

export default Login;
